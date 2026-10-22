// Validate the built site in ./dist for SEO/GEO basics and schema.org correctness.
//
//   node scripts/check-seo.mjs [--dist dist]
//
// Structured data is checked against the real schema.org vocabulary
// (https://schema.org/version/latest/schemaorg-current-https.jsonld, cached in
// ~/.cache/schema), so a typo'd property or a property used on the wrong type
// fails the run instead of shipping silently.
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv;
const distArg = argv.indexOf("--dist");
const dist = path.resolve(root, distArg >= 0 ? argv[distArg + 1] : "dist");

const CACHE_DIR = path.join(os.homedir(), ".cache", "schema");
const SCHEMA_FILE = path.join(CACHE_DIR, "schemaorg-current-https.jsonld");
const SCHEMA_URL = "https://schema.org/version/latest/schemaorg-current-https.jsonld";

// Structure checks are strict on site chrome. Posts keep their own history
// (older articles use several h1s and curly typography), and
// public/svg-seq-diagram/ is a vendored standalone tool without the site template.
const SKIP = /^(svg-seq-diagram|pagefind)\//;
const CHROME_PAGES = new Set([
  "index.html",
  "404.html",
  "blogs/index.html",
  "series/index.html",
  "tags/index.html",
  "tools/index.html",
  "cv/index.html",
  "books/index.html",
  "appearances/index.html",
  "comment-policy/index.html",
]);

const errors = [];
const warnings = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

const refId = (ref) => (Array.isArray(ref) ? refId(ref[0]) : ref && typeof ref === "object" ? ref["@id"] : ref);
const asList = (value) => (Array.isArray(value) ? value : [value]);

async function loadSchemaVocab() {
  if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });
  if (!existsSync(SCHEMA_FILE)) {
    const res = await fetch(SCHEMA_URL);
    if (!res.ok) throw new Error(`could not download schema.org: ${res.status}`);
    writeFileSync(SCHEMA_FILE, await res.text());
  }
  const graph = JSON.parse(readFileSync(SCHEMA_FILE, "utf8"))["@graph"];
  const knownTypes = new Set(graph.map((n) => n["@id"]));
  const parentOf = new Map();
  const domainOf = new Map();
  for (const node of graph) {
    const id = node["@id"];
    if (!id || !id.startsWith("schema:")) continue;
    if (node["@type"] === "rdfs:Class" && node["rdfs:subClassOf"]) {
      parentOf.set(id, refId(node["rdfs:subClassOf"]));
    }
    if (node["schema:domainIncludes"]) {
      domainOf.set(id, asList(node["schema:domainIncludes"]).map(refId));
    }
  }

  function ancestorsOf(typeId) {
    const seen = [];
    let current = typeId;
    while (current && !seen.includes(current)) {
      seen.push(current);
      current = parentOf.get(current);
    }
    return seen;
  }

  function typeIsKnown(type) {
    return knownTypes.has(`schema:${type}`);
  }

  function propertyIsAllowed(prop, types) {
    const domains = domainOf.get(`schema:${prop}`);
    if (!domains) return true; // no domain constraint documented (e.g. Thing level)
    const ancestors = new Set();
    for (const type of types) for (const a of ancestorsOf(`schema:${type}`)) ancestors.add(a);
    return domains.some((domain) => ancestors.has(domain));
  }

  return { typeIsKnown, propertyIsAllowed };
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (full.endsWith(".html")) out.push(full);
  }
  return out;
}

function attrOf(tag, name) {
  const m = (tag || "").match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, "i"));
  return m ? m[1] : null;
}

/** Flatten every object that carries an @type, wherever it is nested. */
function collectNodes(value, out = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectNodes(item, out);
  } else if (value && typeof value === "object") {
    if (value["@type"]) out.push(value);
    for (const inner of Object.values(value)) collectNodes(inner, out);
  }
  return out;
}

/** Every bare {"@id": ...} reference, wherever it is nested. */
function collectRefs(value, out = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectRefs(item, out);
  } else if (value && typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 1 && keys[0] === "@id") out.push(value["@id"]);
    else for (const inner of Object.values(value)) collectRefs(inner, out);
  }
  return out;
}

const { typeIsKnown, propertyIsAllowed } = await loadSchemaVocab();
const files = walk(dist);
let jsonLdBlocks = 0;
let personPages = 0;
let orgPages = 0;

const skipped = [];
for (const file of files) {
  const rel = path.relative(dist, file);
  if (SKIP.test(rel)) {
    skipped.push(rel);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const chrome = CHROME_PAGES.has(rel);

  // --- page basics -------------------------------------------------------
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").trim();
  if (!title) fail(rel, "missing <title>");
  if (title.includes("undefined")) fail(rel, "title contains 'undefined'");

  const description = attrOf(html.match(/<meta\s+name="description"[^>]*>/i)?.[0], "content");
  if (!description) fail(rel, "missing meta description");
  else if (description.includes("undefined")) fail(rel, "meta description contains 'undefined'");
  else if (description.length < 50) warn(rel, `meta description is short (${description.length} chars)`);
  else if (description.length > 160) warn(rel, `meta description is ${description.length} chars, over the ~160 display limit`);

  if (!/<link\s+rel="canonical"/i.test(html)) fail(rel, "missing canonical link");
  for (const prop of ["og:type", "og:title", "og:description", "og:url", "og:image", "og:site_name"]) {
    if (!html.includes(`property="${prop}"`)) fail(rel, `missing ${prop}`);
  }
  if (!html.includes('name="twitter:card"')) fail(rel, "missing twitter:card");
  if (!/<html[^>]*\blang=/.test(html)) fail(rel, "<html> has no lang attribute");

  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (chrome && h1Count !== 1) fail(rel, `expected one <h1>, found ${h1Count}`);
  if (!chrome && h1Count === 0) warn(rel, "no <h1> on the page");

  // --- copy quality on the strings search and AI engines actually read -----
  if (chrome) {
    const headStrings = [
      title,
      description ?? "",
      ...[...html.matchAll(/<meta\s+(?:property|name)="(?:og|twitter):(?:title|description)"[^>]*content="([^"]*)"/gi)].map((m) => m[1]),
      ...[...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
        .map((m) => m[1])
        .flatMap((raw) => {
          try {
            return Object.values(JSON.parse(raw)).flatMap((n) => (Array.isArray(n) ? n : []).map((x) => `${x.headline ?? ""} ${x.description ?? ""} ${x.summary ?? ""}`));
          } catch {
            return [];
          }
        }),
    ].join(" ");
    const banned = { "\u2014": "em dash", "\u2026": "ellipsis character", "\u201c": "curly quote", "\u201d": "curly quote", "\u2019": "curly apostrophe" };
    for (const [char, label] of Object.entries(banned)) {
      if (headStrings.includes(char)) warn(rel, `title/description copy contains ${label}`);
    }
    for (const word of ["delve", "seamless", "leveraging", "cutting-edge", "game-changing", "In today's", "state-of-the-art"]) {
      if (new RegExp(`\\b${word}\\b`, "i").test(headStrings)) warn(rel, `marketing filler in copy: ${word}`);
    }
  }

  // --- structured data ---------------------------------------------------
  const blocks = [...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (blocks.length === 0) fail(rel, "no JSON-LD block");
  const typesOnPage = new Set();
  for (const block of blocks) {
    jsonLdBlocks++;
    let data;
    try {
      data = JSON.parse(block[1]);
    } catch (err) {
      fail(rel, `invalid JSON-LD: ${err.message}`);
      continue;
    }
    const nodes = collectNodes(data["@graph"] ?? data);
    const defined = new Set(nodes.map((n) => n["@id"]).filter(Boolean));
    for (const ref of collectRefs(data["@graph"] ?? data)) {
      if (!defined.has(ref)) fail(rel, `JSON-LD reference ${ref} points at no node in the graph`);
    }
    for (const node of nodes) {
      const types = asList(node["@type"]);
      for (const type of types) {
        if (!typeIsKnown(type)) fail(rel, `unknown schema.org type: ${type}`);
        typesOnPage.add(type);
      }
      for (const key of Object.keys(node)) {
        if (key.startsWith("@")) continue;
        if (!propertyIsAllowed(key, types)) fail(rel, `"${key}" is not a valid property of ${types.join("/")}`);
      }
    }
  }
  if (typesOnPage.has("Person")) personPages++;
  if (typesOnPage.has("Organization")) orgPages++;
}

// --- site-wide files -----------------------------------------------------
for (const asset of ["robots.txt", "sitemap-index.xml", "llms.txt", "llms-full.txt", "feed.xml"]) {
  if (!existsSync(path.join(dist, asset))) fail(dist, `missing ${asset}`);
}
const robots = existsSync(path.join(dist, "robots.txt")) ? readFileSync(path.join(dist, "robots.txt"), "utf8") : "";
if (robots && !/Sitemap:\s*https?:/m.test(robots)) fail(dist, "robots.txt has no Sitemap line");

const checked = files.length - skipped.length;
console.log(`checked ${checked} pages (${skipped.length} vendored pages skipped), ${jsonLdBlocks} JSON-LD blocks`);
console.log(`Person on ${personPages}/${checked} pages, Organization on ${orgPages}/${checked}`);
for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
