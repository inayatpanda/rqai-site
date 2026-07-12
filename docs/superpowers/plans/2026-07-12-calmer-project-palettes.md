# Calmer Project Palettes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Calm all seven project palettes and move AudioQuill to violet/aubergine without changing content or links.

**Architecture:** Update the shared identity tokens in `productIdentities.ts`, then soften the common card border/highlight/shadow treatments in CSS. Because home cards, project pages and cross-links consume the same tokens, one palette change remains consistent everywhere.

**Tech Stack:** TypeScript, CSS custom properties, Tailwind CSS, Node test runner, Vite SSG.

## Global Constraints

- Preserve each project’s hue family except AudioQuill.
- AudioQuill uses violet/aubergine with lavender accents and no coral origin.
- Reduce saturation/brightness and coloured glow moderately.
- Preserve readable contrast, routes, prices, URLs, checkout hand-offs, motion and outcome-led write-ups.
- Do not push.

---

### Task 1: Calibrate the shared palettes and card effects

**Files:**
- Modify: `scripts/parallax-field.test.mjs`
- Modify: `src/data/productIdentities.ts`
- Modify: `src/index.css`

**Interfaces:**
- Consumes and preserves `PRODUCT_IDENTITIES: Record<Slug, ProductIdentity>`.
- Produces the same CSS custom properties with calmer token values.

- [ ] **Step 1: Write the failing palette regression test**

Assert AudioQuill contains `#6D4BC3` and `#382460`, contains lavender `#CBBEFF`, and no longer contains `#E95F78`. Assert CSS uses reduced card border mixing at 44% and hover highlight mixing at 30%.

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test`

Expected: FAIL against the current coral AudioQuill palette and stronger effects.

- [ ] **Step 3: Update all seven identities**

Use these gradient origins and destinations:

- ResearchAssistant `#315FB5 → #1C3568`
- ClinicalPROMs `#237C87 → #176F62`
- Chapbook `#2A9C98 → #155964`
- OrthoPortfolio `#5147A6 → #302A64`
- ConsultantPrep `#BE8233 → #80501F`
- AudioQuill `#6D4BC3 → #382460`
- Scribble `#2A9A95 → #42669A`

Calibrate matching muted, highlight and border tokens for readable contrast; AudioQuill uses lavender `#CBBEFF` as its highlight.

- [ ] **Step 4: Soften shared effects**

Reduce static card border mixing from 56% to 44%, hover highlight ring mixing from 45% to 30%, and decrease coloured shadow opacity/extent for home and cross-link cards. Reduce the ConsultantPrep extra yellow origin to a calmer ochre.

- [ ] **Step 5: Verify and commit locally**

Run: `npm test && npm run typecheck && npm run build && git diff --check`

Then:

```bash
git add scripts/parallax-field.test.mjs src/data/productIdentities.ts src/index.css
git commit -m "style: calm project palettes and shift AudioQuill to purple"
```

Do not push.

