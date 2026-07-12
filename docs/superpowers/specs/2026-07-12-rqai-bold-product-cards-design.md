# RQAI bold product cards and restored hero design

**Status:** Approved visual direction; implementation begins after written-spec review.

## Goal

Restore the earlier RQAI home-page message, move the large scroll-driven 3D sequence below that message, and redesign the project grid as seven bold app-native cards with bespoke pictograms.

The work changes only the RQAI hub. Product websites, product routes, pricing, factual copy and deployment configuration remain unchanged.

## Page sequence

### 1. Restored written hero

The page opens with the exact earlier content:

- Label: `RQAI`
- Headline: `Streamline the work. Keep the hours.`
- Supporting paragraph: `A clinical research workbench, dictation that writes cleanly, a blog you control from your phone, and a feature-rich note taker. Organised, clutter-free, with AI only where it genuinely helps and always under your control.`

The written hero remains calm, readable and independent of the animated sequence. It uses the existing RQAI typography, near-black/navy canvas and restrained cyan glow.

### 2. Scroll-driven 3D sequence

`ProductOrbit` moves below the written hero. It no longer replaces the page headline or introduces alternate marketing copy.

The sequence begins with the perspective grid and central RQAI signal. As the visitor scrolls, the signal assembles, expands and separates into seven product fragments. The final stage points directly into the project-card section.

The animation remains driven by ordinary browser scrolling. It does not trap, smooth or override the browser scroll. Reverse scrolling reverses the sequence.

### 3. Bold product-card grid

The existing seven-card responsive grid and all internal links remain. Each card receives its own saturated palette derived from the visual language of the corresponding product:

| Product | Card palette | Pictogram |
| --- | --- | --- |
| ResearchAssistant | Electric blue `#2563EB` to deep blue `#172E72`, pale blue ink | Connected source nodes resolving into a cited paragraph |
| ClinicalPROMs | Clinical teal `#0E7490` to emerald `#087F68`, cyan highlight | Recovery trajectory crossing an MCID reference |
| Chapbook | Turquoise `#13B8B2` to deep petrol `#075B67`, warm coral detail | Chat blocks resolving into a published page |
| OrthoPortfolio | Indigo `#4338CA` to ink violet `#28205F`, cyan detail | Evidence sheets locking into an indexed dossier |
| OrthoConsultantPrep | Amber `#D58A22` to burnt ochre `#8A4E13`, navy ink | Interview timer paired with a structured answer card |
| AudioQuill | Coral `#E95F78` to violet `#733FA8`, pale pink highlight | Waveform transforming into clean lines of text |
| Scribble | Turquoise `#16B8B0` to blue `#355DAD`, cyan highlight | Typed blocks assembling into a finished page |

These are full-colour surfaces, not faint tints. Each gradient stays within one product identity and uses high-contrast text. The overall card geometry, spacing and type hierarchy remain consistent so the cards still belong to RQAI.

## Pictogram system

The current micro-demos are replaced in the card grid by a new `ProductGlyph` component. It accepts the product slug and renders one bespoke inline SVG scene.

Every glyph uses the same visual grammar:

- 64-by-48 view box.
- Rounded strokes and simple filled anchors.
- One primary light ink plus one secondary accent drawn from the card palette.
- A short entry or hover animation that depicts the product's workflow.
- No generic library icons and no literal app screenshots.

Glyphs are decorative because the card's visible name and accessible label already identify the product. SVGs use `aria-hidden="true"` and cannot receive focus.

## Card interaction

Cards retain their existing shallow pointer tilt on fine-pointer devices. The cursor spotlight changes from the shared cyan colour to the card's own highlight colour.

On hover or keyboard focus:

- The card rises slightly.
- The product glyph completes its short workflow animation.
- The border and glow use the app's highlight colour.
- The CTA arrow advances without changing the link destination.

Touch devices receive the bold surfaces and completed glyph states without pointer tilt.

## Accessibility and responsive behaviour

- Text contrast must meet WCAG AA on every full-colour surface.
- All project cards remain real links with visible keyboard focus.
- `prefers-reduced-motion: reduce` shows the central 3D sequence and all pictograms in their completed static states.
- Decorative graphics remain outside the accessibility tree.
- Mobile keeps the restored hero first, uses a shorter 3D scroll sequence, and displays one full-width project card per row.
- No new dependency is introduced.

## Component changes

- `src/pages/Home.tsx`: restore the earlier written hero above `ProductOrbit`.
- `src/components/ProductOrbit.tsx`: remove duplicate headline/copy and become a self-contained 3D transition between hero and cards.
- `src/components/PerspectiveShowcase.tsx`: apply per-product palette tokens and render `ProductGlyph` instead of the existing card demos.
- `src/components/ProductGlyph.tsx`: new slug-driven bespoke SVG pictograms.
- `src/index.css`: card palette variables, glyph animations, restored hero spacing and responsive/reduced-motion rules.
- `scripts/parallax-field.test.mjs`: extend structural coverage for hero order, project-glyph mapping and reduced-motion contracts.

## Verification

1. Run `npm test`, `npm run typecheck` and `npm run build`.
2. Inspect the restored hero, midpoint and end of the scroll sequence at desktop width.
3. Inspect all seven cards at desktop and mobile widths.
4. Verify all seven card links and keyboard focus states.
5. Verify reduced-motion mode shows complete, static graphics.
6. Keep the existing uncommitted `tsconfig.tsbuildinfo` change untouched.
7. Do not push.

## Out of scope

- Changes to individual product websites or applications.
- Rewriting product descriptions, pricing or SEO metadata.
- Adding WebGL, video, screenshots or third-party icon libraries.
- Deployment or publishing.
