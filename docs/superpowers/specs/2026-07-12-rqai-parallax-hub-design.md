# RQAI parallax hub design

**Status:** approved in principle; implementation awaits review of this written design.

## Goal

Make the RQAI hub feel like the connected home for seven distinct, local-first products without changing the product sites, their copy, or their external links. The experience should use scroll depth as a wayfinding device, not as decoration.

The hub's single job is to introduce the product set, make each project's purpose immediately legible, and send a visitor to the right product site.

## Product-interface findings

The spoke sites establish useful visual material that the hub should echo rather than replace:

- **ResearchAssistant:** a pale research workbench, fine grid, source-to-manuscript flow, and cards that fan through a workflow.
- **ClinicalPROMs:** outcome trajectories, theatre-list capture, measured clinical progress, and a restrained cyan/teal clinical surface.
- **Chapbook:** dark writing space, chat-like composition, and a bright cyan action surface.
- **OrthoPortfolio:** a quiet dark, document-led activation and evidence-assembly product.
- **OrthoConsultantPrep:** a deliberately spare learning product, organised around timed practice and review.
- **AudioQuill:** a local dictation workflow that turns raw speech into structured prose.
- **Scribble:** a dark, focused block-writing surface with a teal-to-blue highlight.

The hub will continue to use its own dark RQAI palette and typography. Project colours appear only in their micro-scenes and small accents, so the hub remains one product family.

## Direction

Use a centre-outward system as the one memorable interaction:

1. The existing RQAI constellation begins as a compact, centred field in the hero.
2. As the visitor scrolls into the project showcase, its foreground nodes and light field travel outward faster than its distant grid, creating depth.
3. Project cards sit on that receding plane. Their product-specific scenes activate on entry or focus and remain still afterwards.
4. Product pages retain the factual content and external CTA, but their hero scene gains a low-amplitude scroll depth shift so the product's working surface appears to come forward as the visitor reads.

The effect is implemented with transform and opacity only. It must never trap scroll, hijack browser scrolling, or rely on a smooth-scroll library.

## Components

### `ParallaxField`

A reusable decorative React component for the home hero and project showcase.

- Three absolute layers: distant perspective grid, constellation edges, foreground nodes/light bloom.
- Receives a scroll-progress motion value or computes local progress through Framer Motion's `useScroll` and `useTransform`.
- The layers translate at deliberately different small distances; foreground content never moves enough to compromise reading.
- `aria-hidden`, `pointer-events-none`, and static no-JS markup.

### Home hero

- Keep the current headline, supporting copy and wording.
- Replace the single static constellation stage with `ParallaxField`.
- Add an unobtrusive scroll cue beneath the visual: a vertical line and `Explore projects` label, linked to the project showcase. It is a normal anchor, not a scroll-jacking control.
- Preserve the current radial colour wash and add only a subtle focal bloom behind the constellation centre.

### Project showcase

- Retain the responsive seven-card layout, all links, and all text.
- Extend `PerspectiveShowcase` so its grid plane moves at a slower rate than its cards and constellation fragments on scroll.
- Add a small section index (`01 / Projects`) as structural context, not a navigation widget.
- Each card keeps its current keyboard-accessible link behaviour. On pointer hover or keyboard focus, its existing micro-demo runs once and the card performs a shallow transform-based tilt. Touch devices receive no pointer tilt.

### Product scenes

Existing microscenes are refined rather than replaced. Each is tied to the product's actual interface:

| Product | Scene refinement |
| --- | --- |
| ResearchAssistant | highlighted source phrase connects to a citation marker and manuscript line |
| ClinicalPROMs | outcome trajectory extends and its MCID line resolves |
| Chapbook | chat blocks compose into a finished post card |
| OrthoPortfolio | evidence sheets align into GMC-relevant dossier categories |
| OrthoConsultantPrep | three-minute dial completes into a concise review state |
| AudioQuill | waveform resolves into raw, clean, and structured writing states |
| Scribble | typed blocks arrange into a clean publishing canvas |

The hub scenes remain illustrative. They do not pretend to be clickable versions of the apps, and no product claim changes.

### Product-page hero treatment

- Keep the shared title / scene two-column structure and all SEO metadata.
- Add depth to each scene within `HeroFrame`: background grid moves least, interface surface moves moderately, detail/chip layer moves most.
- Content and CTA remain stationary and legible.
- Do not introduce a light panel to products that do not already define one.

## Motion and accessibility

- Respect `prefers-reduced-motion: reduce`: no scroll-linked transforms, no looping animation, completed scenes visible immediately.
- `useInView` / `whileInView` scenes run once to avoid repeated distraction.
- All interactive links preserve visible focus states. Card effects are activated on focus as well as hover.
- Motion uses Framer Motion, already installed, with CSS fallbacks for no-JS rendering.
- Decorative layers stay out of accessibility trees and cannot intercept links.
- Use `min-height: 100dvh` only if a full-height visual area is required; no content is hidden below a fold.

## Responsive behaviour

- Desktop: full three-layer depth and shallow pointer tilt within individual cards.
- Tablet: scroll depth stays, but layer travel reduces by around one third.
- Mobile: show the core constellation and one depth plane only; card tilt and scroll cue animation are disabled. Cards remain a one-column grid.

## Files expected to change

- `src/pages/Home.tsx`
- `src/components/PerspectiveShowcase.tsx`
- `src/components/Constellation.tsx` or new `src/components/ParallaxField.tsx`
- `src/components/heroes/HeroFrame.tsx` and relevant product hero components
- `src/index.css`
- focused tests or validation additions if the project has an established suitable pattern

No spoke-site source, product data, links, pricing, or deployment settings will change.

## Verification

1. `npm run typecheck`, `npm run build`, and `npm run check-links` pass.
2. Desktop visual check: home, all seven cards, and at least ResearchAssistant, ClinicalPROMs, AudioQuill, and Scribble product pages.
3. Mobile visual check: home and two representative project pages.
4. Keyboard check: skip link, project cards, project CTA, and the new anchor cue.
5. Reduced-motion check: static but complete visual states with no content loss.
6. Verify no uncommitted user change is overwritten; specifically preserve the existing generated `tsconfig.tsbuildinfo` modification.

## Out of scope

- Changes to individual product/spoke sites.
- New dependencies, a scroll-smoothing library, WebGL, or video assets.
- Any publishing, deployment, or push.
