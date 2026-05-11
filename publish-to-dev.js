// Sync src/content/posts/*.mdx to Dev.to.
//
// Reverses the migration script: strips MDX-only syntax (component imports,
// JSX embeds, MDX brace/angle escapes) so the body sent to Dev.to is clean
// markdown with Liquid embeds — the format Dev.to natively renders.
//
// On a freshly-published post, writes devto_id + devto_url back into the
// source .mdx so subsequent runs do an UPDATE rather than another CREATE.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import axios from "axios";
import matter from "gray-matter";
import yaml from "json2yaml";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, "src", "content", "posts");

const DEV_TO_API = "https://dev.to/api/articles";

const http = axios.create({
  baseURL: DEV_TO_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "api-key": process.env.DEV_API_KEY,
  },
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Files are named YYYY-MM-DD-<slug>.mdx for chronological filesystem order,
// but the URL slug is just <slug> (matches the generateId in content.config.ts).
const slugFromFilename = (filename) =>
  filename.replace(/\.mdx?$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");

// --------------------------------------------------------------------------
// MDX → Dev.to-flavoured markdown
// --------------------------------------------------------------------------

const COMPONENT_TO_LIQUID = [
  // <Gist id="user/id" file="x" /> | <Gist id="..." />
  {
    tag: "Gist",
    re: /<Gist\s+id="([^"]+)"(?:\s+file="([^"]+)")?\s*\/>/g,
    to: (_m, id, file) => (file ? `{% gist ${id} ${file} %}` : `{% gist ${id} %}`),
  },
  {
    tag: "YouTube",
    re: /<YouTube\s+id="([^"]+)"\s*\/>/g,
    to: (_m, id) => `{% youtube ${id} %}`,
  },
  {
    tag: "CodeSandbox",
    re: /<CodeSandbox\s+id="([^"]+)"\s*\/>/g,
    to: (_m, id) => `{% codesandbox ${id} %}`,
  },
  {
    tag: "SpeakerDeck",
    re: /<SpeakerDeck\s+id="([^"]+)"\s*\/>/g,
    to: (_m, id) => `{% speakerdeck ${id} %}`,
  },
  {
    tag: "Tweet",
    re: /<Tweet\s+id="([^"]+)"(?:\s+user="[^"]*")?\s*\/>/g,
    to: (_m, id) => `{% twitter ${id} %}`,
  },
  {
    tag: "LinkCard",
    re: /<LinkCard\s+href="([^"]+)"(?:\s+[^/]*)?\s*\/>/g,
    to: (_m, href) => `{% link ${href} %}`,
  },
];

function mdxToDevtoMarkdown(body) {
  let out = body;
  // 1. Strip MDX import statements (must be at start, one per line)
  out = out.replace(/^import\s+[^\n]*from\s+["'][^"']+["'];?\s*\n?/gm, "");
  // 2. Component → Liquid
  for (const rule of COMPONENT_TO_LIQUID) {
    out = out.replace(rule.re, rule.to);
  }
  // 3. Unescape MDX brace escapes
  out = out.replace(/\\\{/g, "{").replace(/\\\}/g, "}");
  // 4. Unescape pseudo-tag entities the migration emitted (&lt;...&gt;)
  out = out.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  // 5. Trim leading whitespace left by stripped imports
  out = out.replace(/^\s+/, "");
  return out;
}

// Front-matter we don't want to leak to Dev.to
const STRIP_FM_KEYS = new Set([
  "toc",
  "beforetoc",
  "comments",
  "author",
  "featured",
  "rating",
  "last_modified_at",
  "skip_devto",
]);

function buildBodyForDevto(frontmatter, content) {
  const fm = {};
  for (const [k, v] of Object.entries(frontmatter)) {
    if (STRIP_FM_KEYS.has(k)) continue;
    if (v === null || v === undefined) continue;
    // Dev.to expects a "date" field as ISO string, not Date
    if (v instanceof Date) fm[k] = v.toISOString().slice(0, 10);
    else fm[k] = v;
  }

  const note =
    fm.canonical_url && fm.canonical_url.includes("deepu.tech")
      ? `*Originally published at [deepu.tech](https://deepu.tech/${slugFromFilename(fm.__filename ?? "")}/)*.\n`
      : "";
  delete fm.__filename;

  const body = mdxToDevtoMarkdown(content);
  return `${yaml.stringify(fm)}---\n${note}\n${body}`;
}

// Re-emit a .mdx file on disk with the same (preserved) body but updated
// front-matter values. Used to write back devto_id / devto_url after a
// new post is created on Dev.to.
function writeBackFrontMatter(filePath, originalRaw, updates) {
  const parsed = matter(originalRaw);
  const merged = { ...parsed.data, ...updates };
  const fmYaml = Object.entries(merged)
    .map(([k, v]) => {
      if (Array.isArray(v)) {
        if (v.length === 0) return `${k}: []`;
        return `${k}:\n${v.map((x) => `  - ${typeof x === "string" ? JSON.stringify(x) : x}`).join("\n")}`;
      }
      if (v instanceof Date) return `${k}: ${v.toISOString().slice(0, 10)}`;
      if (typeof v === "string") {
        if (/[:#@`]/.test(v) || v.startsWith("- ")) return `${k}: ${JSON.stringify(v)}`;
        return `${k}: ${v}`;
      }
      return `${k}: ${JSON.stringify(v)}`;
    })
    .join("\n");
  const out = `---\n${fmYaml}\n---\n${parsed.content.replace(/^\n+/, "")}`;
  fs.writeFileSync(filePath, out, "utf8");
}

// --------------------------------------------------------------------------
// Main
// --------------------------------------------------------------------------

async function publish() {
  const dryRun = process.env.DRY_RUN === "1" || process.argv.includes("--dry-run");
  if (!process.env.DEV_API_KEY) {
    console.error("DEV_API_KEY env var missing — refusing to run.");
    process.exit(1);
  }

  const filenames = fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));
  if (filenames.length === 0) {
    console.error(`No posts found in ${POSTS_DIR}`);
    process.exit(1);
  }

  console.log("");
  console.log("Dev.to sync " + (dryRun ? "(DRY RUN — no API writes)" : ""));
  console.log("=".repeat(60));
  console.log(`Found ${filenames.length} posts in ${path.relative(__dirname, POSTS_DIR)}/`);

  const plan = {
    create: [],
    update: [],
    unchanged: [],
    skipped: [],
    failed: [],
  };

  for (const filename of filenames) {
    const filePath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const fm = parsed.data;

    if (fm.skip_devto) {
      plan.skipped.push({ filename, reason: "skip_devto: true" });
      continue;
    }
    if (!fm.published && !fm.draft) {
      plan.skipped.push({ filename, reason: "not published" });
      continue;
    }

    const fmForBody = { ...fm, __filename: filename };
    const body_markdown = buildBodyForDevto(fmForBody, parsed.content);
    const payload = { article: { body_markdown } };

    try {
      if (fm.devto_url && fm.devto_id) {
        // Existing — fetch to compare
        const existing = await http.get(`/${fm.devto_id}`);
        if (existing?.data?.body_markdown === body_markdown) {
          plan.unchanged.push({ filename, url: fm.devto_url });
          continue;
        }
        if (dryRun) {
          plan.update.push({ filename, url: fm.devto_url, title: fm.title });
          continue;
        }
        console.log(`Updating ${filename} → ${fm.devto_url}`);
        const res = await http.put(`/${fm.devto_id}`, payload);
        if (res.status === 200) {
          plan.update.push({ filename, url: fm.devto_url, title: fm.title });
          console.log(`  ✓ id=${res.data.id}`);
        }
      } else {
        // New
        if (dryRun) {
          plan.create.push({ filename, title: fm.title });
          continue;
        }
        console.log(`Creating ${filename} on Dev.to (${fm.title})`);
        const res = await http.post("/", payload);
        if (res.status === 201) {
          plan.create.push({ filename, title: fm.title, url: res.data.url });
          console.log(`  ✓ id=${res.data.id}, url=${res.data.url}`);
          writeBackFrontMatter(filePath, raw, {
            devto_id: res.data.id,
            devto_url: res.data.url,
          });
          console.log(`  ✓ wrote devto_id/devto_url back into ${filename}`);
        }
      }
      if (!dryRun) await sleep(2000); // Dev.to rate-limit cushion
    } catch (err) {
      const detail = err.response?.data?.error ?? err.response?.data ?? err.message;
      plan.failed.push({ filename, error: String(detail) });
      console.error(`✗ ${filename}: ${detail}`);
      // Carry on instead of aborting the whole run. The summary at the
      // bottom lists every failure so you can fix them and re-run.
    }
  }

  // Summary
  console.log("");
  console.log("Summary");
  console.log("=".repeat(60));
  const verb = dryRun ? "would" : "did";
  console.log(`  ${plan.create.length.toString().padStart(3)} ${verb} CREATE`);
  for (const p of plan.create) {
    console.log(`      • ${p.filename}  —  ${p.title ?? ""}`);
  }
  console.log(`  ${plan.update.length.toString().padStart(3)} ${verb} UPDATE`);
  for (const p of plan.update) {
    console.log(`      • ${p.filename}  →  ${p.url ?? ""}`);
  }
  console.log(`  ${plan.unchanged.length.toString().padStart(3)} unchanged`);
  console.log(`  ${plan.skipped.length.toString().padStart(3)} skipped`);
  for (const p of plan.skipped) {
    console.log(`      • ${p.filename}  (${p.reason})`);
  }
  if (plan.failed.length) {
    console.log(`  ${plan.failed.length.toString().padStart(3)} FAILED`);
    for (const p of plan.failed) {
      console.log(`      • ${p.filename}  —  ${p.error}`);
    }
  }
  console.log("");

  // Surface non-zero exit if anything failed in a real run, so CI/publish.sh
  // notices. Dry-run never fails the process.
  if (!dryRun && plan.failed.length > 0) {
    process.exit(2);
  }
}

publish();
