# RQAI bold product cards implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the original RQAI written hero, place the 3D product orbit beneath it, and render seven bold app-native project cards with bespoke animated SVG pictograms.

**Architecture:** `Home` owns the page order and restored copy. `ProductOrbit` becomes a self-contained visual transition without marketing copy. `PerspectiveShowcase` consumes a single palette map and a new slug-driven `ProductGlyph`, keeping card navigation, tilt and responsive layout intact.

**Tech Stack:** React 18, TypeScript, Vite React SSG, Tailwind CSS 3, Framer Motion 11, inline SVG.

## Global Constraints

- Change only the RQAI hub; do not change product websites or applications.
- Preserve all product routes, factual card copy, pricing and SEO metadata.
- Use the exact earlier headline and supporting paragraph from the approved spec.
- Do not add dependencies, WebGL, video, screenshots or third-party icon libraries.
- Maintain real link semantics, visible keyboard focus, WCAG AA contrast and `prefers-reduced-motion` completed states.
- Preserve the existing uncommitted `tsconfig.tsbuildinfo` change.
- Do not push.

---

### Task 1: Protect the approved page order and product-glyph contract

**Files:**
- Modify: `scripts/parallax-field.test.mjs`
- Test: `scripts/parallax-field.test.mjs`

**Interfaces:**
- Consumes the source files as text through `readFile`.
- Produces failing structural tests requiring the restored hero to precede `ProductOrbit` and requiring `ProductGlyph` to support all seven product slugs.

- [ ] **Step 1: Write the failing hero-order test**

```js
test('home restores the original written hero before the product orbit', async () => {
  const source = await readFile(new URL('../src/pages/Home.tsx', import.meta.url), 'utf8')
  assert.match(source, /Streamline the work\. Keep the hours\./)
  assert.ok(source.indexOf('Streamline the work.') < source.indexOf('<ProductOrbit'))
})
```

- [ ] **Step 2: Write the failing glyph coverage test**

```js
test('product glyph supports every RQAI project slug', async () => {
  const source = await readFile(new URL('../src/components/ProductGlyph.tsx', import.meta.url), 'utf8')
  for (const slug of ['researchassistant','clinicalproms','chapbook','orthoportfolio','consultantprep','audioquill','scribble']) {
    assert.match(source, new RegExp(slug))
  }
  assert.match(source, /aria-hidden="true"/)
})
```

- [ ] **Step 3: Run tests and verify they fail for the missing implementation**

Run: `npm test`  
Expected: FAIL because the restored hero is absent and `ProductGlyph.tsx` does not exist.

### Task 2: Restore the written hero and reposition the 3D sequence

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/components/ProductOrbit.tsx`
- Modify: `src/index.css`
- Test: `scripts/parallax-field.test.mjs`

**Interfaces:**
- `Home` renders `<Restored hero />`, then `<ProductOrbit />`, then `<PerspectiveShowcase />`.
- `ProductOrbit(): JSX.Element` retains its scroll-linked signal, grid, fragments and `#projects` entry link but renders no `h1` or alternate product marketing paragraph.

- [ ] **Step 1: Restore the exact hero content above `ProductOrbit`**

```tsx
<section className="home-intro relative overflow-hidden">
  <div className="container-edge relative pb-16 pt-16 md:pb-24 md:pt-24">
    <p className="reveal font-display text-lg font-semibold tracking-[0.12em] text-inkStrong">RQAI</p>
    <h1 className="reveal mt-6 max-w-4xl text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.03]">
      Streamline the work. Keep the hours.
    </h1>
    <p className="reveal mt-6 max-w-[54ch] text-lg leading-relaxed text-ink">
      A clinical research workbench, dictation that writes cleanly, a blog you control from your phone, and a feature-rich note taker. Organised, clutter-free, with AI only where it genuinely helps and always under your control.
    </p>
  </div>
</section>
<ProductOrbit />
```

- [ ] **Step 2: Remove duplicate headline, paragraph and title transforms from `ProductOrbit`**

Keep the sticky 3D grid, core rings, seven linked fragments and final `Enter the project field` anchor. Replace the removed text with an `aria-hidden` visual-stage label `RQAI / system unfolding` positioned at the top of the sticky scene.

- [ ] **Step 3: Add the restored hero surface styles**

```css
.home-intro { background: radial-gradient(54rem 32rem at 72% -12%, rgba(69,213,242,.10), transparent 62%), #07142f; }
.home-intro::after { content:""; position:absolute; inset:auto 0 0; height:1px; background:linear-gradient(90deg,transparent,rgba(69,213,242,.35),transparent); }
```

- [ ] **Step 4: Run the page-order test**

Run: `npm test`  
Expected: hero-order test passes; glyph coverage still fails.

- [ ] **Step 5: Commit locally**

Run:

```bash
git add src/pages/Home.tsx src/components/ProductOrbit.tsx src/index.css scripts/parallax-field.test.mjs
git commit -m "feat: restore RQAI written hero above motion stage"
```

### Task 3: Build the bespoke product pictogram system

**Files:**
- Create: `src/components/ProductGlyph.tsx`
- Modify: `src/index.css`
- Test: `scripts/parallax-field.test.mjs`

**Interfaces:**
- Consumes `Slug` from `src/data/products.ts`.
- Produces `ProductGlyph({ slug, className? }: { slug: Slug; className?: string }): JSX.Element`.
- Every SVG uses `viewBox="0 0 64 48"`, `aria-hidden="true"`, `focusable="false"` and `.product-glyph` animation classes.

- [ ] **Step 1: Implement the slug-driven glyph component**

Use a `switch (slug)` with seven explicit cases:

```tsx
export function ProductGlyph({ slug, className = '' }: { slug: Slug; className?: string }) {
  const content = (() => {
    switch (slug) {
      case 'researchassistant': return <ResearchGlyph />
      case 'clinicalproms': return <PromsGlyph />
      case 'chapbook': return <ChapbookGlyph />
      case 'orthoportfolio': return <PortfolioGlyph />
      case 'consultantprep': return <PrepGlyph />
      case 'audioquill': return <QuillGlyph />
      case 'scribble': return <ScribbleGlyph />
    }
  })()
  return <svg viewBox="0 0 64 48" aria-hidden="true" focusable="false" className={`product-glyph ${className}`}>{content}</svg>
}
```

Each glyph depicts its approved workflow using paths, rects and circles with `.glyph-primary`, `.glyph-secondary`, `.glyph-draw`, `.glyph-pop` and `.glyph-shift` classes. Do not import an icon library.

- [ ] **Step 2: Add shared glyph animation rules**

```css
.product-glyph { width:5rem; height:3.75rem; overflow:visible; }
.glyph-primary { stroke:var(--card-ink); fill:none; }
.glyph-secondary { stroke:var(--card-highlight); fill:none; }
.glyph-draw { stroke-dasharray:1; stroke-dashoffset:1; transition:stroke-dashoffset .7s cubic-bezier(.16,1,.3,1); }
.project-card:hover .glyph-draw, .project-card:focus-visible .glyph-draw { stroke-dashoffset:0; }
.glyph-pop { transform-box:fill-box; transform-origin:center; transition:transform .45s cubic-bezier(.16,1,.3,1); }
.project-card:hover .glyph-pop, .project-card:focus-visible .glyph-pop { transform:scale(1.2); }
```

Add a reduced-motion rule setting `stroke-dashoffset:0`, `transform:none` and `transition:none`.

- [ ] **Step 3: Run tests and verify glyph coverage passes**

Run: `npm test`  
Expected: all structural tests pass.

- [ ] **Step 4: Commit locally**

Run:

```bash
git add src/components/ProductGlyph.tsx src/index.css scripts/parallax-field.test.mjs
git commit -m "feat: add bespoke RQAI product pictograms"
```

### Task 4: Apply full-colour app-native card palettes

**Files:**
- Modify: `src/components/PerspectiveShowcase.tsx`
- Modify: `src/index.css`
- Test: `scripts/parallax-field.test.mjs`

**Interfaces:**
- Consumes `ProductGlyph` and `Product.slug`.
- Produces a `CARD_THEMES: Record<Slug, CardTheme>` with `from`, `to`, `ink`, `muted`, `highlight`, `border` values used as CSS custom properties.

- [ ] **Step 1: Add the exact theme map**

```ts
const CARD_THEMES: Record<Slug, CardTheme> = {
  researchassistant: { from:'#2563EB', to:'#172E72', ink:'#F1F6FF', muted:'#C7D9FF', highlight:'#8CC8FF', border:'#77B7FF' },
  clinicalproms: { from:'#0E7490', to:'#087F68', ink:'#F0FFFF', muted:'#C4F1EC', highlight:'#67F1E0', border:'#7DE9E2' },
  chapbook: { from:'#13B8B2', to:'#075B67', ink:'#F2FFFF', muted:'#C8F2F0', highlight:'#FFAC8F', border:'#76E5DC' },
  orthoportfolio: { from:'#4338CA', to:'#28205F', ink:'#F5F3FF', muted:'#D7D2FF', highlight:'#67E8F9', border:'#9B95FF' },
  consultantprep: { from:'#D58A22', to:'#8A4E13', ink:'#111C32', muted:'#2B3142', highlight:'#FFF0A6', border:'#FFD278' },
  audioquill: { from:'#E95F78', to:'#733FA8', ink:'#FFF5FA', muted:'#F7D4E5', highlight:'#FFD0B8', border:'#FFA8C2' },
  scribble: { from:'#16B8B0', to:'#355DAD', ink:'#F2FFFF', muted:'#CDECF4', highlight:'#8CF8EF', border:'#86DDEB' },
}
```

- [ ] **Step 2: Replace the card demo with `ProductGlyph` and apply CSS variables**

```tsx
const theme = CARD_THEMES[slug]
<Link
  className="project-card pgrid-card ..."
  style={{
    '--card-from': theme.from,
    '--card-to': theme.to,
    '--card-ink': theme.ink,
    '--card-muted': theme.muted,
    '--card-highlight': theme.highlight,
    '--card-border': theme.border,
  } as React.CSSProperties}
>
  <ProductGlyph slug={slug} />
</Link>
```

- [ ] **Step 3: Style the full-colour card surface and app-specific spotlight**

```css
.project-card { color:var(--card-ink); border-color:color-mix(in srgb,var(--card-border) 56%,transparent); background:linear-gradient(145deg,var(--card-from),var(--card-to)); }
.project-card h3,.project-card .project-card__cta { color:var(--card-ink); }
.project-card .project-card__tagline,.project-card .project-card__hook { color:var(--card-muted); }
.project-card:hover,.project-card:focus-visible { border-color:var(--card-border); box-shadow:0 0 0 1px color-mix(in srgb,var(--card-highlight) 45%,transparent),0 28px 58px -26px var(--card-to); }
```

Use `useMotionTemplate` with `theme.highlight` for the cursor-following spotlight rather than the shared cyan constant.

- [ ] **Step 4: Verify**

Run: `npm test`  
Expected: all tests pass.

Run: `npm run typecheck`  
Expected: exit 0.

Run: `npm run build`  
Expected: exit 0 and all ten static routes render.

- [ ] **Step 5: Capture visual checks**

Capture home-page screenshots at 1440px and 390px widths. Inspect the written hero, the 3D sequence, all seven cards, text contrast, keyboard focus and completed reduced-motion states.

- [ ] **Step 6: Commit locally without pushing**

Run:

```bash
git add src/components/PerspectiveShowcase.tsx src/index.css
git commit -m "feat: give RQAI projects app-native card identities"
```

Do not run `git push`.
