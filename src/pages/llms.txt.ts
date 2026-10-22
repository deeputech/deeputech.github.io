import type { APIContext } from "astro";
import { PERSON, SITE } from "~/data/site";
import { seriesMeta } from "~/data/series";
import { getFeaturedPosts, getPublishedPosts, slugifySeries } from "~/lib/posts";

// llms.txt: a short, LLM-readable summary of who runs this site and what is in it.
// https://llmstxt.org
export const prerender = true;

const url = (path: string) => `${SITE.url}${path}`;
const line = (title: string, href: string, desc?: string) =>
  `- [${title}](${href})${desc ? `: ${desc}` : ""}`;

export async function GET(_context: APIContext) {
  const posts = await getPublishedPosts();
  const featured = await getFeaturedPosts();
  const latest = posts.slice(0, 15);

  const body = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `This site is written and maintained by ${PERSON.name} (${PERSON.alternateName}), a ${PERSON.jobTitle} at Auth0 (Okta) in ${PERSON.city}, ${PERSON.country}. He is creator of LlamaStash, KDash, and JWT UI, co-chair of JHipster, a Java Champion (2022), and author of Full Stack Development with JHipster (Packt). Everything here is his own opinion, not his employer's.`,
    "",
    `Contact: ${PERSON.email}`,
    `Profiles: ${PERSON.sameAs.join(", ")}`,
    `RSS: ${url("/feed.xml")}`,
    `Sitemap: ${url("/sitemap-index.xml")}`,
    `Full post index: ${url("/llms-full.txt")}`,
    "",
    "## Key pages",
    "",
    line("Home / about", url("/"), "Who he is, what he builds, and what the blog covers."),
    line("Blog index", url("/blogs/"), "Every article, newest first."),
    line("Series", url("/series/"), "Multi-part deep dives, listed in reading order."),
    line("Tags", url("/tags/"), "All topics with post counts."),
    line("Tools", url("/tools/"), "Terminal and browser tools he builds and maintains."),
    line("CV", url("/cv/"), "Full CV: roles, projects, skills, education."),
    line("Books", url("/books/"), "Full Stack Development with JHipster, first and second edition."),
    line("Events", url("/appearances/"), "Conference talks with slides and recordings."),
    line("Comment policy", url("/comment-policy/"), "Rules for discussions in the comments."),
    "",
    "## Projects",
    "",
    "- [LlamaStash](https://github.com/llamastash/llamastash): Rust TUI, CLI, daemon, and OpenAI-compatible proxy for running local LLMs on llama.cpp and friends.",
    "- [KDash](https://github.com/kdash-rs/kdash): Kubernetes dashboard in the terminal, written in Rust.",
    "- [JWT UI](https://github.com/jwt-rs/jwt-ui): terminal UI for decoding and encoding JSON Web Tokens.",
    "- [JHipster](https://www.jhipster.tech): application generator for Spring Boot plus React, Angular, or Vue. He is co-chair and vice-president.",
    "- [JDL Studio](https://start.jhipster.tech/jdl-studio/): online editor for the JHipster Domain Language.",
    "- [auth0-token-vault-cli](https://github.com/deepu105/auth0-token-vault-cli): use Auth0 Token Vault from AI agents without the agent holding user tokens.",
    "- [Assistant0](https://github.com/auth0-samples/auth0-assistant0): sample AI assistant that reaches Gmail and Slack through Auth0.",
    "",
    "## Series",
    "",
    ...seriesMeta.map((s) => line(s.title, url(`/series/${slugifySeries(s.id)}/`), s.description)),
    "",
    "## Latest posts",
    "",
    ...latest.map((p) => line(p.data.title, url(`/${p.id}/`), p.data.description)),
    "",
    "## Featured posts",
    "",
    ...featured.map((p) => line(p.data.title, url(`/${p.id}/`), p.data.description)),
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
