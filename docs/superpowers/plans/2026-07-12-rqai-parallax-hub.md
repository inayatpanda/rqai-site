# RQAI parallax hub implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a performant, centre-outward scroll-depth system and app-informed scenes to the RQAI hub without changing the spoke sites or publishing.

**Architecture:** A new decorative `ParallaxField` owns scroll-linked layers for the home hero and showcase. Existing cards and hero frames retain responsibility for navigation and app-specific interface scenes; only their presentation layers gain depth. Framer Motion supplies progressive enhancement while static markup and CSS remain the no-JS/reduced-motion baseline.

**Tech Stack:** React 18, TypeScript, Vite React SSG, Tailwind CSS 3, Framer Motion 11.

## Global Constraints

- Keep the existing dark RQAI canvas and existing copy, product URLs, pricing, SEO metadata, and external CTAs.
- Do not change or publish individual product/spoke sites.
- Do not add dependencies, smooth-scroll libraries, WebGL, or video assets.
- Animate only transform and opacity; all decorative layers are `aria-hidden` and cannot intercept pointer events.
- Respect `prefers-reduced-motion: reduce` with static, complete scenes.
- Preserve the pre-existing `tsconfig.tsbuildinfo` modification and do not push any commit.

---

### Task 1: Build the reusable home parallax field

**Files:**
- Create: `src/components/ParallaxField.tsx`
- Modify: `src/pages/Home.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Produces `ParallaxField({ className?: string }): JSX.Element`, a decorative field with `data-parallax-field` and three transform-only layers.
- Home consumes `ParallaxField` in the hero and keeps all existing readable copy outside the animated layers.

- [ ] **Step 1: Add the component with the static accessibility baseline**

```tsx
export function ParallaxField({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`parallax-field pointer-events-none ${className}`}>
      <div className="parallax-field__grid" />
      <Constellation tone="accent" className="parallax-field__constellation" />
      <div className="parallax-field__bloom" />
    </div>
  )
}
```

- [ ] **Step 2: Add transform-only CSS and the reduced-motion static branch**

```css
.parallax-field { position: relative; isolation: isolate; min-height: 12rem; }
.parallax-field__grid, .parallax-field__constellation, .parallax-field__bloom { position: absolute; inset: 0; will-change: transform; }
@media (prefers-reduced-motion: reduce) { .parallax-field__grid, .parallax-field__constellation, .parallax-field__bloom { transform: none !important; } }
```

- [ ] **Step 3: Connect local scroll progress through Framer Motion**

Use `useScroll({ target: ref, offset: ['start end', 'end start'] })` and `useTransform` for grid `0 → -18px`, constellation `0 → -34px`, and bloom `0 → -52px`; render these via `motion.div` styles. Keep the static child elements rendered when motion is disabled.

- [ ] **Step 4: Replace the hero’s inline constellation stage with `ParallaxField` and add a normal `href="#projects"` scroll cue**

The cue text is `Explore projects`; give the showcase section `id="projects"`. It is visible, keyboard focusable, and uses no JavaScript click handler.

- [ ] **Step 5: Verify**

Run: `npm run typecheck`  
Expected: exit 0.

Run: `npm run build`  
Expected: exit 0 with static routes generated.

### Task 2: Add parallax depth and semantic context to the project showcase

**Files:**
- Modify: `src/components/PerspectiveShowcase.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: showcase `id="projects"` supplied by Task 1.
- Produces: `PerspectiveShowcase` with a decorative scroll-depth backdrop and a section index.

- [ ] **Step 1: Add an accessible section label and preserve the existing `h2`**

```tsx
<p className="eyebrow reveal" aria-hidden="true"><span>01</span><span>Projects</span></p>
<h2 id="showcase-heading">Seven projects, each built to do real work.</h2>
```

- [ ] **Step 2: Attach a local Framer Motion scroll transform to backdrop layers only**

Wrap the existing `.pgrid-plane` and decorative radial background in motion elements. With a `useScroll` target ref, move the plane by `-24px` and the constellation by `-42px`; leave card layout and link hit areas untransformed by scroll.

- [ ] **Step 3: Refine card interaction without changing link semantics**

Keep each card as an anchor. Ensure its `whileFocus` and `whileHover` effects share the same shallow `y: -5`, `rotateX: 1.5`, `rotateY: -1.5` target and set the transition to `{ type: 'spring', stiffness: 260, damping: 22 }`. Disable pointer tilt when reduced motion is preferred or `(hover: none)` matches.

- [ ] **Step 4: Verify build and manual keyboard behaviour**

Run: `npm run build`  
Expected: exit 0.

Manual: Tab from the skip link through project cards. Expected: each card retains the existing visible focus ring and opens its original internal route on Enter.

### Task 3: Apply quiet depth to product hero frames

**Files:**
- Modify: `src/components/heroes/HeroFrame.tsx`
- Modify: `src/components/heroes/ResearchAssistantHero.tsx`
- Modify: `src/components/heroes/ClinicalPROMsHero.tsx`
- Modify: `src/components/heroes/AudioQuillHero.tsx`
- Modify: `src/components/heroes/ScribbleHero.tsx`
- Modify: `src/index.css`

**Interfaces:**
- `HeroFrame` continues to accept its existing children and optional theme.
- Scene layers opt in using `data-hero-depth="back|surface|detail"`; `HeroFrame` provides only CSS transform variables, so product components remain independently understandable.

- [ ] **Step 1: Inspect existing hero markup and place depth markers only on decorative/interface layers**

Use `data-hero-depth="back"` for grid/background, `surface` for the drawn application panel, and `detail` for chips, cursors, plotted points, or waveform bars. Never add a marker to the title or CTA, which are outside `HeroFrame`.

- [ ] **Step 2: Implement local hero transform variables in `HeroFrame`**

Use a `ref`, `useScroll`, and `useTransform` to set `--hero-back-y`, `--hero-surface-y`, and `--hero-detail-y` from 0 to -8px, -15px, and -24px. The CSS selectors must use `transform: translate3d(0, var(--hero-*-y), 0)` and include a reduced-motion override.

- [ ] **Step 3: Strengthen scenes from true product behaviour**

- ResearchAssistant: source highlight, citation chip, and manuscript line form a visible evidence chain.
- ClinicalPROMs: line chart, MCID reference, and response/encryption chips retain the clinical dashboard language.
- AudioQuill: waveform and raw/clean/structured states remain a short readable transformation.
- Scribble: blocks align into a publishable composition using the existing teal/blue highlight.

Do not represent an app state the product does not have; scenes are illustrative and non-interactive.

- [ ] **Step 4: Verify every product route**

Run: `npm run build`  
Expected: exit 0.

Manual: open `/researchassistant`, `/clinicalproms`, `/audioquill`, and `/scribble`. Expected: title, CTA, feature copy, and external links stay readable and unchanged; scenes show static completed states under reduced motion.

### Task 4: Visual, responsive, and release-safety verification

**Files:**
- Modify: only files required to correct verified defects from Tasks 1–3.

**Interfaces:**
- Consumes all completed parallax and scene components.
- Produces a locally built, unpushed RQAI hub.

- [ ] **Step 1: Run project checks**

Run: `npm run typecheck`  
Expected: exit 0.

Run: `npm run check-links`  
Expected: exit 0 or only documented known liveness output with no changed product URL.

Run: `npm run build`  
Expected: exit 0.

- [ ] **Step 2: Capture and inspect desktop and mobile screenshots**

Use the local Vite preview, capture the home route at 1440px and 390px widths, then capture `/researchassistant`, `/clinicalproms`, `/audioquill`, and `/scribble` at desktop width. Confirm no clipped scene, text collision, hidden CTA, or pointer-event obstruction.

- [ ] **Step 3: Verify reduced motion**

With `prefers-reduced-motion: reduce`, load the home route and two project pages. Expected: all reading content and complete decorative scenes are visible, but no scroll-linked or looping animation runs.

- [ ] **Step 4: Commit the implementation locally without pushing**

```bash
git add src/pages/Home.tsx src/components src/index.css docs/superpowers/plans/2026-07-12-rqai-parallax-hub.md
git commit -m "feat: add RQAI parallax product hub"
```

Do not run `git push`.
