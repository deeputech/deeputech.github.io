import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/posts",
    // Files are named `YYYY-MM-DD-<slug>.mdx` so the directory sorts in
    // chronological order. The leading date is purely visual — the post id
    // (= URL slug) is the part after it.
    generateId: ({ entry }) =>
      entry.replace(/\.mdx?$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, ""),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    last_modified_at: z.coerce.date().optional(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    series: z.string().optional(),
    cover_image: z.string().optional(),
    canonical_url: z.string().url().optional(),
    devto_id: z.union([z.string(), z.number()]).optional(),
    devto_url: z.string().url().optional(),
    skip_devto: z.boolean().optional(),
    toc: z.boolean().default(true),
    rating: z.number().min(0).max(5).optional(),
    comments: z.boolean().default(true),
    author: z.string().default("deepu"),
    beforetoc: z.string().optional(),
  }),
});

// Series metadata is a plain TS module at src/data/series.ts (Vite can't import
// raw .yaml without a plugin and we don't need the collection layer for it).

export const collections = { posts };
