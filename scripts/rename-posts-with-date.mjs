#!/usr/bin/env node
// One-shot: rename src/content/posts/<slug>.mdx → YYYY-MM-DD-<slug>.mdx so
// the directory sorts chronologically. The post id is still <slug>
// (handled by `generateId` in src/content.config.ts).
//
// Idempotent: files that already start with YYYY-MM-DD- are skipped.
// Uses `git mv` so rename history is preserved.

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "src", "content", "posts");

const DATE_RE = /^\d{4}-\d{2}-\d{2}-/;

const files = fs.readdirSync(DIR).filter((f) => /\.mdx?$/.test(f));
let renamed = 0;
let skipped = 0;

for (const f of files) {
  if (DATE_RE.test(f)) {
    skipped++;
    continue;
  }
  const filePath = path.join(DIR, f);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  if (!data.date) {
    console.warn(`  no date in front-matter, skipping: ${f}`);
    skipped++;
    continue;
  }
  const dateStr =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    console.warn(`  date not YYYY-MM-DD: ${f} → ${dateStr}, skipping`);
    skipped++;
    continue;
  }
  const newName = `${dateStr}-${f}`;
  const newPath = path.join(DIR, newName);
  const rel = path.relative(ROOT, filePath);
  const newRel = path.relative(ROOT, newPath);
  try {
    execSync(`git mv "${rel}" "${newRel}"`, { cwd: ROOT, stdio: "pipe" });
  } catch (e) {
    // file isn't tracked yet — fall back to plain rename
    fs.renameSync(filePath, newPath);
  }
  console.log(`  ${f}  →  ${newName}`);
  renamed++;
}

console.log(`\n${renamed} renamed, ${skipped} already in date order (or skipped)`);
