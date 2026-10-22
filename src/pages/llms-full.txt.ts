import type { APIContext } from "astro";
import { SITE } from "~/data/site";
import { getPublishedPosts } from "~/lib/posts";

// Complete post index in plain text, for LLMs that want the whole catalogue
// instead of the curated llms.txt. Companion file per https://llmstxt.org
export const prerender = true;

export async function GET(_context: APIContext) {
  const posts = await getPublishedPosts();

  const lines = [
    `# ${SITE.name}: complete post index`,
    "",
    `> ${SITE.description}`,
    "",
    `Every published article, newest first. ${posts.length} posts in total. Each entry: title and link, date, one-line summary.`,
    "",
  ];

  let year = 0;
  for (const p of posts) {
    const y = p.data.date.getUTCFullYear();
    if (y !== year) {
      year = y;
      lines.push(`## ${y}`, "");
    }
    const date = p.data.date.toISOString().slice(0, 10);
    const desc = (p.data.description ?? "").replace(/\s+/g, " ").trim();
    lines.push(`- [${p.data.title}](${SITE.url}/${p.id}/) (${date})${desc ? `: ${desc}` : ""}`);
    if (p.data.series) lines.push(`  series: ${p.data.series}`);
    if (p.data.tags?.length) lines.push(`  tags: ${p.data.tags.join(", ")}`);
  }

  return new Response(lines.join("\n") + "\n", {
    headers: { "content-type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
