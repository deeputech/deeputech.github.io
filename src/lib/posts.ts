import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

export async function getPublishedPosts(): Promise<Post[]> {
  const all = await getCollection("posts");
  return all
    .filter((p) => p.data.published !== false)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const all = await getPublishedPosts();
  return all.filter((p) => p.data.featured);
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const all = await getPublishedPosts();
  return all.filter((p) => p.data.tags?.includes(tag));
}

export async function getPostsBySeries(series: string): Promise<Post[]> {
  const all = await getPublishedPosts();
  return all.filter((p) => p.data.series === series).reverse();
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const all = await getPublishedPosts();
  const counts = new Map<string, number>();
  for (const p of all) {
    for (const t of p.data.tags ?? []) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export async function getAllSeries(): Promise<{ series: string; count: number; posts: Post[] }[]> {
  const all = await getPublishedPosts();
  const map = new Map<string, Post[]>();
  for (const p of all) {
    if (!p.data.series) continue;
    const list = map.get(p.data.series) ?? [];
    list.push(p);
    map.set(p.data.series, list);
  }
  return [...map.entries()]
    .map(([series, posts]) => ({ series, count: posts.length, posts: posts.reverse() }))
    .sort((a, b) => a.series.localeCompare(b.series));
}

const WORDS_PER_MINUTE = 200;

export function readingTimeMinutes(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function slugifySeries(series: string): string {
  return series
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
