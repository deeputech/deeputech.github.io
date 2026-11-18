# Conference talk tracker

Last updated: 2026-11-17

Talks and speaker info first, then one section per event, then notes.

## Upcoming events

| Event                          | Date                  | Where                 | Talks                        | Status               | Next step                                         |
| ------------------------------ | --------------------- | --------------------- | ---------------------------- | -------------------- | ------------------------------------------------- |
| AI Builders Amsterdam (meetup) | Dec 16, 2026          | StartDock, Amsterdam  | T1 (15 min)                  | Applied 2026-11-04   | Wait for the organiser's reply                    |
| AI Builders Amsterdam (meetup) | Jan 20, 2027          | StartDock, Amsterdam  | T2 (15 min)                  | Applied 2026-11-04   | Wait for the organiser's reply                    |
| Jfokus 2027                    | Feb 8-10, 2027        | Stockholm Waterfront  | T1, T2 (45 min), W1 (90 min) | Submitted 2026-11-17 | Wait for the CFP result                           |
| AI Engineer Europe 2027        | Feb 17-19, 2027       | ExCeL London          | T1, T2 (18 min), W1 (2 h)    | Submitted 2026-11-04 | Wait for the CFP result (CFP closes Dec 31, 2026) |
| Voxxed Days Amsterdam 2027     | Mar 31 to Apr 1, 2027 | Pathé Amsterdam Noord | T1, T2 (40 min), W1 (90 min) | Submitted 2026-11-04 | Wait for the CFP result (CFP closes Nov 30, 2026) |

## Prospects

| Event                                    | Date            | Where                   | Fit        | CFP                                   | Next step                                  |
| ---------------------------------------- | --------------- | ----------------------- | ---------- | ------------------------------------- | ------------------------------------------ |
| Applied AI Conference 2027 (Tech Europe) | May 25, 2027    | Berlin                  | T1, T2, W1 | Not published yet                     | Watch the site or ask via the contact page |
| Berlin Buzzwords 2027                    | Jun 13-15, 2027 | Kulturbrauerei, Berlin  | T1, T2     | Opens Nov 2026 (not open on Nov 4)    | Check later in November                    |
| DevOpsCon Berlin 2027                    | Jun 14-18, 2027 | Maritim proArte, Berlin | T2         | 2027 not open yet (2026 closed Jan 6) | Check in November                          |

## Talk index

| ID  | Title                                                     | Topic                                                              | Length        | Events                                                                                  |
| --- | --------------------------------------------------------- | ------------------------------------------------------------------ | ------------- | --------------------------------------------------------------------------------------- |
| T1  | Can your laptop replace a Claude subscription for coding? | Local models as a daily coding agent, benchmark vs Claude Opus 5.5 | 15 to 40 min  | AI Engineer Europe 2027, AI Builders Amsterdam, Voxxed Days Amsterdam 2027, Jfokus 2027 |
| T2  | Build a Claude Code-style auto mode for any agent harness | Command safety in 3 steps: rules, System 1 classifier, LLM         | 15 to 40 min  | AI Engineer Europe 2027, AI Builders Amsterdam, Voxxed Days Amsterdam 2027, Jfokus 2027 |
| W1  | Local coding agents without a cloud AI subscription       | Hands-on local AI setup for coding agents on 3 hardware tiers      | 90 min to 2 h | AI Engineer Europe 2027, Voxxed Days Amsterdam 2027, Jfokus 2027                        |

## Speaker bio

Deepu K Sasidharan is a Principal Developer Advocate at Auth0 (Okta), where he leads developer relations for Auth0 for AI Agents. He's a polyglot engineer with 16+ years of experience across Rust, Java, Go and JS/TS. He uses local LLMs as his daily driver for agentic coding. He created LlamaStash, an open source orchestrator for local models, and KDash, a terminal dashboard for Kubernetes, both written in Rust. He writes about local AI, Rust and Java on his blog, deepu.tech. Deepu is a Java Champion, co-chair of JHipster and author of Full Stack Development with JHipster. He has given 80+ talks at conferences like Devoxx and Spring I/O, and lives in Utrecht, Netherlands.

Source: `src/pages/cv.astro` summary.

## Talks

### T1: Can your laptop replace a Claude subscription for coding?

**Description:**

You'll learn what it's like to code every day with an AI model running on your own laptop. I've done months of real engineering work with Qwen 3.8 Flash Next running on my laptop, and I'll show what it built and how it did against Claude Opus 5.5 on the same complex Rust features.

In one of them, Opus scored higher, 87% vs 69%, but both built the feature and passed the same tests, and the local run cost about 2 cents of electricity instead of API or subscription costs. I'll show where the local model fell short, what surprised me (raw speed mattered a lot less than I thought), and the tricks that make it work day to day, like presets and running more agents in parallel. I'll also show my workflows for splitting work between local and cloud models.

**Speaker Pitch:**

I'm excited that local models are now good enough for real coding work, and I want to show it with real numbers, not hype. I've used Qwen 3.8 Flash Next as my daily driver for months and I publish my benchmarks and tuning on my blog. I also built LlamaStash, an open source orchestrator for local models, so I've hit these problems myself. I've given 80+ talks and workshops, including at Devoxx and Jfokus.

**Elevator Pitch:**

This talk answers whether a local model is good enough for real coding work. The answer comes from months of daily use and head-to-head benchmarks against Claude Opus 5.5, including where the local model fell short and what each run cost. People leave knowing what a laptop can and can't replace, and how to set up a local model if it fits their work.

### T2: Build a Claude Code-style auto mode for any agent harness

**Description:**

You'll learn how to let a coding agent run commands on its own without approving every one or going full YOLO. The strategy checks each command in three steps: simple rules, a small System 1 classifier, and then an LLM that knows what you asked for. It works with any agent harness, and I'll demo it with my own setup.

The rules take under a millisecond and catch over a fifth of the risky commands in a public benchmark before any model sees them, so prompt injection can't talk its way past those. The classifier handles most of the rest, and the LLM only gets the tricky ones. In my sessions, that cut the slow checks from about 10 seconds to 2. I'll also show where it falls short. And since no check catches everything, I'll end with how to limit the damage when a bad command gets through.

**Speaker Pitch:**

I'm excited about this because approving every command an agent runs gets old fast, and turning approvals off and YOLOing it isn't my cup of tea. I built this method into pi-automode-classifier, a plugin for the Pi coding agent, and tested it on my own coding sessions and four public sets of risky commands, so I can show the misses as well as the wins. At Auth0 I work on identity for AI agents, helping secure what happens after a command is allowed. I've given 80+ talks and workshops, including one on securing AI agents at Devoxx Belgium.

**Elevator Pitch:**

Coding agents are most useful when they run on their own, but approving every command is annoying and YOLO mode is risky. This talk shows a third option that works with any agent harness: rules for the hard limits, a small classifier for speed and an LLM for intent, backed by numbers from real sessions and public benchmarks. People leave with a pattern they can add to their own agents the next day.

### W1: Local coding agents without a cloud AI subscription

**Description:**

You'll learn how to run AI models on your own computer that can power a coding agent for real work. We'll use Qwen 3.8 Flash Next and Qwen 3.8 27B, on hardware from a gaming PC with 32 GB RAM up to 128 GB machines like AMD Strix Halo laptops, Nvidia DGX Spark and Macs. We start with my agent running the famous pagoda prompt (a 3D pagoda garden in one HTML file), and at the end we compare what it built with the output from some frontier models.

While it works, we go tier by tier: pick the model, quant and engine for your machine and tune presets for it. Then we hook up coding agents like Claude Code and Pi, run several in parallel, and add a guard that checks every command the agent runs, so we are not YOLOing it. It's demo-led, so follow along on your laptop or just watch.

**Speaker Pitch:**

I'm excited that local models are finally good enough for real coding work. I've used them as my daily driver since May 2026. In one of my benchmarks, Qwen 3.8 Flash Next on my laptop built the same complex Rust feature as Claude Opus 5.5 and passed the same tests, for about 2 cents of electricity instead of $17.78. I also built LlamaStash, an open source orchestrator for local models. At Auth0, I work on identity for AI agents, so the security part comes from my day job. I've given 80+ talks and workshops, including at Devoxx and Jfokus.

**Elevator Pitch:**

This workshop sets up local models good enough to run a coding agent for real work, on three hardware tiers from a 32 GB gaming PC to 128 GB machines, so people see what their own machine can do. It ends by comparing a long local agent run with frontier models, so they see the result and not just the setup.

---

# Events

## AI Engineer Europe 2027

- Event: Feb 17-19, 2027, ExCeL London. Day 1 workshops, days 2-3 talks and expo.
- Deadline: **Dec 31, 2026, 11:59 PM PT**. Max **3 submissions** per person.
- Formats: workshop (1-2 h), stage talk (18 min), breakout (18 min), online talk (reviewed separately).
- Vendor-neutral, hand-curated, ~10% acceptance in 2026. Theme this year: "Engineering Autonomy".
- Form fields: Session Title, Session Description, Session Format, Track, Speaker Pitch.
  - Session Description: "What will attendees learn? Be specific. 1-2 sentences go straight on YouTube!" So the first 1-2 sentences must say what attendees learn and work on their own.
  - Speaker Pitch: "Tell us what you're excited about and why you're the right person to present this talk!"
- Form: https://appv2.sessionboard.com/submit/ai-engineer-europe/041d33f7-e030-473c-a8f9-3f9ca6701bca
- 2026 accepted a local AI workshop ("Frontier AI at Home (literally)", Alex Cheema), so the topic gets in. Ours differs by focusing on coding agents with models you'd really use.

### Submissions

| Talk | Format            | Track                                       | Status               |
| ---- | ----------------- | ------------------------------------------- | -------------------- |
| T1   | Breakout (18 min) | Open-weight and sovereign AI                | Submitted 2026-11-04 |
| T2   | Breakout (18 min) | Evals, reliability, security and compliance | Submitted 2026-11-04 |
| W1   | Workshop (2 h)    | Open-weight and sovereign AI                | Submitted 2026-11-04 |

Open question: stage talk vs breakout. The CFP page lists both at 18 min without explaining the difference; ask cfp@ai.engineer. T1 may fit a stage talk.

### Decisions

- 3 submissions: talk 1 (local daily driver), talk 2 (command safety), workshop (practical local AI).
- Auth0 only where it fits: short section in talk 1 and talk 2, short demo in the workshop.
- Use full model names in all text: "Qwen 3.8 Flash Next", "Qwen 3.8 27B".
- Lead with open specs (OAuth token exchange, XAA/ID-JAG, CIBA, MCP), with Auth0 as the example, since the event is vendor-neutral.

## AI Builders Amsterdam

- Organiser: AI Builders (https://aibuilders.club), "a self-organizing bunch of AI nerds". Monthly meetup.
- Upcoming Amsterdam dates (Wed 17:30 to 21:00): Nov 18 and Dec 16, 2026, Jan 20 and Feb 24, 2027. StartDock Coworking, Prins Hendrikkade 21e, Amsterdam. Also a WTC Buildathon (hack day) on Feb 11, 2027.
- Agenda: walk-in 17:30, pizza 18:00, three slots at 18:30, 18:45 and 19:00, drinks 19:15.
- Talk lengths: 5 min lightning, 10 min demo, 15 min deep dive. "A demo beats a deck." No sales pitches. Real Q&A.
- Audience: engineers, researchers and product builders, mostly mid-to-senior, mostly at companies deploying AI in production. "They'll catch a wrong number and say so."
- Apply: https://aibuilders.club/speak#apply. Fields: first name, last name, email, LinkedIn or website, city, length, topic. Topic placeholder: "What you built, how the AI part works, and the one thing people will take away." One topic per application.
- Calendar: https://luma.com/ai-builders?tag=amsterdam

### Applications

| Talk | Meetup       | Length           | Status             |
| ---- | ------------ | ---------------- | ------------------ |
| T1   | Dec 16, 2026 | 15 min deep dive | Applied 2026-11-04 |
| T2   | Jan 20, 2027 | 15 min deep dive | Applied 2026-11-04 |

T1 topic:

I've done months of real coding with Qwen 3.8 Flash Next running on my laptop. I'll show what it built and how it did against Claude Opus 5.5 on the same complex Rust features. Opus scored higher, 87% vs 69%, but both passed the same tests, and the local run cost about 2 cents of electricity. You'll take away what a local model can and can't do as your daily coding agent, and the setup tricks that make it work.

T2 topic:

A way to let a coding agent run commands on its own without approving every one or going full YOLO: simple rules, a small System 1 classifier, then an LLM that knows what you asked for. I'll demo it live in my own setup. The rules catch over a fifth of the risky commands in a public benchmark before any model sees them, and the classifier cut the slow checks from about 10 seconds to 2. You'll take away a pattern you can add to any agent harness.

## Voxxed Days Amsterdam 2027

- Dates: Wed Mar 31, 2027 (hands-on workshop day), Thu Apr 1, 2027 (conference day, three stages, seven tracks).
- Venue: Pathé Amsterdam Noord, Buikslotermeerplein 2003, Amsterdam (10 min by metro from Centraal). Cinema screens.
- CFP: https://vdams27.cfp.dev/ (login needed). Opened Oct 6, 2026, closes **Nov 30, 2026, 23:59 CET**. Max 5 proposals. Title max 200 chars, description max 1500 chars. English only. "Submit early": early proposals get "the most careful reads".
- Session types (from the CFP API): Conference 40 min, Deep Dive 90 min, Workshop 480 min, Keynote 20 min.
- Tracks: Java & JVM; Data & AI ("Big Data, NoSQL, Machine learning, Deep Learning, Neural Networks"); Architecture; DevOps; Development Practices ("Sustainability, security, methodologies, better practices, UI/UX, testing & Tools"); Community & Career; Mind the Geek ("Robotics, biological computing, cybernetics, AI, new toys, tomorrows world"). The committee moves talks between tracks.
- What they want: "a talk only you can give", based on something you built, broke, fixed or learned. A community committee rates proposals before the CFP board decides.
- Audience: developers and architects, Java-heavy. Every session is recorded for the Devoxx YouTube channel (155K+ subscribers).
- Speaker benefits: not listed on the site.
- Site: https://amsterdam.voxxeddays.com/#speak

### Submissions

All three submitted 2026-11-04 (quota 3 of 5). Description = the talk's Description, Elevator Pitch = the talk's Elevator Pitch, Notes = the talk's Speaker Pitch without the talk-count sentence.

| Talk | Proposal | Session type        | Track     | Audience level | Technical intensity | Status    |
| ---- | -------- | ------------------- | --------- | -------------- | ------------------- | --------- |
| T1   | #7167    | Conference (40 min) | Data & AI | Beginner       | Moderate            | Submitted |
| T2   | #7168    | Conference (40 min) | Data & AI | Intermediate   | Moderate            | Submitted |
| W1   | #7169    | Deep Dive (90 min)  | Data & AI | Intermediate   | Moderate            | Submitted |

Form fields: Title, Description, Keywords, Track, Session Type, Audience Level, Elevator Pitch, Notes, Technical Intensity, Links & Resources. Each session comes with up to 2 speaker tickets.

## Jfokus 2027

- Event: Feb 8-10, 2027, Stockholm Waterfront Congress Centre, Stockholm. About 2000 attendees, six parallel tracks.
- Feb 8: deep dives (3.5 h), 90-min sessions and hands-on labs. Feb 9-10: 45-min sessions (about 40 min of talk plus 5 min of questions) and 15-min lightning talks.
- Focus: Java, the JVM and open source, plus AI, cloud, DevOps and other topics.
- CFP: Sessionize, https://sessionize.com/jfokus-2027/. It closed Oct 5, 2026. We submitted on 2026-11-17 through the `?e=` link that still opens the form.
- Commercial policy: no sessions that market or sell products or services. Mentions of products are OK.
- Travel: usually not covered. A small budget exists, case by case. Free ticket for speakers.
- Contact: speaker-support@jfokus.se
- Form fields: Session Title, Description, Session format, Level, Categories, How much of this abstract is created by AI (%), Message to program committee. Event fields: Company, Phone number, Bluesky, Conference speaking experience, Message to the Jfokus organization, travel expenses support.
- Sessionize profile tagline and bio are old ("Staff Developer Advocate @ Okta"). Update them in the Sessionize profile.

### Submissions

All three submitted 2026-11-17. Description = the talk's Description. Message to program committee = "Elevator pitch:" + the talk's Elevator Pitch, then "Why me:" + the talk's Speaker Pitch.

| Talk | Session format    | Level                     | Categories                 | Status               |
| ---- | ----------------- | ------------------------- | -------------------------- | -------------------- |
| T1   | Session (45 min)  | Introductory and overview | AI, Tools                  | Submitted 2026-11-17 |
| T2   | Session (45 min)  | Intermediate              | AI, Security, Tools        | Submitted 2026-11-17 |
| W1   | Session (90 min)  | Intermediate              | AI, Tools                  | Submitted 2026-11-17 |

Event fields: Company "Auth0", Conference speaking experience "80+ talks and workshops at conferences like Devoxx, Spring I/O and Jfokus".

## Prospects (not submitted)

### Berlin Buzzwords 2027

- Jun 13-15, 2027, Kulturbrauerei, Schönhauser Allee 36, Berlin. Community-run open source conference on data infrastructure, search and machine learning. Organiser: Plain Schwarz.
- CFP: "Our Call for Papers will open in November" (2026 site, Jul 22, 2026). The 2027 CfP page was not published on Nov 4.
- Formats (2026 CFP): Talk 40 min including Q&A, Short Talk 20 min, Panel 45 min. Up to three tags per session (Search, Store, Stream, Scale and more).
- Speakers: two free hotel nights in Berlin, no travel costs.
- Fit: T1 (open-weight models, open source tooling), T2 (classifier plus LLM with real numbers). No workshop format for W1.
- Site: https://2027.berlinbuzzwords.de/

### Applied AI Conference 2027 (Tech Europe)

- May 25, 2027, Berlin. "A one-day conference for engineers and technical leaders putting AI into production."
- Stages: Main (keynotes), Infra ("from data pipelines and model hosting to performance and cost"), Applied AI ("the agents, features and workflows they ship"), Workshops ("Bring your laptop and work through a practical AI problem step by step").
- Fit: T1 on Infra, T2 on Applied AI, W1 on Workshops.
- CFP: none published ("Line-up and tickets to be announced"). Contact page on the site.
- Site: https://conference.techeurope.io/

### DevOpsCon Berlin 2027

- Jun 14-18, 2027, Maritim proArte Hotel, Berlin. Commercial conference by S&S Media; IT Security Summit Berlin runs the same week.
- 2026 CFP topics included DevSecOps and Platform Engineering; 2026 deadline was Jan 6, 2026, via callforpapers.sandsmedia.com.
- Fit: T2 (DevSecOps).
- Site: https://devopscon.io/berlin/

### Skipped

- Rise of AI (May 12, 2027, Berlin): speaker interest form open (https://riseofai.fillout.com/speaker-interest), but the audience is mostly CEOs, CIOs and policy people.
- WeAreDevelopers World Congress (Jul 14-16, 2027, Berlin): fits all three, but it is in Q3.

---

# Notes

## Title rules (from dx.tips/titles)

- No colons. No filler openers ("Leveraging", "Towards", "Navigating").
- Quotable, with a strong opinion, a question, or an experience/scale claim.
- Avoid "that actually work" style promises.
- Titles are for humans; keywords go in the description.
- Not about me or my company.

## T1 notes

Status: **FINAL** (2026-11-04), submitted by Deepu. Title took the workshop's subscription question (it fits the Opus benchmark). Original daily-driver idea, told as experience: showcase, benchmark, learnings. Overlap with the workshop is fine (different formats, no guarantee both get in).

Previous: "Six months of agentic coding on a laptop" (does not say local AI). Alternatives: "What six months of local coding agents taught me", "Stop measuring local models in tokens per second", "Why is my local coding agent so slow?"

Facts behind the description: cold prefill 31k tokens about 3 min (full 128k about 18 min); client maxTokens under 8192 gave empty answers after 8 min; thinking is 90-95% of generated tokens; ROCmFP4 FAST build decoded fastest but had no prompt caching; per-request reasoning effort switch; Opus PRs handled edge cases the Qwen 3.8 Flash Next PRs missed (request during save, two evictions at once, loose cache key).

### T1 v1 for AI Engineer Europe (superseded)

**Session Title:** Six months of agentic coding on a laptop

Alternatives: "You might not need a frontier model for coding", "$17.78 or 2 cents?"

**Session Description:**

Since May 2026 most of my coding runs on a laptop: Qwen 3.8 Flash Next on an AMD Strix Halo with 128 GB unified memory, served by LlamaStash and driven by the Pi agent. I gave both models the same Rust feature. Claude Opus 5.5 (xhigh) scored 87% for $17.78 in 43 min. Qwen 3.8 Flash Next (medium) scored 69% for about 2 cents of electricity in 45 min. I'll share what made it usable day to day: per-model presets, named launches and aliases to run several small-context agent lanes on one machine, and MTP speculative decoding (2.3x to 3.1x faster decode). Greedy sampling ran 2.8x faster than Qwen's recommended settings because it keeps MTP draft acceptance high. I'll also cover what still goes to the cloud, and how the local agent reaches GitHub and MCP servers at work without long-lived tokens in a dotfile.

**Session Format:** Breakout (18 min)

**Track:** Open-weight and sovereign AI

**Speaker Pitch:**

I've done most of my agentic coding on local models since May 2026, and I publish the numbers: Strix Halo tuning, a reproducible LlamaStash benchmark, and a 12-run comparison of Qwen 3.8 Flash Next against Claude Opus 5.5 on a real Rust feature. I built LlamaStash, an open source Rust tool for running local LLMs, so the tips come from running and fixing it every day. I'm a Principal Developer Advocate at Auth0 (Okta) working on identity for AI agents, a Java Champion and JHipster co-chair, with 80+ conference and meetup sessions.

## T2 notes

Status: **FINAL** (2026-11-04), submitted by Deepu. The talk teaches the method (rules + small model + the agent's own model); the Pi plugin is the example, and attendees adapt it to their own harness. Casual voice, plain terms, no product names in the description (same call as talk 1: Auth0 goes on a slide, not in the abstract).

Alternatives: "Stop approving every command your coding agent runs", "Should your coding agent run this command?", "Agent autonomy without YOLO mode" (matches the "Engineering Autonomy" theme). Rejected: "Replicate Claude Code's auto mode..." (sounds like a copy; the method adds rules and a small local model), "Rules first, models second, humans last" (doesn't say it's about coding agents; humans aren't always last, rule asks go straight to you).

Facts behind the description (upstream README, origin/main c077c3e, 2026-11-04): rules catch (block or always ask) 92 of 409 risky in lancet-bench-1 and 23 of 109 on the no-context bench; session replay (4 Pi sessions, 261 calls, Flash-Next medium): p95 for a call the rules leave open 9.8 s with Flash-Next alone vs 2.0 s with LANCET 0.1-0.2 then Flash-Next, chat model calls 42 vs 17, asks 0/19/4 of 258; my real commands asked 0 of 31; mix100 intent rows: chat decider 0 wrong asks vs 4 for Jev with session. Older facts (README c94576e): stage times rules under 0.1 ms, classifier (LANCET/Kev/Laya/Jev) 15 to 174 ms, chat model about 0.9 s; 4 vs 19 asks of 258 calls in four Pi sessions; bench without session context: 31 of 109 risky ran with all three stages vs 19 for LANCET alone, mostly read-only recon and /tmp deletes the rules allow on purpose; real misses `printenv` and a curl with a bearer token; hard limits (deletes of / or $HOME, disk formatting, fork bombs) are rules; tool output is hidden from the chat model; fails closed.

### T2 v1 for AI Engineer Europe (superseded)

**Session Title:** Rules first, models second, humans last

Alternatives: "Should your coding agent run this command?", "Stop asking humans about every agent command"

**Session Description:**

Coding agents run shell commands all day, and a guard that asks about each one gets switched off. I built an auto mode for the Pi agent that judges every call in 3 stages: rules (under 0.1 ms), a small CPU classifier (15 to 174 ms), then the chat model, which reads what you asked for (about 0.9 s). Hard limits live in the rules, so no model and no injected text can talk past them. On 258 replayed real tool calls it asked me about 4, against 19 with the classifier alone. I'll also show where it does worse. On a bench with no session context it let 31 of 109 risky commands run, against 19 for the classifier alone. Most of those are read-only commands the rules allow on purpose, but `printenv` and a curl sending a bearer token are real misses. That last one shows what a local gate can't cover: what an allowed command does with your tokens. So I'll close with downscoped per-task tokens, async approval over CIBA when nobody is at the terminal, and agent identity with On-Behalf-Of token exchange, so the audit log shows which agent acted for which user.

**Session Format:** Breakout (18 min)

**Track:** Evals, reliability, security and compliance

**Speaker Pitch:**

I built pi-automode-classifier and tested it on my own coding sessions and three public risky-command sets, so the numbers come from real use, including the misses. My day job at Auth0 (Okta) is identity for AI agents, so I can cover both halves: what a local gate decides, and what scoped tokens and approvals limit after a command is allowed. I've spoken on securing AI agents with OAuth and OpenFGA at Devoxx BE and other events, and I'm a Java Champion and JHipster co-chair.

## W1 notes

Status: **FINAL**, submitted by Deepu (2026-11-04: new title, plain-word edits for devs who don't know local LLM terms).

Previous: "Can your own hardware replace your Claude subscription?" (moved to talk 1). Rejected: "Useable/Useful local coding agents..." and "...that you will actually use" (vague promise per dx.tips), "How much hardware does a local coding agent need?" ("local coding agent" also reads as a local agent on a cloud model), "Local AI without the toy models" (small models are useful: talk 2's classifier and the workshop's auto mode use one), "Useable Local AI setup for most consumer grade computers" ("most" is not true: Oct 2026 Steam survey has 16 GB as the most common RAM at 41.42%), "Can a laptop replace..." (mid and low tiers are desktops). Fallback if no vendor name wanted: "Fundamentals of local AI for coding agents".

To do before the workshop: frontier comparison outputs from Claude, GPT and Kimi (same pagoda prompt).

### Hardware tiers

| Tier                 | Example hardware                      | Model                                                                                                                             | Source                          |
| -------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| 128 GB unified       | Strix Halo, DGX Spark, Mac 128 GB+    | Qwen 3.8 Flash Next UD-Q4_K_XL (104 GB) as main agent; Qwen 3.8 27B Q6 (20 GB) or Q8 (27 GB) for parallel lanes                   | my setup                        |
| Mid: GPU + 64 GB RAM | RTX 30/40/50, RX 7900/9070, Mac 64 GB | Qwen 3.8 Flash Next ISTA-DASLab IQ2_XS to IQ3_S (39 to 55 GB RAM+VRAM) via Strata expert offload; or Qwen 3.8 27B on a 24 GB+ GPU | Strata docs, untested           |
| Low: GPU + 32 GB RAM | RTX 3060/5070 class                   | Qwen 3.8 Flash Next Coder IQ1_M (coding only, about 32 GB RAM with a suitable GPU)                                                | Strata docs, untested, may drop |

LlamaStash has recipes for Strata, Halogen, gufo and CIRU, so every tier uses the same workflow.

### Long agent run (opening and reveal)

- Start it in the first 5 minutes in Pi on Qwen 3.8 Flash Next, reveal at the end.
- Reference run (Oct 28, 2026): voxel pagoda prompt, Pi + Qwen 3.8 Flash Next (Halogen, multi-agent named launch). First pass took about **85 min**. Result: `oss-libs/voxel-pagoda-garden`, Minecraft-like look.
- Plan: test a realistic-style prompt first. If it doesn't finish within 1 h, use the explicit voxel (Minecraft-like) prompt.
- Time the test with live demos running on a second lane, since they share the GPU.

Realistic prompt to test:

> Design and create a very creative, elaborate, and detailed realistic 3D scene of a pagoda in a beautiful garden with trees, including some cherry blossoms. Use realistic materials, lighting and shadows. Make the scene impressive and varied. Use whatever libraries... paste it all into a single HTML file and open it in Chrome.

### Draft timeline

| Time | Segment                                                                                                    |
| ---- | ---------------------------------------------------------------------------------------------------------- |
| 0:00 | Kick off the pagoda run in Pi on Qwen 3.8 Flash Next (lane A)                                              |
| 0:05 | Pick a tier, model and quant; install LlamaStash; first run                                                |
| 0:25 | Tuning: presets, MTP, sampling, context size. Watch the pagoda lane in the request log (tok/s, cache hits) |
| 0:45 | Parallel lanes: named launches and aliases. Connect Pi and Claude Code through one proxy                   |
| 1:05 | Auto mode: rules, classifier, LLM. Show what it decided during the pagoda run                              |
| 1:25 | Personal agent: `auth0-tv` reads Gmail and Slack through Token Vault                                       |
| 1:40 | Reveal the pagoda: tool calls, time, tokens, electricity cost                                              |
| 1:55 | Q&A                                                                                                        |

## Auth0 features (status as given, Nov 2026)

- GA: On-Behalf-Of Token Exchange, Custom Token Exchange, Actions Modules.
- EA: Agent as Principal, Token Vault Privileged Workers and downscoping, XAA, Dynamic CIMD + Application Profiles, FGA Permissions Index, Identity Conversion Suite.
- Private beta: Agent Gateway. Experimental: OpenFGA Dynamic Conditions.
- Token Vault CLI: https://github.com/deepu105/auth0-token-vault-cli (`auth0-tv`; Gmail, Calendar, Slack, GitHub).
- Recheck EA status before final wording; it may change by February.

## Open points

- [x] All three submitted 2026-11-04.
- [ ] Check the form's Track and Session Format dropdown values; the ones above are the CFP topic names.
- [ ] Check the form's character limits for description and pitch.
- [x] Workshop: keep the low tier (decided 2026-11-03). Qwen 3.8 Flash Next Coder IQ1_M still untested.
- [ ] Workshop: run the pagoda prompt on Claude, GPT and Kimi for the frontier comparison.
- [ ] Workshop: Qwen 3.8 Flash Next pagoda run started 2026-11-03; record time and result.
- [ ] Workshop: do at least one coding run on a mid-tier machine before February.
- [ ] Workshop: time the realistic pagoda prompt with demos running alongside.
- [ ] Re-run the Opus vs Qwen 3.8 Flash Next numbers if Qwen 4 or a newer Flash Next ships before February.
- [ ] Talk 2: add more replayed sessions (now 4 sessions, 258 calls).
- [x] Final pass on all text.

## Sources

- `src/content/posts/2026-10-20-qwen3.8-flash-next-vs-claude-opus-showdown.mdx` (Opus vs Qwen 3.8 Flash Next numbers)
- `src/content/posts/2026-09-04-local-ai-qwen3.8-pi-llamastash.mdx` (presets, named launches, MTP, sampling, quant sizes)
- `src/content/posts/2026-10-06-local-ai-qwen3.8-flash-next-best-local-llm.mdx`
- `src/data/talks-past.mdx` (past talks, 89 entries)
- pi-automode-classifier README (stage timings, bench and session results)
- Strata `docs/MODELS.md` (memory per quant), LlamaStash README (engine recipes)
- Auth0 May 2026 announcement: https://www.okta.com/newsroom/articles/auth0-may-2026-product-innovations/
- Title rules: https://dx.tips/titles
- `src/pages/cv.astro` summary (speaker bio)
