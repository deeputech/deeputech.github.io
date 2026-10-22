import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { PERSON, SITE } from "~/data/site";
import { getPublishedPosts } from "~/lib/posts";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/${post.id}/`,
      categories: post.data.tags,
      author: `${PERSON.email} (${PERSON.name})`,
    })),
    customData: `<language>en-us</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
  });
}
