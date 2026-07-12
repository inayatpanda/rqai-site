# Outcome-led Project Copy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace verbose implementation-led prose with a distinctive promise, titled feature moments, proof points and a compact control note for all seven RQAI projects.

**Architecture:** Extend the existing `Product` data model so content hierarchy lives in the single product-data source. Render the new fields in the shared `AppPage` template, preserving routes, URLs, pricing and structured data. Keep detailed factual descriptions for metadata while using shorter outcome-led copy on screen.

**Tech Stack:** React, TypeScript, React Router, Tailwind CSS, Node test runner, Vite SSG.

## Global Constraints

- Use British English and verified, product-specific claims.
- Clinical products use frustration-led openings; creative products use possibility-led openings.
- ResearchAssistant must prominently cover systematic review, validated statistics, health economics, evidence control and submission.
- Visible promises are 35–60 words; feature moments use a title plus one concise sentence.
- Preserve all routes, product URLs, prices, checkout hand-offs and structured-data fields.
- Do not push.

---

### Task 1: Add the outcome-led content model and page hierarchy

**Files:**
- Modify: `scripts/parallax-field.test.mjs`
- Modify: `src/data/products.ts`
- Modify: `src/pages/AppPage.tsx`
- Modify: `src/index.css`

**Interfaces:**
- `FeatureMoment = { title: string; body: string }`
- `ProofPoint = { value: string; label: string }`
- `Product` adds `recognition`, `promise`, `featureMoments`, `proof`, and `controlNote`.
- Existing `description` remains the detailed metadata description.

- [ ] **Step 1: Write failing content-structure tests**

Assert that `products.ts` defines `FeatureMoment`, `ProofPoint`, `recognition`, `promise`, `featureMoments`, `proof`, and `controlNote`; assert that `AppPage.tsx` renders the new fields and titled feature headings.

- [ ] **Step 2: Run the tests and verify RED**

Run: `npm test`

Expected: FAIL because the new content fields and presentation do not exist.

- [ ] **Step 3: Extend the product model**

Add:

```ts
export type FeatureMoment = { title: string; body: string }
export type ProofPoint = { value: string; label: string }
```

Add the five required fields to `Product`. Keep the existing `features` field temporarily until every entry is migrated in Task 2.

- [ ] **Step 4: Replace the visible pitch and feature rendering**

Render `recognition` as an eyebrow above `promise`. Replace the visible `description` paragraph with `promise`. Render each feature moment with an `h3` title and concise body. Add a proof strip beneath the moments and place `controlNote` inside the Where-to-find panel.

- [ ] **Step 5: Run tests**

Run: `npm test`

Expected: the new structure test passes after temporary fixture content is added to every product entry.

---

### Task 2: Verify and rewrite all seven product stories

**Files:**
- Modify: `src/data/products.ts`
- Inspect: product source folders under `/Users/inayatsmac/Desktop/Transferred to new mac/`

**Interfaces:**
- Produces complete `recognition`, `promise`, `featureMoments`, `proof`, and `controlNote` values for every `Product`.

- [ ] **Step 1: Verify promoted capabilities**

Use README files, shipped build logs and current source to verify each claim. Specifically verify Chapbook themes, flipbook/animation, interactive content and Goblin mode before using those terms. Record no unverified capability in hub copy.

- [ ] **Step 2: Write ResearchAssistant’s story**

Use the recognition line `Tired of confident claims your evidence cannot support?` and the headline direction `Research without surrendering control to AI.` Feature moments must cover systematic review, validated statistics, health economics, evidence-grounded drafting/optional AI, and Reviewer 2/submission. Proof points must surface verified numbers or named outputs rather than generic adjectives.

- [ ] **Step 3: Write the remaining six stories**

Use these fixed narrative angles:

- ClinicalPROMs: meaningful recovery trajectories and validated outcomes without a vendor cloud.
- Chapbook: an owned blog that is as natural to publish as messaging and expressive enough to change its entire reading experience.
- OrthoPortfolio: an intimidating evidence pile becoming structured, safely redacted and submission-ready.
- OrthoConsultantPrep: preparation for a particular Trust and panel rather than a generic interview bank.
- AudioQuill: thoughts captured at speaking speed, with the raw words always retained.
- Scribble: notes that become visual, interactive, synchronised and publishable work.

Each story gets four or five feature moments, two or three proof points, and one compact control note.

- [ ] **Step 4: Remove the legacy visible feature field**

Delete `features` from the `Product` type and all entries once `featureMoments` is complete. Keep detailed `description` solely for metadata and JSON-LD.

- [ ] **Step 5: Verify copy constraints**

Add tests that every product has 3–5 feature moments, 2–3 proof points, and a visible promise no longer than 60 words. Assert ResearchAssistant copy contains `systematic review`, `statistics`, `economic`, and `Reviewer 2`.

---

### Task 3: Tighten Home and About copy, then verify the full site

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/pages/About.tsx`
- Modify: `scripts/parallax-field.test.mjs`

**Interfaces:**
- Preserves the existing Home hero heading and About commitments while reducing repeated explanations.

- [ ] **Step 1: Write a failing copy-length regression test**

Assert the Home introduction contains no more than 35 visible words after its heading and each About commitment body contains no more than 45 words.

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test`

Expected: FAIL against the current verbose Home and About prose.

- [ ] **Step 3: Tighten Home and About**

Keep `Streamline the work. Keep the hours.` Rewrite the Home supporting paragraph around the seven outcomes in no more than 35 words. Compress each About commitment to one clear idea and remove repeated local-first, no-tracking and verified-feature explanations from adjacent sections.

- [ ] **Step 4: Run full verification**

Run: `npm test && npm run typecheck && npm run build && git diff --check`

Expected: all tests pass, TypeScript succeeds, ten routes render, and the diff check produces no output.

- [ ] **Step 5: Commit locally**

```bash
git add scripts/parallax-field.test.mjs src/data/products.ts src/pages/AppPage.tsx src/pages/Home.tsx src/pages/About.tsx src/index.css
git commit -m "feat: tell each RQAI project through outcomes and proof"
```

Do not push.

