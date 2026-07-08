# RQAI company site v2 — multi-page marketing site

Owner decisions (2026-07-08): RQAI stands for itself — no acronym expansion anywhere.
A page per app plus a rich About. Copy is factual, never exaggerated, and NEVER
references orthopaedics as a framing or the founder as a surgeon — no persona, no bio.
Product names stay exactly as they are (OrthoPortfolio, OrthoConsultantPrep, …).
The single most important function of the site: working links to every app.

## What it is

The company site at rqai.co.uk (existing repo `Inayat-website/rqai-site`,
github.com/inayatpanda/rqai-site), upgraded from a one-page landing to a small
multi-page marketing site. Deployment stays the existing push-to-main GitHub Action →
Hostinger FTP into the rqai.co.uk web root.

## Architecture

Keep the existing stack: Vite 5 + React 18 + TypeScript + Tailwind 3 + Framer Motion +
self-hosted Inter. Add client routing with **static prerendering** so every route ships
as a real `.html` file (SEO + no-JS first paint): use a zero-cost static-generation
approach compatible with the current build (e.g. vite-react-ssg or an equivalent
prerender step — implementer's choice, no paid deps), plus `.htaccess` fallback rewrites
so deep links work on Hostinger regardless.

Existing `src/data/products.ts` remains the single source of truth, extended per
product with: slug, live URL, price line, feature bullets, and long-form copy for the
app page. The animated micro-demos in `src/components/demos/` are reused on both the
home grid and each app page (enlarged).

## Pages (8)

1. **Home `/`** — hero (RQAI wordmark + truthful tagline + ECG-trace motif), product
   showcase rendered as a **perspective-grid** treatment (reference:
   https://www.vengenceui.com/components/perspective-grid), each card → its app page.
   Short studio-note strip linking to About.
2. **Six app pages** — `/orthoportfolio`, `/consultantprep`, `/clinicalproms`,
   `/chapbook`, `/audioquill`, `/scribble`. Each: factual one-paragraph pitch, 3–5 key
   feature bullets (each verifiable against the product), the micro-demo given room,
   price line only where verified from the product repo/sales config (OrthoPortfolio
   £49/yr; OrthoConsultantPrep £49 one-off; ClinicalPROMs £49 lifetime; others omit if
   unverified), and one big CTA "Open <app>" → the live URL. A "coming soon" variant
   (no dead CTA) is used automatically for any URL the ship-time link check finds
   unreachable.
3. **About `/about`** — rich, not bland, principles over persona: one job well ·
   local-first, data stays on your device · no accounts, no tracking · built and
   maintained by one small independent UK studio · buy once or subscribe simply.
   Told with conviction and visual rhythm (the ECG motif as punctuation). Ends with
   contact: hello@rqai.co.uk. No founder bio, no specialty references.
4. **404** — on-brand, links home.

Every page shares a sticky global header — RQAI wordmark (→ home), an Apps menu (the
six app pages), About — and a footer with the app links, contact email and © RQAI.
Mobile gets a compact disclosure menu. The current page's tab is visibly active.

## Design language

**OWNER DECISION 2026-07-08: light theme — this consciously overrides the family
CLAUDE.md "dark everywhere" rule for THIS site; builders must not revert it.**

Pleasing, modern, light. The organising concept is **ECG chart paper**: a warm
white/cream canvas (paper `#faf7f2`-family, white cards) carrying a barely-there
chart-paper grid, with a live-drawing ECG trace in ink/teal as the house motif — the
hero signature and section punctuation (reference:
https://www.scichart.com/demo/react/vital-signs-ecg-medical-chart-example),
implemented as lightweight SVG/canvas animation, NOT a charting library. Palette
direction: deep ink for text, one surgical-teal accent plus one warm accent (amber),
used sparingly — kin to the ClinicalPROMs marketing site's light editorial system
(`ortho-outcomes/marketing-site/` — bone-paper, ink-green, teal + amber, Fraunces +
IBM Plex), which builders should study as the family's proven light language. Type:
an editorial display serif for headlines (e.g. Fraunces) over a clean sans for body —
self-hosted, no paid fonts. The final palette/type call belongs to the taste-skill
pass, within: light warm canvas, restrained accents, generous whitespace, modern
editorial feel, nothing resembling generic AI-startup gradients.

Second signature: the **perspective grid** for product showcases (per the Vengence UI
reference above), restyled for the light canvas.

Builders MUST load the `taste-skill` and `frontend-design:frontend-design` skills
before writing UI code, and fetch both reference URLs for the real look. Reduced-motion
fallbacks for every animation. British spelling. Copy tone per the family CLAUDE.md:
confident, plain, no hype. WCAG AA contrast on the light canvas.

## Link integrity + infra fixes (in scope)

Ship-time link check of every app URL; tiles/CTAs only say "Live"/link out when the
URL answers 200. Findings from 2026-07-08 probe: apex, clinicalproms.rqai.co.uk,
audioquill.rqai.co.uk, chapbook.rqai.co.uk are live; **topp.rqai.co.uk,
consultantprep.rqai.co.uk, scribble.rqai.co.uk are DEAD** (DNS A → 91.108.107.144,
connection timeout; nameservers are Hostinger dns-parking).

- **Scribble fix**: app is live at scribble-pwa.netlify.app. We attempt to add
  scribble.rqai.co.uk as a domain alias on that Netlify site from here (Netlify
  MCP/CLI, chapbook pattern); the Hostinger DNS change (CNAME scribble →
  scribble-pwa.netlify.app) is an owner step.
- **Owner DNS action list** (delivered as `docs/DNS-FIXES.md` in the repo, exact
  records): fix topp + consultantprep (re-point to the live Hostinger server / recreate
  subdomains in hPanel) and add the scribble CNAME.
- The site's product data uses the intended final URLs; the link-checker downgrades
  gracefully at build time, so re-running the deploy after the DNS fixes flips
  everything to Live with no code change.

## Testing & QA

- Build green (tsc + vite) with prerendered HTML per route verified present.
- Link check script (`scripts/check-links.mjs`, runs in CI before deploy).
- Controller browser QA on the production build: all 8 routes, mobile width, demos
  animate, reduced-motion honoured, no console errors.
- Deploy gate: push to main publishes the live site — owner is asked once before push.

## Execution

Subagent-driven development (plan → fresh Opus implementer per task → Opus task review
→ final review). Fable orchestrates only. Content sourcing for app pages: each
product's repo README/marketing copy (ClinicalPROMs has a full marketing site at
`ortho-outcomes/marketing-site/` — strongest reusable copy), verified against the
actual product before publishing.
