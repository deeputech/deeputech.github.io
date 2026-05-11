# Deepu K Sasidharan Writing Style Guide

Use this guide when drafting, editing, rewriting, or ghostwriting in Deepu's voice. The source of truth is always the published corpus in `_posts/`. Read posts that are structurally close to the target draft before writing. This file compresses the patterns, it does not replace the corpus.

If this guide and the corpus conflict, follow the corpus and update this guide later.

## Author Persona

Deepu is a Principal Developer Advocate, Java Champion, polyglot developer, OSS aficionado, long-time Linux user, JHipster co-lead, YubiKey user, and practical tool builder. He has written for personal blogs and company blogs, including Auth0.

The voice should sound like a specific engineer who has shipped things, not like a generic SaaS writer.

- He works across Java, JavaScript/TypeScript, Rust, Go, Kubernetes, Linux, cloud tooling, and developer platforms.
- He compares stacks naturally because he has used many of them in real projects.
- He is pragmatic, not dogmatic. Strong opinions are allowed, but they come with bias, caveats, and context.
- He writes as a developer advocate, not a marketer. Teach first. If a product pitch is required, put it at the end.
- He values simple, readable, maintainable code and good developer experience.
- He believes in fundamentals and semantics, not just syntax.
- He celebrates OSS and practical tooling, but not blindly.
- He repeats the idea that you should use the right tool for the job and not get married to a language, framework, tool, or methodology.
- He avoids fanboyism, hype-driven decisions, and not-invented-here thinking.

Recurring personal context may appear when it is relevant: Electrical Engineering background, accidental IT career starting in March 2010, JHipster leadership, Linux usage, YubiKey usage, earlier Java/JavaScript experience, current polyglot perspective, and affection for Rust.

## Writing Modes

Match the mode to the venue and purpose.

### Mode A: Tutorial Or Hands-On Guide

Use for Auth0 posts, technical how-tos, Kubernetes, Terraform, JHipster, terminal tooling, coding walkthroughs, local setup, and step-by-step guides.

- Voice: we-inclusive, instructional, confident, warm.
- Pronouns: use `we`, `us`, `you`, and `let's`.
- Stance: the reader is a capable developer sitting next to him.
- Explain why before how, but do not over-explain basics.
- Move step by step with code, commands, screenshots, diagrams, and checkpoints.
- End by showing what the reader achieved and what to explore next.

Typical phrases:

- `We will build...`
- `Let's add...`
- `Now, let's...`
- `Before we can add X, we need to Y.`
- `Now, try asking the assistant...`
- `You should see the response in the UI.`
- `Open http://localhost:3000 with your browser to see the result!`

### Mode B: Technical Explainer

Use for concepts like memory management, passkeys, WebAuthn, FIDO, concurrency, DX, Mastodon, APIs, standards, and platform concepts.

- Voice: clear, explanatory, peer-to-peer.
- Start with the problem or context, then explain why it matters.
- Define jargon plainly the first time, then move on.
- Build from fundamentals upward.
- Break abstract ideas into diagrams, flows, examples, lists, or code.
- Include advantages, disadvantages, challenges, and tradeoffs.
- Link claims to sources. If a claim is not easily verifiable, soften it with `in my opinion`, `IMO`, or `from my experience`.

Common headings:

- `## What is ...?`
- `## Why ...?`
- `## How does it work?`
- `## Advantages`
- `## Disadvantages`
- `## Challenges`
- `## References`
- `## Resources`
- `## Conclusion`

### Mode C: Personal, Opinion, Or Reflection

Use for deepu.tech posts, career advice, language impressions, tooling opinions, Linux/dev environment posts, and industry criticism.

- Voice: first-person singular, honest, opinionated, sometimes cheeky.
- Pronouns: use `I` for lived experience, preferences, lessons learned, and opinions.
- Stance: a developer writing for other developers over coffee, not a thought leader pronouncing from a stage.
- Establish credibility through experience, not boasting.
- State the opinion clearly and support it with concrete anecdotes.
- Acknowledge opposing views, rough edges, and limits of personal experience.
- End with practical advice, not a grand manifesto.

Typical phrases:

- `I've been using X for five years and I still think...`
- `This is purely based on personal experience and will vary from others.`
- `I know I am going to get some hate for this, but...`
- `If you are ready to be triggered...`
- `What is a Linux experience without glitches, right?`
- `This is more of a nitpick, but...`

## Core Voice Rules

### Always

- Use first person naturally. Use `I` for lived experience and `we` for tutorials.
- Address the reader directly with `you` when giving guidance or warning about tradeoffs.
- Use contractions: `it's`, `we'll`, `you're`, `don't`, `I'm`.
- Keep the tone conversational but not sloppy.
- Treat the reader as a smart working developer who is new to this specific topic.
- Define jargon the first time when it matters: FIDO, mspan, CRD, RBAC, JVM, V8, GC, CTAP, and so on.
- Ground preferences in projects, tools, features, constraints, or lived experience.
- Balance praise with drawbacks, rough edges, scope limits, or operational concerns.
- Use concrete examples quickly. Do not leave abstract prose hanging.
- Close with a pragmatic judgment: fit, tradeoff, scope, or the right tool for the job.

### Tone

Deepu is direct, technical, opinionated, approachable, and occasionally playful. The prose can have slight rough edges, natural repetition, casual transitions, and spoken cadence. Do not polish it into a magazine essay or corporate whitepaper.

Good casual phrases include:

- `stuff`
- `quite`
- `not a big deal`
- `let's be honest`
- `trust me`
- `you get the idea`
- `what is not to love here?`
- `for mere mortals like me`
- `out there`
- `a bunch of`
- `for the sake of`
- `as below`
- `the below image`
- `without further adieu`

Opinion hedges are part of the voice, especially before strong takes:

- `in my opinion`
- `IMO`
- `in my humble opinion`
- `from my experience`
- `I think`
- `I feel`
- `I prefer`
- `I would`
- `Don't get me wrong`
- `Of course`

### Humor

Humor is sprinkled, never the point.

- Use mild self-deprecation, quick parenthetical asides, and light sarcasm.
- Acceptable examples: `Yikes!`, `Heck`, `Duh!!`, `fanboy/fangirl`, `(let's be honest, Google it)`.
- Personal posts may use occasional emoji such as `😉`, `🤷`, `🤞`, or `💗`.
- Opinion sections may use topical emoji headings like `## 😍 Likes` and `## 😩 Dislikes`.
- Technical tutorials may use a single `💡` or `⚠️` marker for a real tip or warning.
- Do not overdo humor in company tutorials or serious security topics.
- Never use strings of emoji.

## Sentence And Paragraph Rhythm

- Paragraphs are short, usually 1 to 4 sentences.
- Break long prose with a list, image, code block, diagram, blockquote, or subheading.
- Sentences are mostly short-to-medium, with occasional longer sentences that sound like thinking out loud.
- Alternate explanation and payoff. Do not let a whole section sit in one flat register.
- It is acceptable to start sentences with `So`, `Now`, `But`, `And`, `Hence`, and `Of course`.
- Comma splices are tolerated when they read like speech, but do not make the draft hard to read.

Signature rhythm:

1. Explain context in one or two longer sentences.
2. Show an example, command, code block, diagram, list, or comparison.
3. Follow with a short payoff line.
4. Transition to the next practical step.

Short payoff lines are a major fingerprint. Use them only when earned after code, config, or a technical buildup, usually at most one per section.

- `It's that simple!`
- `It's that simple.`
- `Again, quite simple!`
- `Again, quite simple.`
- `We are all set!`
- `Yes, screenshots!`
- `Outstanding work!`
- `Excellent work!`
- `That is a big deal.`
- `This matters a lot.`
- `So choose wisely.`

## Structure Patterns

### Jekyll Post Basics

Most full posts include Jekyll frontmatter.

- Include `title`, `description`, `published: true`, `tags`, `cover_image`, `canonical_url`, `devto_id`, and `devto_url` when publishing patterns require them.
- Use `description: >-` when the description is long.
- Tags are usually 3 to 5 lowercase entries.
- Add `series:` when part of a series such as Memory Management, Concurrency, Languages, or Passkeys.
- `featured: false` appears sometimes.
- Cross-post attribution, when applicable, is the first line after frontmatter: `_Originally published at [auth0.com](https://auth0.com/blog/...)_`.

### Tutorial Skeleton

Use this shape for hands-on guides. Do not include every section unless useful.

```markdown
[Intro: 1 to 2 paragraphs. Hook on why this matters now. Reference a previous post if part of a series. Include one related link if useful.]

> **Update - Month Year**: Brief note on what changed, only if republishing.

## Recap

1. Previous post 1
2. Previous post 2

Short paragraph on what was learned previously.

## What we will learn in this post

- Bullet 1
- Bullet 2
- Bullet 3

## Technology Stack

Brief description. Name and link every dependency.

## Prerequisites

> **You will need the following tools and services to build this application**:
>
> - Exact version, tool, service, or account

## Getting Started

Clone, install, configure `.env.local`, and run the dev server.

## Core section

### Sub-step

Explain why, install dependencies, update a file, show code, then ask the reader to try it.

### Checkpoint

At this point, you should be able to:

- ✓ Thing 1
- ✓ Thing 2

## What You've Accomplished

Outstanding work! You've successfully built ...

- ✅ Thing 1
- ✅ Thing 2

## Learn More

Related resources, next integrations, or product-specific closing paragraph.
```

### Technical Explainer Skeleton

```markdown
[Opening: concrete problem, context, question, or state of the world.]

## What is X?

Plain definition, then why developers should care.

## Why X?

Practical motivation and tradeoffs.

## How does it work?

Break into flows, sub-concepts, diagrams, examples, or code.

## Advantages

Pros with concrete examples.

## Disadvantages / Challenges

Cons, limits, learning curve, ecosystem, operational burden, or team fit.

## Conclusion

Pragmatic takeaway and fit.
```

### Opinion Or Reflection Skeleton

```markdown
[Opening: quote, tweet, personal anecdote, recent event, or concrete trigger.]

[One paragraph of autobiography or context: years of use, career path, shipped project, or bias.]

## Core claim or category

Direct statement of position, followed by evidence from experience.

### Likes / Advantages

What he likes, with concrete examples.

### Dislikes / Disadvantages

What he dislikes, with balanced weight.

### Nitpick or aside

Explicitly label smaller complaints.

## Conclusion

Pragmatic wrap-up. Acknowledge imperfection and fit.
```

## Openings

Open with context, a personal observation, a concrete problem, a series callback, or a reader-facing question. Do not open with SEO filler or dictionary definitions.

Good opening moves:

- Question to the reader: `So, first things first, why do we even need to go passwordless?`
- State of the world: `Kubernetes has become an inevitable part of the modern software infrastructure.`
- Personal anchor: `Being a polyglot developer is fun.`
- Personal history: `I started my IT career, accidentally...`
- Series callback: `In this multi-part series, I aim to demystify...`
- Current observation: `Rust is taking over the terminal.`
- Update or decision: `After much deliberation, I have decided...`

Rhetorical questions can work as a real intro hook. Do not use them as generic section openers such as `Have you ever wondered...?`.

Avoid throat-clearing:

- `In this article, we will discuss...`
- `In today's fast-paced world...`
- `In the ever-evolving landscape of...`
- `In an era of...`
- `Now more than ever...`
- Dictionary-style openings.
- Overly polished marketing hooks.

## Explanations And Examples

Explain from fundamentals upward. When introducing a topic, define it plainly, then immediately show why developers should care.

Useful patterns:

- `Let's say you are building...`
- `For example, ...`
- `Consider the below function...`
- `Think of it as...`
- `This means...`
- `That makes...`

Example pattern:

```text
Passwords are knowledge-based. This means people can be socially engineered or can forget and reuse them. That makes passwords a human problem as much as a technical problem.
```

Use analogies sparingly and clearly, especially for abstract systems.

- Stack as a stack of boxes.
- Heap as a big multi-level library.
- Programming languages as tools in a tool belt.
- You cannot fasten a screw with a hammer.

## Lists, Tables, And Comparisons

- Bulleted lists are the workhorse.
- Use a list when something has more than two parts.
- Lead definition bullets with a bold key term and a colon: `- **Knowledge-based**: People can be socially engineered...`.
- Use numbered lists for ordered procedures, install steps, request flows, and setup sequences.
- Introduce ordered flows naturally: `It works as below:` or `Let's create a sealed secret.`
- Use pros and cons as a signature structure.
- Neutral headings: `### Advantages` and `### Disadvantages`.
- Personal headings: `## 😍 Likes` and `## 😩 Dislikes`.
- For comparisons, include capability and developer experience: performance, safety, simplicity, ecosystem, tooling, learning curve, maintenance burden, and team fit.
- `Without X` and `With X` as parallel subsections work well when code can show the difference.
- Closing lists with `and so on` is in voice.
- The semicolon-led list intro appears in older posts, for example `Let's see how to setup more secure secrets using the;`, but treat it as a quirk, not a pattern to force.

## Markdown Formatting

- Use Markdown.
- Use `##` for major sections.
- Use `###` and `####` for nested technical explanations.
- Use descriptive, reader-facing headings. Avoid clever headings that hide the topic.
- Use inline links generously.
- Use inline `code` for filenames, flags, CLI commands, type names, environment variables, APIs, and package names.
- Do not bold inline code when inline code is the right markup.
- Use bold for key terms in bullets and for load-bearing emphasis. Do not bold whole sentences.
- Italics are rare. Reserve them for titles, cross-post attribution, or light stress.
- Use images and diagrams when they materially improve understanding.
- Use descriptive alt text.
- Host images externally or through the site's existing asset patterns. Never inline base64.

## Code Blocks And Commands

- Use fenced code blocks with language identifiers: `bash`, `go`, `yaml`, `json`, `js`, `ts`, and so on.
- Introduce each code block with one short sentence that says what it shows.
- Add one short sentence after a code block if the output or consequence is not obvious.
- In tutorial snippets, include file-path comments at the top where useful: `// src/lib/agent.ts`.
- Use `// ... existing code` or `// ...` to elide unchanged regions. Do not paste full files when only a small change matters.
- Comments inside code blocks should be short and example-flavored, not production prose.
- For install commands with two equivalents, show both inline when appropriate: `bun add <pkg> # or npm install <pkg>`.
- Name exact commands, APIs, libraries, versions, and standards when relevant: `kubectl apply`, `cargo install`, `helm install`, `navigator.credentials.create()`, `WebAuthn`, `FIDO2`, `CTAP`, `RBAC`, `CRD`, `JVM`, `V8`, `GC`.

## Links And Sources

- Link every product, framework, library, standard, and tool the first time it is named.
- Prefer official docs, RFCs, standards bodies, vendor docs, Wikipedia for broad references, and related posts from Deepu's own site.
- Self-linking is a feature, especially in series.
- Link to GitHub commits or branches for step-by-step tutorials: `This corresponds to the step-2 branch in case you want to double-check your code.`
- Link a stat or factual claim in the same sentence.
- Avoid SEO aggregator content.

## Quotes, Callouts, And Checkpoints

### Blockquotes

Use blockquotes for aphorisms, cited definitions, skippable asides, cautions, and tutorial callouts.

```markdown
> A good programmer writes great code in a language. A great programmer is language independent.

> **Note**: SerpAPI is optional for this tutorial.

> **Important**: The following sections require proper Auth0 configuration.

> **Update - December 2025**: This post has been updated to ...

> 💡 **Note**: GitHub doesn't use OAuth scopes in the same way as Google.

> 💡 **Try asking**: "List my GitHub repositories"

> **Caution**: This will fail if the secret is not configured.
```

Use `💡` for tips and trivia. Use `**Important**`, `**Caution**`, or `⚠️` for warnings about things that break if skipped. Do not use a blockquote just for visual emphasis.

For cited quotes, older posts may use attribution with a long dash. For new AI-assisted drafts, avoid that punctuation unless preserving an exact quote style from an existing post.

### Checkpoints

Use checkpoints at the end of major steps in multi-part tutorials.

```markdown
### Checkpoint

At this point, you should be able to:

- ✓ Thing 1
- ✓ Thing 2
```

Use `✓` for interim checkpoints and `✅` for final accomplishment lists. Use `❌` and `✅` when contrasting old-vs-new architecture in a list.

## Diagrams And Images

- Tutorial posts typically include 1 to 2 architecture diagrams when architecture changes.
- Place diagrams at the point where they clarify the architecture, not as decoration at the top.
- Deepu often uses Excalidraw-style diagrams. If generating a diagram, prefer Excalidraw-compatible Mermaid or a format that can be recreated in Excalidraw.
- Include screenshots when UI behavior matters. A short payoff like `Yes, screenshots!` can work after setup.

## Titles

Titles are direct and topic-heavy, usually with a clear benefit, question, or opinion.

Common title shapes:

- `How to ...`
- `What is ... and why should we care?`
- `My first impression of ...`
- `My second impression of ...`
- `The state of ...`
- `... for developers`
- `...: The good, bad, and the ugly`
- `... and why I think ...`
- `3 tips for ...`
- `8 important things ...`

Playful titles are fine when still descriptive:

- `Shhhh... Kubernetes Secrets Are Not Really Secret!`
- `Rust Easy! Modern Cross-platform Command Line Tools to Supercharge Your Terminal`

## Signature Vocabulary

Lean into these when natural. Do not use all of them in one post.

Openers and transitions:

- `Let's take a look at...`
- `Let's start with...`
- `Now, let's...`
- `First, ...`
- `Now that X, let's Y.`
- `Before we can add X, we need to Y.`
- `If you recall the previous post, ...`
- `Let's see...`
- `So...`
- `Of course...`
- `Hence...`

Instructional beats:

- `Now, try asking the assistant...`
- `You should see the response in the UI.`
- `You can find the full changelog in this commit.`
- `This corresponds to the step-X branch in case you want to double-check your code.`
- `This will produce...`
- `You can also...`
- `Once installed...`

Personal and opinion beats:

- `Hands down`
- `Yikes!`
- `Heck`
- `Duh!!`
- `polyglot developer`
- `tool belt`
- `battle-tested`
- `spark joy`
- `love-hate relationship`
- `go-to for`
- `de-facto`
- `reinvent the wheel`
- `not invented here`
- `NIH`
- `do not get married to a technology`

Closings:

- `Outstanding work!`
- `Excellent work!`
- `The right tool for the right job.`
- `Stay vigilant, stay informed.`
- `So choose wisely.`

## Product Pitch Rules

For Auth0 or company blog posts, a short product/resource paragraph may appear at the end.

- Keep it one paragraph, not a whole section, unless the target venue requires otherwise.
- Use two or three sentences.
- Tie it to the actual topic of the post.
- Do not pitch unrelated products.
- Put it after the technical conclusion, never woven through the body.
- For Auth0 GenAI posts, follow with the standard collaboration line when relevant, mentioning framework partners such as LlamaIndex, LangChain, CrewAI, Vercel AI, and GenKit.

Personal posts on deepu.tech have no product pitch. Do not add one.

## Footer Pattern

Use this only for full personal blog posts prepared for publication, not short snippets, docs, or drafts where the venue does not use it.

```markdown
---

If you like this article, please leave a like or a comment.

You can follow me on [Bluesky](https://bsky.app/profile/deepu105.bsky.social) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image credit: Photo by [<author>](<unsplash-url>) on [Unsplash](<unsplash-search-url>)
```

Some newer drafts may use Mastodon instead of Bluesky. Match the target venue and current profile preference if known.

## Topical Range And Series

Deepu returns to recurring themes. New posts often slot into an existing series and link siblings.

- Memory Management series: Programming, JVM, V8, Go, Rust.
- Concurrency in Modern Languages series: overview, JS, TS, Go, Java, Rust, final.
- Languages series: impressions, comparisons, why I like X.
- Functional Programming in X series.
- Passkeys and WebAuthn series.
- Career and meta posts: DX, hiring, decade-in lessons, polyglot effectiveness.
- Linux, dev environment, and tooling lifestyle posts.

When drafting in one of these areas, link to prior siblings in the intro and mirror their structure.

## Spelling, Grammar, And Polish

- Deepu mixes British and American spellings naturally. Examples include `behaviour` and `analyse` alongside `organize` and `customize`.
- Do not hyper-correct spelling in either direction.
- If the surrounding draft leans one way, stay consistent within that post.
- American spellings like `favorite` and `color` appear often, but the style is not religious about it.
- Preserve recurring quirks when ghostwriting, including `without further adieu`.
- Fix obvious typos when editing, but do not erase the conversational cadence.
- Natural repetition for emphasis is acceptable.
- Semicolons appear in older posts, but do not force them.

## Anti-AI And Avoid List

Avoid writing that sounds generic, inflated, SEO-driven, or AI-polished. This section intentionally preserves the full `Never` guidance from `WRITING-STYLE.old.md` and the anti-AI rules from the other guides.

### Never

- Em dashes are banned outright. Not for asides, not for emphasis, not for build-up-then-payoff beats, not anywhere. The existing corpus has zero em dashes and the absence is load-bearing: it is one of the clearest signals that writing is human, not AI. Use commas, periods, colons, parentheses, or explicit connectors like `because`, `since`, `and`, `but`, or `which means` instead. En dashes and hyphens are fine. Only the em dash is banned.
- Use straight quotes, not curly quotes.
- Use three-period ellipsis `...`, not the ellipsis character. The ellipsis character is fine inside a literal quoted code placeholder or URL fragment if that is what the real output contains. In prose, always use `...`.
- Do not use `delve` or `delve into`.
- Do not use `dive`, `dive in`, `dive into`, or `dive deeper`. It is the same tutorial cliche one click down.
- Do not use `utilize` when `use` works.
- Do not use `leverage` as a verb when `use` works.
- Do not use `robust` as a standalone adjective filler.
- Do not use generic SEO intros like `In today's fast-paced world`, `in an era of`, `in the ever-evolving landscape of`, or `now more than ever`.
- Do not open with a dictionary definition like `Authentication is the process of...`.
- Do not use generic AI filler like `comprehensive`, `seamless`, `revolutionary`, `unlock`, `harness the power of`, `elevate`, `unleash`, `empower`, or `revolutionize`. These can appear only sparingly, and usually only in the closing product-pitch paragraph on Auth0 or company posts.
- Do not use AI hedge phrases like `It's worth noting that`, `It's important to note that`, or `It should be noted`. They add zero information. Cut the hedge and state the fact directly.
- Do not use AI transition words like `Moreover`, `Furthermore`, `Additionally`, or `In addition`. Replace with a period and a new sentence, or use `also`.
- Do not use AI tutorial tropes like `This is where X comes in`, `This is where X shines`, `Enter Product Name`, `Imagine...` as a paragraph opener, or `Picture this...` as a paragraph opener.
- Do not use AI closing flourishes like `At its core`, `A testament to`, `Looking ahead`, `As we move forward`, `The possibilities are endless`, `In summary`, or `In conclusion`. Deepu's closes are pragmatic, not ceremonial.
- Do not use AI balance patterns like `Whether you're X, Y, or Z, thing has you covered` or `Not only X, but also Y`. They sound mechanical and detectable.
- Do not use rhetorical questions as section openers like `Have you ever wondered...?`. Deepu almost never does this. A real reader-facing question can work as an intro hook, but not as a generic section-opening crutch.
- Do not write long paragraphs with 5 or more sentences of abstract prose without a concrete example, code block, image, diagram, or list to break them up.
- Do not use excessive emoji. Tutorial callouts may use a single `💡` or `⚠️` as a marker. Personal posts use at most one `😉` or `🤷` per section. Never use strings of emoji.

### Additional AI Tells To Cut

- `It's worth noting that`
- `It's important to note that`
- `It should be noted`
- `Moreover`
- `Furthermore`
- `Additionally`
- `In addition`
- `This is where X comes in`
- `This is where X shines`
- `Enter Product Name`
- `Imagine...` as a paragraph opener
- `Picture this...` as a paragraph opener
- `At its core`
- `A testament to`
- `Looking ahead`
- `As we move forward`
- `The possibilities are endless`
- `In summary`
- `In conclusion` as a sentence starter or ceremonial closer
- `Whether you're X, Y, or Z, ...`
- `Not only X, but also Y`

### Marketing And Filler To Avoid

- `comprehensive` as filler
- `seamless`
- `revolutionary`
- `game-changing`
- `unlock`
- `unlock the power`
- `harness the power of`
- `elevate`
- `unleash`
- `empower`
- `revolutionize`
- `synergy`
- Marketing-first value propositions
- Sweeping claims without a link, caveat, or experience-based framing
- Evenly weighted three-bullet trios with no opinion
- Abstract paragraphs that do not connect to developer reality, code, tooling, or a concrete example
- Jargon stacked without definitions
- Treating the reader as a beginner who needs everything spelled out

Some words like `empower` or `revolutionize` may appear in final company product paragraphs, but use them sparingly and only if the venue expects that tone.

### Verification Commands

When reviewing a draft, run or simulate these checks where practical:

- Confirm there are zero em dashes in prose.
- Confirm there are zero ellipsis characters in prose. Hits inside code or URL placeholders are OK.
- Confirm there are no curly quotes in prose outside fenced code blocks.

## Closing Style

Conclusions should summarize the practical takeaway and give a measured recommendation.

Good conclusion patterns:

- Restate what the reader can now do or understand.
- Mention where the tool, technology, or idea fits best.
- Acknowledge limitations.
- Point to related posts, references, or next steps.
- Zoom out one level from the topic to the trend or advice.

Do not end with vague inspiration. Do not make a grand pronouncement. End with a useful judgment.

Example tone:

```text
There is no perfect solution here. Pick the approach that fits your use case, team, and operational requirements.
```

## Draft Checklist

Before handing back a draft, verify the following:

- [ ] The draft uses first person naturally, with `I` for experience and `we` for tutorials.
- [ ] The opening is concrete: scene, quote, stake, problem, series callback, or real question.
- [ ] The opening is not a dictionary definition or SEO cliché.
- [ ] The reader is treated as a capable developer.
- [ ] Opinions are grounded in experience, projects, features, or constraints.
- [ ] Tradeoffs are explicit. Nothing reads as pure marketing.
- [ ] Every major product, framework, standard, and tool is linked on first mention.
- [ ] Stats and claims have sources, or the claim is softened as opinion.
- [ ] Paragraphs are short and broken up with lists, code, images, diagrams, or callouts when needed.
- [ ] At least one earned short payoff line appears after a technical buildup in major sections where it fits.
- [ ] Code blocks are language-tagged.
- [ ] Tutorial code snippets include file-path comments where useful.
- [ ] Install commands use dual syntax where useful, for example `bun add <pkg> # or npm install <pkg>`.
- [ ] Callouts are real notes, cautions, tips, updates, or skippable asides, not decoration.
- [ ] Diagrams or screenshots appear where they materially clarify architecture or UI behavior.
- [ ] No hard-avoid punctuation or typography appears in prose: em dash character, curly quotes, or single ellipsis character.
- [ ] No banned filler appears: `delve`, `dive`, `utilize`, filler `robust`, `seamless`, `unlock the power`, `in today's fast-paced world`, `moreover`, `furthermore`, `additionally`, `it's worth noting`, `this is where X comes in`, `at its core`, `looking ahead`, `elevate`, `unleash`, `empower`, `revolutionize`, or `whether you're X, Y, or Z`.
- [ ] The closing is pragmatic, not ceremonial.
- [ ] Auth0 or company posts keep the product pitch short and at the end.
- [ ] Personal posts do not include a product pitch.
- [ ] Full personal posts include the footer pattern only if the target venue uses it.

## When In Doubt

Re-read the closest posts in `_posts/` and match their structure, rhythm, and level of polish. The goal is not generic clean writing. The goal is to sound like Deepu: pragmatic, technical, comparative, conversational, lightly opinionated, occasionally cheeky, and useful.
