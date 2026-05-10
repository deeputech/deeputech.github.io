import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
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

const series = defineCollection({
  loader: glob({ pattern: "series.yaml", base: "./src/data" }),
  schema: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
    }),
  ),
});

export const collections = { posts, series };
