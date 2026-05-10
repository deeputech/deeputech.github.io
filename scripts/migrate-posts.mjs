#!/usr/bin/env node
// One-shot codemod: _posts/*.md (Jekyll) → src/content/posts/*.mdx (Astro).
// Idempotent — overwrites the destination files each run, never modifies the source.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "_posts");
const OUT_DIR = path.join(ROOT, "src", "content", "posts");

// --------------------------------------------------------------------------
// Liquid → MDX rewrites
// Each entry: { tag, regex, toMdx, importLine }
// --------------------------------------------------------------------------
const COMPONENT_IMPORTS = {
  Gist: 'import Gist from "~/components/embeds/Gist.astro";',
  YouTube: 'import YouTube from "~/components/embeds/YouTube.astro";',
  CodeSandbox: 'import CodeSandbox from "~/components/embeds/CodeSandbox.astro";',
  SpeakerDeck: 'import SpeakerDeck from "~/components/embeds/SpeakerDeck.astro";',
  Tweet: 'import Tweet from "~/components/embeds/Tweet.astro";',
  LinkCard: 'import LinkCard from "~/components/embeds/LinkCard.astro";',
};

const escapeAttr = (s) => s.replace(/"/g, "&quot;");

// All tag regex accept the first arg and optionally swallow additional
// whitespace-separated args before %} (matches Jekyll plugins which do
// `id.split(/\s+/)[0]`).
const tagRe = (name, captureExtra = false) => {
  if (captureExtra) {
    return new RegExp(`\\{%\\s*${name}\\s+([^\\s%]+)(?:\\s+([^\\s%]+))?(?:\\s+[^%]*)?\\s*%\\}`, "g");
  }
  return new RegExp(`\\{%\\s*${name}\\s+([^\\s%]+)(?:\\s+[^%]*)?\\s*%\\}`, "g");
};

const REWRITES = [
  {
    name: "gist",
    component: "Gist",
    pattern: tagRe("gist", true),
    replace: (_m, idOrUrl, file) => {
      // Accept "user/id", bare id, or full https://gist.github.com/... URL
      let id = idOrUrl;
      try {
        if (idOrUrl.startsWith("http")) {
          const u = new URL(idOrUrl);
          id = u.pathname.split("/").filter(Boolean).slice(-1)[0];
        }
      } catch (_) {}
      const fileAttr = file ? ` file="${escapeAttr(file)}"` : "";
      return `<Gist id="${escapeAttr(id)}"${fileAttr} />`;
    },
  },
  {
    name: "youtube",
    component: "YouTube",
    pattern: tagRe("youtube"),
    replace: (_m, id) => `<YouTube id="${escapeAttr(id)}" />`,
  },
  {
    name: "codesandbox",
    component: "CodeSandbox",
    pattern: tagRe("codesandbox"),
    replace: (_m, id) => `<CodeSandbox id="${escapeAttr(id)}" />`,
  },
  {
    name: "speakerdeck",
    component: "SpeakerDeck",
    pattern: tagRe("speakerdeck"),
    replace: (_m, id) => `<SpeakerDeck id="${escapeAttr(id.replace(/['"]/g, ""))}" />`,
  },
  {
    name: "twitter",
    component: "Tweet",
    pattern: tagRe("twitter"),
    replace: (_m, idOrUrl) => {
      let id = idOrUrl;
      let user = undefined;
      try {
        if (idOrUrl.startsWith("http")) {
          const u = new URL(idOrUrl);
          const parts = u.pathname.split("/").filter(Boolean);
          // /<user>/status/<id>
          const statusIdx = parts.indexOf("status");
          if (statusIdx > 0) {
            user = parts[statusIdx - 1];
            id = parts[statusIdx + 1];
          }
        }
      } catch (_) {}
      return user
        ? `<Tweet id="${escapeAttr(id)}" user="${escapeAttr(user)}" />`
        : `<Tweet id="${escapeAttr(id)}" />`;
    },
  },
  {
    name: "link",
    component: "LinkCard",
    pattern: tagRe("link"),
    replace: (_m, href) => `<LinkCard href="${escapeAttr(href)}" />`,
  },
];

// --------------------------------------------------------------------------
// MDX safety: escape characters that would otherwise be parsed as JSX/expressions
// in arbitrary prose. We only do this OUTSIDE of code blocks.
// --------------------------------------------------------------------------
function splitByCodeFences(content) {
  // Returns alternating segments [{type:'text',value}, {type:'code',value}, ...]
  const out = [];
  const lines = content.split("\n");
  let inFence = false;
  let fenceMarker = "";
  let buf = [];
  let mode = "text";
  for (const line of lines) {
    const fenceMatch = line.match(/^(\s*)(`{3,}|~{3,})/);
    if (fenceMatch && (!inFence || line.trim().startsWith(fenceMarker))) {
      if (!inFence) {
        // entering fence
        if (buf.length) out.push({ type: mode, value: buf.join("\n") });
        buf = [line];
        mode = "code";
        inFence = true;
        fenceMarker = fenceMatch[2];
      } else {
        // leaving fence
        buf.push(line);
        out.push({ type: "code", value: buf.join("\n") });
        buf = [];
        mode = "text";
        inFence = false;
        fenceMarker = "";
      }
    } else {
      buf.push(line);
    }
  }
  if (buf.length) out.push({ type: mode, value: buf.join("\n") });
  return out;
}

function splitInlineCode(text) {
  // Split a text segment further on inline `...` so we don't escape inside backticks.
  const out = [];
  const re = /(`[^`\n]+`)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ type: "prose", value: text.slice(last, m.index) });
    out.push({ type: "inline-code", value: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ type: "prose", value: text.slice(last) });
  return out;
}

function escapeMdxProse(text) {
  // Escape stray { and < that would break MDX. Don't touch valid markdown like
  // <https://...>, <Component ... />, or <!-- comments -->, or HTML tags we want to keep.
  let out = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === "{") {
      // Escape lone braces that aren't already escaped
      if (text[i - 1] !== "\\") out += "\\{";
      else out += "{";
    } else if (ch === "}") {
      if (text[i - 1] !== "\\") out += "\\}";
      else out += "}";
    } else {
      out += ch;
    }
  }
  return out;
}

function rewriteContent(content) {
  const used = new Set();
  const segments = splitByCodeFences(content);
  const rewritten = segments
    .map((seg) => {
      if (seg.type === "code") return seg.value;
      // Apply Liquid → MDX rewrites
      let txt = seg.value;
      for (const r of REWRITES) {
        if (r.pattern.test(txt)) {
          used.add(r.component);
          // pattern has /g so we need to reset and re-run with replace
          r.pattern.lastIndex = 0;
          txt = txt.replace(r.pattern, r.replace);
        }
      }
      // Drop {% raw %} / {% endraw %} blocks (just unwrap)
      txt = txt.replace(/\{%\s*raw\s*%\}/g, "");
      txt = txt.replace(/\{%\s*endraw\s*%\}/g, "");
      // MDX-escape lone braces in prose, but leave inline `code` alone
      const inner = splitInlineCode(txt)
        .map((s) => (s.type === "inline-code" ? s.value : escapeMdxProse(s.value)))
        .join("");
      return inner;
    })
    .join("\n");
  return { content: rewritten, used };
}

// --------------------------------------------------------------------------
// Process one file
// --------------------------------------------------------------------------
function processFile(filename) {
  const fullPath = path.join(SRC_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);

  // Slug from filename: strip YYYY-MM-DD- prefix when present.
  // Files without a date prefix are drafts; we still migrate them but mark them
  // unpublished and use today's date as a placeholder.
  const dated = filename.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
  let dateFromFilename = null;
  let slug;
  let isDraft = false;
  if (dated) {
    dateFromFilename = dated[1];
    slug = dated[2];
  } else {
    const undated = filename.match(/^(?:\d+-)?(.+)\.md$/);
    slug = undated ? undated[1] : filename.replace(/\.md$/, "");
    isDraft = true;
    console.warn(`  draft (no date prefix): ${filename} → slug=${slug}`);
  }

  // Normalize front-matter — drop null/undefined, drop layout
  const fm = {};
  for (const [k, v] of Object.entries(parsed.data)) {
    if (v === null || v === undefined) continue;
    if (k === "layout") continue;
    fm[k] = v;
  }
  // date — prefer filename date, then existing front-matter date, then today
  if (dateFromFilename) {
    fm.date = dateFromFilename;
  } else if (!fm.date) {
    fm.date = new Date().toISOString().slice(0, 10);
  } else if (fm.date instanceof Date) {
    fm.date = fm.date.toISOString().slice(0, 10);
  }
  if (isDraft && fm.published === undefined) fm.published = false;
  // ensure tags is array
  if (typeof fm.tags === "string") fm.tags = [fm.tags];
  if (!fm.tags) fm.tags = [];
  // categories likewise
  if (typeof fm.categories === "string") fm.categories = [fm.categories];

  // Rewrite body
  const { content: body, used } = rewriteContent(parsed.content);

  // Build MDX import block
  const imports = Array.from(used)
    .sort()
    .map((c) => COMPONENT_IMPORTS[c])
    .join("\n");

  // Re-emit front-matter with stable key order for cleanliness
  const fmYaml = Object.entries(fm)
    .map(([k, v]) => {
      if (Array.isArray(v)) {
        if (v.length === 0) return `${k}: []`;
        return `${k}:\n${v.map((x) => `  - ${typeof x === "string" ? JSON.stringify(x) : x}`).join("\n")}`;
      }
      if (typeof v === "string") {
        // quote strings that contain colons or special chars to be safe
        if (/[:#@`]/.test(v) || v.startsWith("- ")) return `${k}: ${JSON.stringify(v)}`;
        return `${k}: ${v}`;
      }
      if (v instanceof Date) return `${k}: ${v.toISOString().slice(0, 10)}`;
      return `${k}: ${JSON.stringify(v)}`;
    })
    .join("\n");

  const out = `---\n${fmYaml}\n---\n${imports ? `${imports}\n\n` : ""}${body.trimStart()}\n`;

  const outPath = path.join(OUT_DIR, `${slug}.mdx`);
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(outPath, out, "utf8");
  return { slug, used: [...used] };
}

// --------------------------------------------------------------------------
// Main
// --------------------------------------------------------------------------
function main() {
  const files = fs.readdirSync(SRC_DIR).filter((f) => f.endsWith(".md")).sort();
  if (!files.length) {
    console.error(`No posts found in ${SRC_DIR}`);
    process.exit(1);
  }
  console.log(`Migrating ${files.length} posts → ${path.relative(ROOT, OUT_DIR)}/`);
  const stats = { total: 0, withEmbeds: 0, embedCounts: {} };
  for (const f of files) {
    const r = processFile(f);
    if (!r) continue;
    stats.total++;
    if (r.used.length) {
      stats.withEmbeds++;
      for (const c of r.used) stats.embedCounts[c] = (stats.embedCounts[c] || 0) + 1;
    }
  }
  console.log(`\n✓ Migrated ${stats.total} posts`);
  console.log(`  ${stats.withEmbeds} posts contain at least one embed`);
  if (Object.keys(stats.embedCounts).length) {
    console.log("  embed component usage (posts containing each):");
    for (const [c, n] of Object.entries(stats.embedCounts).sort()) {
      console.log(`    - ${c}: ${n}`);
    }
  }
}

main();
