# RQAI project identities and smooth orbit implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reuse the seven approved product identities throughout internal RQAI project pages and widen/smooth the home 3D orbit.

**Architecture:** Move palette data into `productIdentities.ts` so home cards and project pages share one source. `AppPage` exposes the active identity through CSS variables to its hero, CTA, feature markers, hero frame and destination cross-links. `ProductOrbit` derives every transform from one spring-smoothed progress value and uses wider destinations.

**Tech Stack:** React 18, TypeScript, Vite React SSG, Tailwind CSS 3, Framer Motion 11, inline SVG.

## Global Constraints

- Change only `rqai.co.uk`; do not modify external product sites.
- Keep the dark RQAI reading canvas and all factual copy, routes, prices and SEO metadata.
- Colour only heroes, CTAs, prices, feature markers, hero frames and cross-link cards.
- Do not add dependencies or override native scrolling.
- Preserve keyboard focus, WCAG AA contrast and completed reduced-motion states.
- Preserve the existing uncommitted `tsconfig.tsbuildinfo` change.
- Do not push.

---

### Task 1: Extract the shared product identity source

**Files:**
- Create: `src/data/productIdentities.ts`
- Modify: `src/components/PerspectiveShowcase.tsx`
- Modify: `scripts/parallax-field.test.mjs`

**Interfaces:**
- Produces `ProductIdentity`, `PRODUCT_IDENTITIES: Record<Slug, ProductIdentity>` and `identityStyle(slug: Slug): CSSProperties`.
- `PerspectiveShowcase` consumes `PRODUCT_IDENTITIES` instead of its local map.

- [ ] Write a failing source-contract test requiring all seven slugs in `productIdentities.ts` and imports from both `PerspectiveShowcase.tsx` and `AppPage.tsx`.
- [ ] Run `npm test`; expect failure because the shared file does not exist.
- [ ] Create the identity module with the approved `from`, `to`, `ink`, `muted`, `highlight`, `border` and optional `warm` values.
- [ ] Replace `CARD_THEMES` in `PerspectiveShowcase` with `PRODUCT_IDENTITIES[slug]` and `identityStyle(slug)`.
- [ ] Run `npm test` and `npm run typecheck`; the identity-file assertions pass while the `AppPage` import assertion remains red.
- [ ] Commit locally with `git commit -m "refactor: share RQAI product identities"`.

### Task 2: Theme internal project pages

**Files:**
- Modify: `src/pages/AppPage.tsx`
- Modify: `src/components/AppCta.tsx`
- Modify: `src/components/heroes/HeroFrame.tsx`
- Modify: `src/index.css`
- Modify: `scripts/parallax-field.test.mjs`

**Interfaces:**
- `AppPage` applies `identityStyle(product.slug)` to `.project-page` and passes `identity` into `AppCta`.
- `AppCta({ product, identity? })` uses product variables when supplied and retains its current fallback.
- `HeroFrame` reads inherited `--product-*` variables without requiring seven call-site changes.

- [ ] Add failing tests requiring `.project-hero`, `ProductGlyph` cross-links and product identity variables in `AppPage.tsx`.
- [ ] Run `npm test`; expect the new AppPage assertions to fail.
- [ ] Wrap the project page in a `.project-page` variable scope and turn the existing hero section into `.project-hero` with coloured atmosphere and contrast-safe text.
- [ ] Update `AppCta` to use the active gradient, ink, border and focus tokens.
- [ ] Update feature markers and price text to use `--product-highlight`.
- [ ] Render each destination cross-link as a full-colour card using `identityStyle(other.slug)` and `ProductGlyph`.
- [ ] Update `HeroFrame` chrome, border and glow to inherit active product variables.
- [ ] Add CSS for bounded hero colour, neutral reading sections and responsive/reduced-motion treatment.
- [ ] Run `npm test`, `npm run typecheck` and `npm run build`; expect all checks to pass.
- [ ] Commit locally with `git commit -m "feat: carry product identities through RQAI project pages"`.

### Task 3: Widen and smooth the home orbit

**Files:**
- Modify: `src/components/ProductOrbit.tsx`
- Modify: `src/index.css`
- Modify: `scripts/parallax-field.test.mjs`

**Interfaces:**
- `ProductOrbit` creates `smoothProgress = useSpring(scrollYProgress, { stiffness: 72, damping: 24, mass: 0.65 })`.
- Every `useTransform` consumes `smoothProgress`.

- [ ] Add a failing test requiring `useSpring`, `smoothProgress`, and wider desktop destinations including at least `-42vw` and `42vw`.
- [ ] Run `npm test`; expect the new motion assertions to fail.
- [ ] Import `useSpring`, create the shared smoothed progress value and replace all raw progress transform inputs.
- [ ] Expand fragment destinations across roughly 90% of the viewport, increase the core to 19rem and widen the grid to at least 160vw.
- [ ] Lengthen the overlapping formation, expansion, separation and settlement transform ranges.
- [ ] Keep the reduced-motion branch in its complete settled state and retain the tighter mobile destinations.
- [ ] Run `npm test`, `npm run typecheck`, `npm run build` and `git diff --check`.
- [ ] Capture home orbit and all seven project heroes at desktop; capture representative mobile and reduced-motion views.
- [ ] Commit locally with `git commit -m "feat: widen and smooth the RQAI product orbit"`.

Do not run `git push`.
