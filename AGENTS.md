# Agent Instructions

This repository is Deepu K Sasidharan's personal blog. Claude, Codex, OpenCode, and other coding agents should follow these instructions when working here.

## Writing Voice

- Before drafting or editing posts, read `WRITING-STYLE.md`.
- Treat `_posts/` as the source of truth for Deepu's voice, structure, and recurring patterns.
- Match the closest existing post or series before writing new content.
- Preserve Deepu's pragmatic, technical, conversational, first-person voice.
- Avoid generic AI prose, SEO filler, and marketing language unless a venue-specific company-blog CTA requires it.

## Blog Content

- Use Markdown and existing Jekyll frontmatter patterns.
- Link related posts in the same series when relevant.
- Link tools, standards, products, and frameworks on first mention.
- Keep code blocks language-tagged.
- Use screenshots, diagrams, and callouts only when they clarify the content.
- For Auth0 or company posts, keep product mentions topic-specific and near the end.
- For personal posts, do not add a product pitch.

## Repository Workflow

- Prefer small, focused changes.
- Do not rewrite unrelated content while editing a post.
- Do not remove frontmatter fields unless the user asks or the field is clearly obsolete.
- Preserve existing formatting conventions in nearby posts and files.
- Do not run destructive git commands.
- Do not commit changes unless the user explicitly asks.

## Verification

- For content-only changes, review the rendered Markdown structure manually.
- For site or template changes, run the relevant local build or test command if dependencies are available.
- Before returning a writing draft, check it against the checklist in `WRITING-STYLE.md`.
