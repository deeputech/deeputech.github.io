import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getPublishedPosts } from "~/lib/posts";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: "Technorage",
    description: "Where I rant about technology and stuff!",
    site: context.site ?? "https://deepu.tech",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
