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
  lib/schema.ts JSON-LD builders (Person, Organization, BlogPosting, …)
  pages/        File-based routes
  styles/       Tailwind theme tokens, prose-blog overrides
public/         Static assets, served as-is (CNAME, favicon, robots.txt, /assets, /svg-seq-diagram)
scripts/        check-seo.mjs (validates dist), make-og-image.mjs, migrate-posts.mjs
```

## SEO / GEO tooling

- `src/data/site.ts` holds the identity facts (author, publisher, employers,
  `sameAs` profiles). `src/lib/schema.ts` turns them into one JSON-LD `@graph`
  that `BaseLayout` emits on every page: WebSite, Blog, Person, three
  Organizations, the WebPage/ProfilePage/CollectionPage node, breadcrumbs, and
  the BlogPosting / SoftwareApplication / Book nodes for the content itself.
- `/robots.txt` allows search and AI crawlers and points at the sitemap.
- `/llms.txt` (curated summary) and `/llms-full.txt` (full post index) are
  generated at build time from the content collection, see `src/pages/llms.txt.ts`.
- `public/assets/images/og-default.png` is the fallback social image.
  Regenerate with `npm run og-image` after changing the branding.
- `npm run check:seo` validates `dist/`: meta basics, one `h1`, OG tags, prose
  typography tells, and every JSON-LD node against the live schema.org
  vocabulary (cached in `~/.cache/schema`).

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
npm run check:seo    # validate dist/ (meta, OG, JSON-LD vs schema.org)
```

`npm run build` emits the site to `dist/` and runs Pagefind to generate
the search index at `dist/pagefind/`.

## Publish to deepu.tech

```sh
./publish.sh         # builds the site, force-pushes dist/ to master, then
                     # syndicates new/changed posts to Dev.to
./publish.sh -s      # skip Dev.to syndication
./publish.sh -c      # CI mode (used by .github/workflows/ci.yml)
./publish.sh -d      # dry run: local build + Dev.to plan, no push, no API writes
```

The Dev.to sync runs last on purpose: Dev.to fetches `cover_image` from
deepu.tech when it creates an article and caches a failed fetch for months, so
the script waits (up to `PAGES_WAIT` seconds, default 300) for the pushed build
to go live before syndicating.

A post that already has `devto_url` must also carry a numeric `devto_id`, or the
script tries to create it again and Dev.to rejects the duplicate `canonical_url`
(a blank `devto_id:` also fails the Astro content schema).

GitHub Actions runs `./publish.sh -c` automatically on every push to
`site_src`. The site is served from the `master` branch via GitHub
Pages with the CNAME at `public/CNAME`.

## Comments (Giscus)

Comments are wired but inactive. To turn them on:

1. Enable Discussions on `deeputech/deeputech.github.io`.
2. Visit https://giscus.app, fill in the repo, pick a category.
3. Copy the `data-repo-id` and `data-category-id` values into
   `src/components/Giscus.astro`.
