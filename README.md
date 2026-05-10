# deepu105.github.io

My personal website and blog at https://deepu.tech

Built with [Astro](https://astro.build), Tailwind CSS v4, MDX,
[Pagefind](https://pagefind.app), [Giscus](https://giscus.app),
and [Expressive Code](https://expressive-code.com).

## Project layout

```
src/
  components/   Astro components (Header, Footer, TOC, SearchDialog, embeds/)
  content/posts/  62 MDX posts (loaded via the content collection)
  data/         Authors, series metadata, talks markdown
  layouts/      BaseLayout, PageLayout, PostLayout
  lib/posts.ts  Helpers: getPublishedPosts, getAllTags, getAllSeries, …
  pages/        File-based routes
  styles/       Tailwind theme tokens, prose-blog overrides
public/         Static assets, served as-is (CNAME, favicon, /assets, /svg-seq-diagram)
scripts/        One-off scripts (e.g. migrate-posts.mjs)
```

## Develop

```sh
npm install
npm run dev          # http://localhost:4321
```

Drafts: drop a `published: false` MDX file into `src/content/posts/` (it's
filtered from listings) or use the `_drafts/` directory for in-progress
markdown that hasn't been migrated yet.

## Build & preview

```sh
npm run build        # astro build && pagefind --site dist
npm run preview      # serve ./dist
```

`npm run build` emits the site to `dist/` and runs Pagefind to generate
the search index at `dist/pagefind/`.

## Publish to deepu.tech

```sh
./publish.sh         # syndicates new/changed posts to Dev.to,
                     # builds the site and force-pushes dist/ to master
./publish.sh -s      # skip Dev.to syndication
./publish.sh -c      # CI mode (used by .github/workflows/ci.yml)
```

GitHub Actions runs `./publish.sh -c` automatically on every push to
`site_src`. The site is served from the `master` branch via GitHub
Pages with the CNAME at `public/CNAME`.

## Comments (Giscus)

Comments are wired but inactive. To turn them on:

1. Enable Discussions on `deeputech/deeputech.github.io`.
2. Visit https://giscus.app, fill in the repo, pick a category.
3. Copy the `data-repo-id` and `data-category-id` values into
   `src/components/Giscus.astro`.
