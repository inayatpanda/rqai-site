# RQAI Multi-Page Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade rqai.co.uk from a one-page dark landing to a dark-blue, multi-page marketing site — home, seven project pages, About — whose core job is working links to every project.

**Architecture:** Keep the existing Vite 5 + React 18 + TypeScript + Tailwind 3 + Framer Motion repo; add routing with build-time static prerendering (every route ships as a real .html), swap the design system to the dark-blue research-constellation language, and drive all product content from an extended `src/data/products.ts` plus a ship-time link checker.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind 3, Framer Motion 11, @fontsource self-hosted fonts, GitHub Actions → Hostinger FTP (existing `.github/workflows/deploy.yml`).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-08-rqai-multipage-site-design.md` — read it before your task; it governs on any conflict.
- Repo: `/Users/inayatsmac/Desktop/Transferred to new mac/Inayat-website/rqai-site` (quote paths — spaces). Commit on main; do NOT `git push` (pushing publishes the live site — owner-gated at the end).
- DARK BLUE THEME (owner decision v2 2026-07-08, supersedes the light theme): deep navy/indigo canvas that reads unmistakably BLUE (not the old near-black), dark-blue cards, crisp hairlines, restrained luminous accents (electric cyan + one warm counterpoint) — taste-skill call within this direction. Editorial display serif headlines (e.g. Fraunces) over a clean sans body. WCAG AA on dark. House motif = animated knowledge-graph CONSTELLATION (research & innovation: points of light joined by fine citation-like edges drawing in progressively); hand-built SVG/canvas, NOT a graph/charting library; reduced-motion = completed static constellation.
- UI implementers MUST invoke the `taste-skill` and `frontend-design:frontend-design` skills BEFORE writing UI code, and WebFetch the reference: https://www.vengenceui.com/components/perspective-grid
- Copy rules (hard): factual, never exaggerated; NO orthopaedics framing; NO founder/surgeon persona or bio anywhere; product names stay exactly as-is; British spelling; confident/plain/no-hype tone. RQAI is a wordmark — never expanded.
- No new paid dependencies; fonts self-hosted via @fontsource; the constellation motif is hand-built SVG/canvas, NOT a graph/charting library. Every animation has a `prefers-reduced-motion` fallback.
- Each task ends with: `npm run build` green AND prerendered HTML verified present for every route in `dist/` (e.g. `test -f dist/orthoportfolio/index.html`), then a conventional commit.
- The seven project slugs (exact): `orthoportfolio`, `consultantprep`, `clinicalproms`, `chapbook`, `audioquill`, `scribble`, `researchassistant`.
- Copy rule (hard): they are "projects", never "apps", everywhere in UI and copy.
- Final app URLs (exact, used in data regardless of current reachability): https://topp.rqai.co.uk, https://consultantprep.rqai.co.uk, https://clinicalproms.rqai.co.uk, https://chapbook.rqai.co.uk, https://audioquill.rqai.co.uk, https://scribble.rqai.co.uk, https://researchassistant.rqai.co.uk.

---

### Task 1: Design system, shell, routing + prerender

**Files:**
- Modify: `tailwind.config.js` (token set), `index.html` (meta/theme-colour, favicon rework), `src/main.tsx`, `src/App.tsx` (becomes route table + shell), `package.json` (routing/prerender + @fontsource/fraunces)
- Create: `src/components/Shell.tsx` (sticky header: RQAI wordmark → `/`, Projects menu with the seven pages, About; footer: project links, hello@rqai.co.uk, © RQAI; mobile disclosure menu; active-tab state), `src/components/Constellation.tsx` (the house motif: knowledge-graph constellation drawing in; reduced-motion = static completed graph), `src/pages/NotFound.tsx`, stubs `src/pages/{Home,About,AppPage}.tsx` (minimal placeholders for later tasks to replace)
- Test: none (repo has no test runner — the gate is typecheck + build + prerender presence; do NOT add a test framework)

**Interfaces:**
- Produces: route table `/`, `/about`, `/:slug` for the seven slugs, `/404`; `<Shell>` wrapping every page; `<Constellation tone?: 'accent'|'ink'; className?: string>`; Tailwind tokens named `canvas`, `card`, `inkStrong`, `ink`, `inkMuted`, `hairline`, `accent`, `accentWarm` (values = your taste-skill call within spec direction).
- Consumes: existing components/demos untouched.

- [ ] Load taste-skill + frontend-design; fetch the perspective-grid reference URL.
- [ ] Choose and wire prerendering: prefer `vite-react-ssg` (zero-config for react-router style routes); acceptable fallback: react-router-dom + a post-build prerender script that renders each route to `dist/<route>/index.html`. Also update `public/.htaccess`: keep no-cache on index.html and add SPA fallback rewrites so deep links work either way.
- [ ] Implement the token set + fonts (Fraunces display via @fontsource, keep Inter for body or swap to IBM Plex Sans — your call, self-hosted).
- [ ] Build `Shell` + `Constellation` + `NotFound` + page stubs; convert App to the route table.
- [ ] Verify: `npm run build` green; `for r in "" about orthoportfolio consultantprep clinicalproms chapbook audioquill scribble researchassistant; do test -f "dist/$r/index.html" || echo "MISSING $r"; done` prints nothing (root = dist/index.html); commit.

### Task 2: Product data model + link checker

**Files:**
- Modify: `src/data/products.ts`
- Create: `scripts/check-links.mjs`, `src/data/liveness.json` (generated), `docs/DNS-FIXES.md`
- Modify: `.github/workflows/deploy.yml` (run the link checker before build), `package.json` (`"check-links": "node scripts/check-links.mjs"`, and `prebuild` runs it when CI env var set — keep local builds offline-safe by committing a current liveness.json)

**Interfaces:**
- Produces (exact, later tasks rely on it):
  ```ts
  export type Product = {
    name: string; slug: Slug; url: string;        // final URL from Global Constraints
    tagline: string;                               // ≤ 8 words, factual
    description: string;                           // one paragraph, factual
    features: string[];                            // 3–5 bullets, each verifiable
    price?: string;                                // only if verified (see below)
    Demo: React.ComponentType;                     // existing micro-demos
  }
  export const PRODUCTS: Product[]                 // exactly the seven, in this order:
  // orthoportfolio, consultantprep, clinicalproms, chapbook, audioquill, scribble, researchassistant
  export function isLive(slug: Slug): boolean      // reads liveness.json
  ```
  `liveness.json` contract: `{ "<slug>": { "url": string, "ok": boolean, "checkedAt": string } }`.
- Price facts (verify each in the named source before including; omit if unverifiable): OrthoPortfolio £49/yr and OrthoConsultantPrep £49 one-off and ClinicalPROMs £49 lifetime — sources: the products' repos and `Inayat-website/helm/scripts/fulfil-sales.mjs` PRODUCT_TERMS + `ortho-outcomes/marketing-site/` pricing page. Chapbook/AudioQuill/Scribble: omit price unless found stated in their repos.
- Copy sourcing for description/features: each product's own README/marketing copy — `topp/`, `consultantprep/docs/SPEC-v2.md` + its mirror site, `ortho-outcomes/marketing-site/`, `Inayat-website/helm/studio-app/`, `Inayat-website/audioquill-publish/`, `scribble/DESIGN.md`. Never invent capability claims.
- `check-links.mjs`: HEAD-or-GET each product URL with a timeout, write liveness.json, exit 0 always (a dead link downgrades UI, never fails the build), print a table. Run it once now and commit the real result (expected today: topp/consultantprep/scribble `ok: false` — see spec Link-integrity section).
- `docs/DNS-FIXES.md`: owner action list with exact records — fix `topp` and `consultantprep` (re-point/re-create in Hostinger hPanel; currently A → 91.108.107.144, dead) and add `scribble` CNAME → `scribble-pwa.netlify.app`; note researchassistant.rqai.co.uk has no DNS or product yet (page ships coming-soon); note re-running the deploy after DNS flips everything Live with no code change.

- [ ] Extend products.ts to the exact type above; keep ResearchAssistant (reuse ResearchAssistantDemo; describe honestly as in development, no invented capability claims); add Chapbook (needs a simple Demo — build a small static-ish preview component consistent with existing demos).
- [ ] Write check-links.mjs + wire CI + generate today's liveness.json; write DNS-FIXES.md.
- [ ] Verify build + prerender presence; commit.

### Task 3: Home page

**Files:**
- Create: `src/components/PerspectiveShowcase.tsx`
- Replace stub: `src/pages/Home.tsx`
- Modify: `src/components/Hero.tsx` (light rework) or fold into Home

**Interfaces:**
- Consumes: `PRODUCTS`, `isLive`, `<Constellation>`, tokens from Task 1.
- Produces: nothing later tasks depend on.

- [ ] Load taste-skill + frontend-design; fetch the perspective-grid reference.
- [ ] Hero: RQAI wordmark, truthful tagline (base: "Focused software for clinical work." + one supporting line, no hype), Constellation as the signature moment on the dark-blue canvas.
- [ ] PerspectiveShowcase: the seven project cards in a perspective-grid treatment styled for the dark-blue canvas; each card = name, tagline, micro-demo, Live pill (only when `isLive(slug)`) → links to `/<slug>` (the internal project page, NOT the external URL — the project page carries the external CTA).
- [ ] Studio strip: two neutral sentences + link to /about.
- [ ] Verify build + prerender presence; visual sanity via `npx vite preview` + your own browser tooling if available; commit.

### Task 4: The seven project pages

**Files:**
- Replace stub: `src/pages/AppPage.tsx` (one data-driven template)
- Create if needed: `src/components/AppCta.tsx` (Live → "Open <name>" external link; not live → "Coming to <url> soon" non-link state, on-brand)

**Interfaces:**
- Consumes: `PRODUCTS`, `isLive`, `<Constellation>`, existing `src/components/demos/*`.
- Produces: nothing later tasks depend on.

- [ ] Load taste-skill + frontend-design first.
- [ ] Template per spec: factual pitch paragraph, 3–5 feature bullets, the micro-demo enlarged as the visual centrepiece, price line when `price` present, AppCta. Editorial layout — each page must feel considered, not templated: vary rhythm via the demo placement/tone within one coherent system.
- [ ] Per-page `<title>` + meta description + OG tags (prerendered into each HTML file — verify in dist output, not just at runtime).
- [ ] Verify build + prerender presence + meta present in `dist/<slug>/index.html`; commit.

### Task 5: About page, copy sweep, SEO finish

**Files:**
- Replace stub: `src/pages/About.tsx`
- Create: `public/sitemap.xml`, `public/robots.txt`
- Modify: any file failing the copy sweep

**Interfaces:** consumes Task 1–2 outputs only.

- [ ] Load taste-skill + frontend-design first.
- [ ] About per spec: principles over persona — one job well · local-first, data stays on device · no accounts, no tracking · one small independent UK studio · buy once or subscribe simply — told with conviction and visual rhythm (Constellation punctuation), ending with hello@rqai.co.uk. NO founder bio, NO specialty references.
- [ ] Copy sweep across the whole site: grep for `surgeon|orthopaedic|orthopedic|Trauma` outside product names — must return only product-name hits; British spelling pass; remove any remaining "built by a clinician"-style persona copy; footer/meta descriptions consistent.
- [ ] sitemap.xml (all 9 routes) + robots.txt.
- [ ] Verify build + prerender presence; commit.

### Task 6: Scribble Netlify alias + ship QA

**Files:**
- Create: `docs/superpowers/plans/` ledger notes only (no site code expected)
- Modify: `docs/DNS-FIXES.md` if findings change

**Interfaces:** none.

- [ ] Attempt to add `scribble.rqai.co.uk` as a domain alias on the Netlify site serving `scribble-pwa.netlify.app` (Netlify CLI if authenticated: `npx netlify api` sites listing to find the site id, then updateSite domain_aliases; or the Netlify MCP updater tools). If unauthenticated/blocked: document the exact one-click owner step in DNS-FIXES.md instead. Never guess credentials.
- [ ] Re-run `node scripts/check-links.mjs`; commit refreshed liveness.json if changed.
- [ ] Full verification: `npm run build`; all 8 prerendered files present; run the copy-sweep greps once more; report ready-for-review.

---

Post-plan: final whole-branch review (superpowers:requesting-code-review pattern), controller browser QA on the production build (all 9 routes, mobile width, reduced-motion, console clean), then the owner gate before `git push` (push = live deploy).
