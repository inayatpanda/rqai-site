# rqai.co.uk v3 — Product-led site + visibility (design spec)

Date: 2026-07-09. Owner-approved direction from the findings review of seven codebase research briefs (session scratchpad `brief-*.md`; key facts mirrored below so this spec stands alone).

## 1. Goals

1. Grounded, product-led copy: every claim traceable to code verified by the research briefs. No studio self-framing, no hype.
2. Each of the seven projects presented as an individual, distinct product — no category groupings.
3. Flagship emphasis: ResearchAssistant, ClinicalPROMs, Chapbook get the most prominent placement and richest pages.
4. Visibility: technical SEO + AI/answer-engine discoverability for a product studio (no local-business SEO).

## 2. Positioning & voice

- REMOVE all "small independent UK studio / small on purpose / one small studio" copy (Home hero `src/pages/Home.tsx`, About headline + studio card `src/pages/About.tsx`, footer `src/components/Shell.tsx`). Never describe RQAI as online-only.
- About page becomes a short, factual page about the projects' shared design principles (local-first, no accounts where true, no tracking, you own your data), not a studio manifesto.
- Privacy substance stays but is attached to each PRODUCT where true of that product. Note: ClinicalPROMs *does* have accounts (self-hosted, surgeon-controlled) — never blanket-claim "no accounts" site-wide.
- Voice rules unchanged: "projects" never "apps"; factual; no em-dashes in visible text.

## 3. Home structure

- Hero: what visitors will find — focused, thoughtfully made software for clinicians, researchers, and writers. No studio description.
- Flagship trio (large cards, richer copy): ResearchAssistant, ClinicalPROMs, Chapbook — each leading with its own one-line differentiator.
- Four standard cards: OrthoPortfolio, ConsultantPrep, AudioQuill, Scribble — smaller but equally individual.
- No category sections or labels. Nav stays Projects / About.
- `src/data/products.ts` remains single source of truth; add `flagship: boolean` (and ordering) — no `category` field.

## 4. Page model (hub and spoke)

- **ClinicalPROMs** and **ResearchAssistant** pages = sharp summaries: differentiation-led intro, 3–4 most distinctive capabilities, upgraded demo, prominent link to clinicalproms.rqai.co.uk / researchassistant.rqai.co.uk. No deep duplication of spoke content.
- **Chapbook** has no spoke: its page carries the full sales load.
- Remaining four: tightened versions of the same shape.

## 5. Per-product copy directions (from the research briefs)

### ResearchAssistant (flagship)
- Identity (source-audited): local-first clinical-research workbench — "Evidence, from search to submission." Current products.ts copy is WRONG (describes the separate Literature Decoded project) — full rewrite. Drop "still in development."
- Hub page = summary + link to the (fully built, client-rendered) spoke site. Lead features, all code-verified: 52 statistical tests validated value-for-value against R (0 failures, committed proof); grounded systematic-review pipeline (30,956-descriptor offline MeSH index, live PubMed counts, PRESS lint, dual screening with live Cohen's κ); synthesis beyond basics (IPD, network MA, survival MA, GRADE); Strict AI with sentence-level citation grounding + integrity flags; local-first (SQLite on your Mac, fully-offline Ollama AI, Tailscale device sync/collaboration). Platforms Mac/Win/Linux. $60/yr, 5 devices, 30-day trial (LemonSqueezy; product creation pending = go-live task).
- Reuse spoke assets instead of building new demos: port `WorkflowReel.tsx` (self-contained, framer-motion-light, ~1h port) as the page demo; embed/link 1–2 of the 34 self-contained walkthrough HTMLs (best: meta-analysis-walkthrough, systematic-review-from-scratch). Ignore apps/reels + apps/extension in copy.
- Claim guards: NEVER say "open source" (LICENSE is a proprietary EULA — spoke site's claim is wrong and needs separate fixing); say "simulated Reviewer 2 pass" not "review panel"; don't claim automated end-to-end PRISMA reproduction.
- Known sales gaps (separate follow-up tasks, not site copy): no `research` entry in fulfil-sales PRODUCT_URLS; LemonSqueezy product not created; spoke "open source" copy correction.

### ClinicalPROMs (flagship)
- Name RULING: company site keeps **ClinicalPROMs**, with one "also known as Ortho Outcomes" note (the desktop app + spoke brand).
- Lead: 20 validated PROM instruments scored exactly as published (each unit-tested), MCID thresholds/concern bands, photo-of-theatre-list OCR capture, E2E-encrypted patient questionnaires (key never touches a server), self-hosted with embedded database — one licence, no per-seat fees.
- Price RULING: intended **annual**; exact figure TBC — keep amount off the page. (£49-lifetime Stripe/Terms stale; £200/yr was mock.)
- Fix "mobile coming soon" implication — PWA capture shipped; patient forms run on any phone browser.
- Don't market Linux (broken) or imply Windows code-signing (unsigned; SmartScreen warning).

### Chapbook (flagship)
- Lead framing (owner + verified): write your blog from your phone in a chat-style composer; add photos, embed videos, drop in interactive widgets; publishes straight to your own Git-hosted blog — you own the content, domain, and site.
- Enrich with verified specifics: 75 interactive playground templates, 6 reading-surface themes (Observatory, Parchment, Manuscript, Newsprint, Slate, Focus), on-device photo Darkroom, atomic multi-file Git commits, no Chapbook server, BYOK (GitHub token + AI key, per-browser).
- CORRECT: "fixed, considered voice" → voice is profile-driven and learned from the user's own recent posts. Current copy under-sells (it is a full blog CMS, not a share-sheet gadget).

### OrthoPortfolio
- Lead: knows the GMC T&O Portfolio Pathway curriculum; redacts patient data (true-rasterise + NHS-number checksum PII detection + verify step), auto-files evidence against SSG requirements, compiles indexed submission-ready PDF bundles, readiness dashboard/gaps/checklist. £49/yr verified.
- CORRECT: remove/soften "generates the verification proformas" — not built.

### ConsultantPrep
- Lead: 237-question bank (15 categories) with model answers + delivery advice, date-seeded Daily 5 spaced practice, timed 3:00/question mock with review, Trust Prep matching 20 real trusts' CQC/GIRFT/NHFD signals to 13 stations. £49 one-off verified. Freemium boundary already wired (25 free questions, 3 free topics) — page may mention "try before you buy" once live checkout ships.

### AudioQuill
- Lead: private voice-to-writing studio; on-device Whisper transcription (free, no key, nothing leaves the device); non-destructive AI modes over a preserved raw transcript; 44 templates, 49 voice commands, topics + AI compile into finished documents. £30/yr verified.

### Scribble
- Lead: typed block-editor notebook (NOT handwriting) that lives only on your device — no server, no account, no telemetry; 211 stickers, figures, sandboxed interactive playgrounds; optional BYOK AI (7+ providers), publish + sync via your own GitHub repo with explicit conflict choices; on-device video reels.
- Price: app gates at £29/yr (code-verified) — owner to confirm before showing on page.

## 6. Demo upgrades (one per page; concepts from briefs)

- ResearchAssistant: scattered notes/data condensing into a drafted manuscript paragraph with a citation marker (replaces wrong search→summary motif).
- ClinicalPROMs: outcome trajectory line rising pre-op → 12 months, crossing a dashed MCID reference line (replaces static gauge).
- Chapbook: phone frame, two chat bubbles typed + sent, resolving into a rendered post card with a live-URL beat.
- OrthoPortfolio: messy document tiles animating into labelled GMC section slots / indexed bundle.
- ConsultantPrep: mock-interview card — question prompt above a 3:00 countdown shifting to urgency colour.
- AudioQuill: messy spoken line transforming into cleaned, structured text.
- Scribble: typed blocks assembling (heading + text + sticker tile) with a stays-on-device cue (replaces misleading handwriting squiggle).
- All keep aria-hidden + reduced-motion fallbacks per existing pattern.

## 7. Visibility engineering

- Unique title + meta description per page targeting brief-derived search phrases (recorded per product in `brief-*.md` §7/§8).
- JSON-LD: `SoftwareApplication` per product page (name, OS, price where confirmed, offers) + `Organization` on home.
- Fix deferred ledger items: canonical/og:url trailing slash, missing og:image (add compressed OG images), soft-404s.
- `llms.txt` at root summarising RQAI + the seven projects with links (AI answer-engine discoverability); prerendered pages already give crawlable text.
- Sitemap verified + submitted to Google Search Console (needs owner's Google account, one-time).
- 404 audit; image compression pass.
- Skipped deliberately (online-only decision, internal): Business Profile, map, NAP footer, local citations.

## 8. Measurement

- Baseline before/after: Lighthouse + SEO checks on all 9 pages.
- Privacy-respecting analytics — owner to pick provider (self-hosted or lightweight; not GA4 by default given no-tracking ethos).
- Monthly 15-minute ritual: Search Console queries/indexing, link check (script exists: `scripts/check-links.mjs`).

## 9. Out of scope (named follow-ons)

- Content marketing layer (cornerstone articles, comparison pages) — after v3 ships.
- Spoke-site fixes: ClinicalPROMs pricing-page contradiction; ResearchAssistant spoke landing build-out; fulfil-sales activation URL for `research`. Tracked as separate tasks outside this site rebuild.
- Live Stripe swaps (go-live task across all products).

## 10. Open inputs (owner)

1. RA source repo access (old Mac) → enriched RA feature copy (page ships grounded either way).
2. Prices: ClinicalPROMs annual figure, Chapbook, Scribble (£29/yr code-verified — confirm), ResearchAssistant.
3. Google Search Console verification at submission time.
