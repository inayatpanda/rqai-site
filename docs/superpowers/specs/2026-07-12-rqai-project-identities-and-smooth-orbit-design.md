# RQAI project identities and smooth wide orbit design

**Status:** Approved visual direction; implementation follows written-spec review.

## Goal

Carry each project's bold identity from the RQAI home cards into its internal RQAI project page, while preserving the dark RQAI reading canvas. Widen the home 3D motion stage and make all scroll-linked movement materially smoother.

The work changes only `rqai.co.uk`. External product websites and applications remain untouched.

## Shared identity system

Create one `PRODUCT_IDENTITIES` map keyed by the seven `Slug` values. It becomes the only source of product colours for:

- Home project cards.
- Internal project-page heroes.
- Primary project CTAs.
- Price emphasis.
- Feature markers.
- Product hero-frame atmosphere.
- “More from RQAI” cross-link cards.
- Product pictograms.

Each identity contains `from`, `to`, `ink`, `muted`, `highlight`, `border` and optional `warm` values. The existing approved palettes remain unchanged.

The map moves out of `PerspectiveShowcase.tsx` into `src/data/productIdentities.ts`, preventing the home page and project pages from drifting apart.

## Internal project-page treatment

The shared `AppPage` template remains structurally consistent across all seven projects. Colour is introduced in bounded regions rather than applied to the full page.

### Hero

The project hero becomes a full-width atmospheric band within the existing RQAI page:

- A product-coloured gradient wash occupies the hero background.
- The title, tagline, price and CTA remain in the existing two-column layout.
- The animated product workspace receives a coloured edge, glow and lightly tinted browser chrome.
- Text uses the product identity's contrast-safe `ink` and `muted` tokens within the coloured area.
- The “All projects” control remains clearly visible and keyboard accessible.

### Buttons and price

`AppCta` consumes the active identity and uses its gradient, ink and focus colour. Price text uses the identity highlight. Hover and focus add a product-coloured glow without moving the surrounding layout.

### Feature markers

The dark feature grid remains neutral. Each bullet marker, border highlight and optional hover accent uses the active product's `highlight` token. Long-form feature copy remains unchanged.

### Cross-link cards

Each “More from RQAI” card uses the destination project's full-colour identity, not the current page's identity. Each card also renders the destination `ProductGlyph`.

The existing routes, names, taglines and link semantics remain unchanged.

## Wider 3D motion stage

`ProductOrbit` continues to sit beneath the restored written hero.

### Width

- The active grid plane extends to roughly 150–165 viewport widths so its edges never read as a contained rectangle.
- Product fragments spread across approximately 88–92% of the usable viewport width on desktop.
- The outer fragments approach, but do not touch, safe viewport gutters.
- The central formation grows from 15rem to approximately 19rem on large displays.
- Mobile retains a shorter, tighter composition to prevent horizontal overflow.

### Smoothing

Raw `scrollYProgress` is passed through `useSpring` before any layer transform consumes it.

The spring uses a controlled cinematic response: moderate stiffness, high damping and low bounce. The initial target is approximately `stiffness: 72`, `damping: 24`, `mass: 0.65`, tuned during browser verification.

All layers derive from the same smoothed progress value, so the grid, signal core, fragments and final CTA remain phase-locked. Individual layers still travel different distances to preserve parallax depth.

### Choreography

The scroll sequence becomes four overlapping phases:

1. **Formation:** the central signal grows and the grid resolves into depth.
2. **Expansion:** the signal opens, rings separate and fragments acquire scale.
3. **Separation:** all seven fragments travel across the wider stage with eased rotation.
4. **Settlement:** fragments hold while the “Enter the project field” CTA resolves.

Reverse scrolling reverses the same sequence. The browser retains native scrolling; there is no smooth-scroll library and no scroll trapping.

## Accessibility and responsive behaviour

- `prefers-reduced-motion: reduce` bypasses the spring-driven transforms and displays the complete settled composition.
- Internal page text contrast meets WCAG AA within every coloured hero.
- All CTA and cross-link cards retain real anchors/links and visible keyboard focus.
- Decorative colour fields and SVG pictograms stay outside the accessibility tree.
- Mobile uses the dark reading canvas, full-width coloured hero, single-column cross-links and a reduced-width orbit arrangement.
- No new dependency is introduced.

## Component changes

- Create `src/data/productIdentities.ts` as the shared identity source.
- Modify `src/components/PerspectiveShowcase.tsx` to consume shared identities.
- Modify `src/pages/AppPage.tsx` to apply the current identity to the hero, price, features and cross-links.
- Modify `src/components/AppCta.tsx` to accept or derive an identity.
- Modify `src/components/heroes/HeroFrame.tsx` to consume CSS identity variables for glow, border and chrome.
- Modify `src/components/ProductOrbit.tsx` to use smoothed shared progress and wider fragment destinations.
- Modify `src/index.css` for themed project-page regions and widened orbit geometry.
- Extend `scripts/parallax-field.test.mjs` to cover the identity map, all seven slug keys and spring-smoothed orbit progress.

## Verification

1. Run `npm test`, `npm run typecheck` and `npm run build`.
2. Inspect all seven internal project heroes for correct identity, contrast and CTA treatment.
3. Inspect feature markers and “More from RQAI” destination colours on at least two representative pages.
4. Inspect the full home orbit at formation, separation and settlement positions.
5. Verify the outer fragments use the wider stage without horizontal page overflow.
6. Verify desktop, mobile, keyboard and reduced-motion behaviour.
7. Preserve the existing uncommitted `tsconfig.tsbuildinfo` change.
8. Do not push.

## Out of scope

- Altering external product sites or applications.
- Full-page product-coloured backgrounds.
- Rewriting factual content, pricing or SEO metadata.
- Adding a smooth-scroll library, WebGL or video.
- Deployment or publishing.
