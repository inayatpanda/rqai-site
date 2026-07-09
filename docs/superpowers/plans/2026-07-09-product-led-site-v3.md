# Product-Led Site v3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild rqai.co.uk copy, structure, demos and SEO so every project is presented individually with grounded, code-verified marketing, flagships (ResearchAssistant, ClinicalPROMs, Chapbook) leading, plus technical SEO and AI-answer-engine discoverability.

**Architecture:** The site is a 9-page prerendered React SPA (vite-react-ssg, `dirStyle: 'nested'`). `src/data/products.ts` is the single source of truth consumed by `PerspectiveShowcase` (home grid), `AppPage` (one template for all seven project pages), `Shell` (nav/footer) and `AppCta`. This plan rewrites the data + copy, re-weights the home grid for flagships, replaces the seven abstract micro-demos with product-specific ones, ports ResearchAssistant's own `WorkflowReel` animation + two of its self-contained walkthrough HTMLs onto its hub page, and adds JSON-LD, canonical/OG, llms.txt and a refreshed sitemap.

**Tech Stack:** React 18, TypeScript, Tailwind (custom tokens: `canvas` #0c1a3a bg, `accent` #45d5f2 cyan, `accentWarm` #f4b05a, `ink`/`inkMuted`/`inkStrong`, `hairline`, `card`), framer-motion, vite-react-ssg, react-router-dom v6.

**Research sources (read-only evidence, do not modify):** session briefs at `/private/tmp/claude-501/-Users-inayatsmac/dd82d55f-b5f6-4d60-967c-82bac5831b1d/scratchpad/brief-*.md`; spec at `docs/superpowers/specs/2026-07-09-product-led-site-v3-design.md`; ResearchAssistant repo copy at `/Users/inayatsmac/Desktop/Transferred to new mac/Research-assistant/`.

## Global Constraints

- British spelling everywhere. Products are called **"projects"**, never "apps".
- **No em-dashes or en-dashes in visible copy** (colons, commas, full stops instead). Code comments may use them.
- No studio self-framing anywhere: never "small studio", "independent studio", "small on purpose", "online-only".
- Every product claim must be traceable to the research briefs. Never write: "open source" for ResearchAssistant (proprietary EULA); "peer-review panel" (say "a simulated Reviewer 2 pass"); OrthoPortfolio "generates the verification proformas" (not built); ClinicalPROMs "mobile coming soon" (PWA capture shipped).
- Prices shown ONLY where verified: OrthoPortfolio £49 a year, OrthoConsultantPrep £49 one-off, AudioQuill £30 a year, ResearchAssistant $60 a year. ClinicalPROMs, Chapbook, Scribble: omit price.
- Copy uses the pure-CSS `.reveal` class (never inline opacity:0); demos are `aria-hidden` decorations honouring `useReducedMotion()`; fixed-height stages so layout never shifts.
- After each task: `npm run typecheck && npm run build` must pass (run from repo root `/Users/inayatsmac/Desktop/Transferred to new mac/Inayat-website/rqai-site`). Commit per task. **NEVER `git push`** (push triggers the live deploy; owner reviews locally first).
- New PRODUCTS order (flagships first): researchassistant, clinicalproms, chapbook, orthoportfolio, consultantprep, audioquill, scribble.

---

### Task 1: Rewrite `src/data/products.ts` (type + order + all copy)

**Files:**
- Modify: `src/data/products.ts` (full rewrite of the PRODUCTS array and Product type; keep the existing imports, LivenessEntry/isLive code verbatim)

**Interfaces:**
- Consumes: existing demo components (imports unchanged), `liveness.json`.
- Produces: `Product` type gains `flagship: boolean`, `hook?: string` (one-line differentiator rendered only on flagship home cards), `category: string` + `platforms: string` (for JSON-LD in Task 11), `offer?: { price: string; currency: 'GBP' | 'USD'; period: 'year' | 'once' }` (machine-readable price for JSON-LD). Field `Showcase?: ComponentType` (optional full-width band on the project page, used by Task 9). Everything else keeps its existing name and meaning. `PRODUCTS` is reordered as per Global Constraints.

- [ ] **Step 1: Replace the Product type block** (keep file header comment, imports, and the isLive section untouched):

```ts
export type Slug =
  | 'researchassistant'
  | 'clinicalproms'
  | 'chapbook'
  | 'orthoportfolio'
  | 'consultantprep'
  | 'audioquill'
  | 'scribble'

export type Product = {
  name: string
  slug: Slug
  url: string
  /** <= 8 words, factual. */
  tagline: string
  /** One line rendered on flagship home cards only. */
  hook?: string
  /** One paragraph, factual. */
  description: string
  /** 3-5 bullets, each verifiable against the product. */
  features: string[]
  /** Display price, only where verified in the product's own source. */
  price?: string
  /** Machine-readable price for JSON-LD; present iff `price` is present. */
  offer?: { price: string; currency: 'GBP' | 'USD'; period: 'year' | 'once' }
  /** schema.org applicationCategory. */
  category: string
  /** schema.org operatingSystem. */
  platforms: string
  /** Flagships get larger home cards and the hook line. */
  flagship: boolean
  whereLine?: string
  /** The animated micro-demo for this project. */
  Demo: ComponentType
  /** Optional full-width showcase band on the project page. */
  Showcase?: ComponentType
}
```

- [ ] **Step 2: Replace the PRODUCTS array with exactly this content** (order matters):

```ts
export const PRODUCTS: Product[] = [
  {
    name: 'ResearchAssistant',
    slug: 'researchassistant',
    url: 'https://researchassistant.rqai.co.uk',
    tagline: 'Evidence, from search to submission.',
    hook: 'A complete clinical research workbench that runs on your own machine.',
    description:
      'ResearchAssistant is a local-first workbench for clinical research: one desktop project that carries a study from question to submitted manuscript. It searches and imports literature from PubMed, guides a systematic review from search strategy to GRADE, runs 52 statistical tests validated value for value against R, and drafts with an AI that must cite a specific sentence in your library or say nothing. Your work lives in a database on your own machine; your phone and iPad connect over your private network. The full walkthroughs, documentation and downloads are at researchassistant.rqai.co.uk.',
    features: [
      'Statistics you can defend: 52 tests validated value for value against R with the full comparison published, plus power and sample-size planning.',
      'A guided systematic review: a MeSH search builder grounded in an offline index of 30,956 descriptors with live PubMed counts, dual screening with a live Cohen’s kappa, then risk of bias, meta-analysis and GRADE.',
      'Synthesis beyond the basics: individual-participant data pooling, network meta-analysis and survival meta-analysis, with forest and funnel plots.',
      'Writing that cannot invent a citation: strict AI drafting grounds every claim to a sentence in your library, flags weak paraphrases and uncited paragraphs, and a simulated Reviewer 2 pass critiques the draft before you submit.',
      'Local-first: projects live in a database on your own machine, AI can run fully offline through Ollama, and your phone, iPad and co-authors connect over your private Tailscale network.',
    ],
    price: '$60 a year',
    offer: { price: '60', currency: 'USD', period: 'year' },
    category: 'Research software',
    platforms: 'macOS, Windows, Linux',
    flagship: true,
    whereLine:
      'ResearchAssistant is desktop software for Mac, Windows and Linux. Walkthroughs, documentation and downloads are at researchassistant.rqai.co.uk.',
    Demo: ResearchAssistantDemo,
  },
  {
    name: 'ClinicalPROMs',
    slug: 'clinicalproms',
    url: 'https://clinicalproms.rqai.co.uk',
    tagline: 'Collect and track validated patient-reported outcomes.',
    hook: 'Twenty validated instruments, scored as published, on hardware you control.',
    description:
      'ClinicalPROMs (also known as Ortho Outcomes) is self-hosted software for collecting and tracking validated patient-reported outcome measures. Photograph a theatre or clinic list and it becomes structured cases with no retyping. Patients answer encrypted questionnaires on their own phone, and the encryption key never touches a server. Twenty validated instruments are scored exactly as published, each with the thresholds that make a change clinically meaningful, and every patient’s recovery plots as a trajectory over time. It runs on your own Mac or Windows PC with its own embedded database: one licence, no per-seat fees, no vendor cloud. The full detail is at clinicalproms.rqai.co.uk.',
    features: [
      'Twenty validated instruments, from the Oxford scores to EQ-5D-5L, each scored exactly as published and checked by its own test.',
      'Clinically meaningful interpretation built in: MCID thresholds and concern bands, so a score change reads as improvement, not just a number.',
      'Capture cases from a photograph of a theatre or clinic list; patient questionnaires run in any phone browser.',
      'End-to-end encrypted patient links: answers are encrypted on the patient’s device and the key never reaches a server.',
      'Self-hosted on your own Mac or Windows PC with an embedded database, an audit log and data-rights tooling: one licence, unlimited patients.',
    ],
    category: 'Medical software',
    platforms: 'macOS, Windows',
    flagship: true,
    whereLine:
      'ClinicalPROMs is self-hosted software for your own Mac or Windows PC. Learn more and get it at clinicalproms.rqai.co.uk.',
    Demo: ClinicalPROMsDemo,
  },
  {
    name: 'Chapbook',
    slug: 'chapbook',
    url: 'https://chapbook.rqai.co.uk',
    tagline: 'Write your blog from your phone.',
    hook: 'A chat-style composer that publishes to a blog you own.',
    description:
      'Chapbook turns writing a blog into something you can do from your phone, as naturally as texting. Ideas go into a chat-style composer: each message becomes a paragraph, and tapping any block lets you edit it by chatting. Drop in photos, embed videos, add interactive widgets from a library of 75, and pick from six reading surfaces for how your blog looks. When you publish, the post commits straight to your own repository and deploys to your own site, on your own domain. There is no Chapbook server holding your words: your blog belongs to you. An AI can help draft, in a voice it learns from your own recent posts, and nothing ever posts without your say-so.',
    features: [
      'A chat-style composer: write a post the way you text, message by message, and edit any block by chatting.',
      'Photos processed on your device, video embeds, and 75 interactive widgets you can drop into a post.',
      'Six reading surfaces (Observatory, Parchment, Manuscript, Newsprint, Slate and Focus), custom accents, topics and your own domain.',
      'Publishing is a real commit to your own repository; your blog deploys to your own site and belongs to you.',
      'AI drafting that learns your voice from your own recent posts, with your own key; it never posts on your behalf.',
    ],
    category: 'Publishing software',
    platforms: 'Web, iOS, Android',
    flagship: true,
    whereLine:
      'Chapbook runs in your browser at chapbook.rqai.co.uk and installs to your phone. Your posts live in your own repository; your keys stay in your browser.',
    Demo: ChapbookDemo,
  },
  {
    name: 'OrthoPortfolio',
    slug: 'orthoportfolio',
    url: 'https://topp.rqai.co.uk',
    tagline: 'Compile a submission-ready Portfolio Pathway application.',
    description:
      'OrthoPortfolio turns a pile of raw evidence documents into a submission-ready GMC Portfolio Pathway application for Trauma and Orthopaedics. It knows the T&O curriculum: 13 index procedures, 14 critical conditions and the CiP structured reports. It redacts patient details from your documents and verifies nothing recoverable remains, files each document against the right requirement, and compiles indexed, bundled section PDFs with cover pages and page numbering. A dashboard tracks readiness, lists the gaps and prints a submission checklist. Everything runs locally on your own device.',
    features: [
      'Built on the published T&O requirements: 13 index procedures, 14 critical conditions, the CiP structured reports and the MSF and appraisal minimums.',
      'Redaction that rasterises each page and detects NHS numbers, postcodes, phone numbers and dates of birth, then verifies no recoverable text remains.',
      'Files each document against the right requirement automatically, with an offline fallback when no AI key is set.',
      'Compiles indexed section bundles: cover band, document index, per-document reflection pages and continuous page numbering.',
      'A readiness dashboard, a prioritised gap list and a printable submission checklist, plus logbook and CPD trackers checked against the indicative requirements.',
    ],
    price: '£49 a year',
    offer: { price: '49', currency: 'GBP', period: 'year' },
    category: 'Medical software',
    platforms: 'Web, macOS, Windows',
    flagship: false,
    Demo: OrthoPortfolioDemo,
  },
  {
    name: 'OrthoConsultantPrep',
    slug: 'consultantprep',
    url: 'https://consultantprep.rqai.co.uk',
    tagline: 'Structured preparation for the consultant interview.',
    description:
      'OrthoConsultantPrep is a local-first tool for preparing for the UK consultant interview in Trauma and Orthopaedics. It ships with 237 questions across 15 categories, each with a model answer, delivery advice, key statistics, references and follow-ups. A daily five-card practice flow keeps revision moving; a timed mock runs ten questions on a real three-minute interview clock; and Trust Prep reads a named trust’s published CQC, GIRFT and NHFD signals to show which scenarios that panel is likely to probe. All content is bundled in; your notes and progress stay on your device, with no account and no cloud.',
    features: [
      '237 questions in 15 categories, each with a model answer, delivery advice, key statistics, clickable references and follow-ups.',
      'Trust Prep: pick from 20 trust profiles and 13 interview scenarios are matched to that trust’s actual published signals, with the triggering evidence shown.',
      'A timed mock interview: ten questions, three minutes each, with an end-of-run review of what you answered, skipped or timed out.',
      'A daily five-card practice flow that weights what you have not seen and what you flagged for review, and keeps a streak.',
      '28 hot-topic briefings linked to their questions, checked against current NHS source documents. Everything stays on your device.',
    ],
    price: '£49 one-off',
    offer: { price: '49', currency: 'GBP', period: 'once' },
    category: 'Education software',
    platforms: 'Web (installable)',
    flagship: false,
    Demo: OrthoConsultantPrepDemo,
  },
  {
    name: 'AudioQuill',
    slug: 'audioquill',
    url: 'https://audioquill.rqai.co.uk',
    tagline: 'Write your story with your voice.',
    description:
      'AudioQuill is a voice-to-writing studio: speak, and it turns your words into clean, structured text you can shape into finished documents. Transcription can run entirely on your device with a local Whisper model, free and offline, or through your own key to a provider you choose. Every recording keeps its original transcript untouched: the AI-cleaned versions are layered on top and non-destructive, so nothing is lost. Guided templates and spoken commands structure a dictation as you talk, and topics collect scattered recordings into one compiled document.',
    features: [
      'On-device transcription with a local Whisper model: free, no key, and nothing leaves your device.',
      'The original transcript is always preserved; switch between raw, clean, structured and other versions at any time.',
      '44 guided templates and 49 spoken commands shape a dictation while you talk.',
      'Topics gather scattered recordings, then compile them into one document; export to DOCX, PDF or Markdown.',
      'Bring your own AI key, encrypted in your browser and sent only to the provider you choose. No account, no tracking.',
    ],
    price: '£30 a year',
    offer: { price: '30', currency: 'GBP', period: 'year' },
    category: 'Productivity software',
    platforms: 'Web (installable)',
    flagship: false,
    Demo: AudioQuillDemo,
  },
  {
    name: 'Scribble',
    slug: 'scribble',
    url: 'https://scribble.rqai.co.uk',
    tagline: 'A private notebook that stays on your device.',
    description:
      'Scribble is a private notebook that lives entirely on your device: no server, no account, and nothing collected. Notes are built from typed blocks, with text, headings, quotes, images, figures, 211 stickers and sandboxed interactive playgrounds, and a live preview as you write. AI help is optional and bring-your-own-key across seven providers. A note can publish straight to your own site’s repository, and your devices sync through a private repository you control, with conflicts surfaced rather than silently overwritten. There is also a calendar planner and a video-reel maker that renders on your device.',
    features: [
      'On-device and offline-first: notes, notebooks and keys stay with you; there is no Scribble server and no account.',
      'A typed block editor with images, figures, 211 stickers and interactive playgrounds, plus a live preview.',
      'Optional AI with your own key, across seven providers; keys never enter your notes and go nowhere but the provider you choose.',
      'Publish a note to your own site’s repository and sync devices through a private repository, with explicit conflict choices.',
      'Runs in any browser, installs on iOS and Android, and includes a calendar planner and on-device video reels.',
    ],
    category: 'Productivity software',
    platforms: 'Web, iOS, Android',
    flagship: false,
    Demo: ScribbleDemo,
  },
]
```

- [ ] **Step 3: Typecheck and build.** Run: `npm run typecheck && npm run build`. Expected: PASS (nothing else consumes the new fields yet; `Slug` order change is type-safe because the union members are unchanged).

- [ ] **Step 4: Visual sanity.** Run `npm run dev`, open http://localhost:5173/ and /researchassistant. Expected: home grid shows RA first; RA page shows the new copy and "$60 a year"; no console errors.

- [ ] **Step 5: Commit.**

```bash
git add src/data/products.ts
git commit -m "feat: grounded product-led copy, flagship ordering, JSON-LD data fields"
```

---

### Task 2: Flagship-weighted home grid (`PerspectiveShowcase.tsx`)

**Files:**
- Modify: `src/components/PerspectiveShowcase.tsx`

**Interfaces:**
- Consumes: `Product.flagship`, `Product.hook` from Task 1.
- Produces: no new exports; home grid gives flagships larger cells and a hook line.

- [ ] **Step 1: Replace the LG_SPAN constant** (order-matched to the new PRODUCTS order; rows sum to 6: 3+3, 4+2, 2+2+2):

```ts
// Column spans on the lg six-column grid, in PRODUCTS order. Flagships lead:
// ResearchAssistant + ClinicalPROMs share row one, Chapbook anchors row two
// at width 4, and the remaining projects close the grid in balanced rows.
const LG_SPAN = [
  'lg:col-span-3',
  'lg:col-span-3',
  'lg:col-span-4',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
] as const
```

- [ ] **Step 2: In `ProjectCard`, render the hook line on flagship cards.** Destructure `hook` and `flagship` from `product` (`const { name, slug, tagline, hook, flagship, Demo } = product`), and directly under the existing tagline `<p>` add:

```tsx
{flagship && hook && (
  <p className="relative mt-3 text-sm leading-relaxed text-ink">{hook}</p>
)}
```

Also give flagship cards a little more presence: on the card `<Link>` change `min-h-[13.5rem]` to a conditional `${flagship ? 'min-h-[15.5rem]' : 'min-h-[13.5rem]'}` (template string already present).

- [ ] **Step 3: Update the showcase intro copy.** Replace the `<p>` under the heading ("Open any project to see...") with:

```tsx
<p
  className="reveal mt-4 max-w-[52ch] text-base leading-relaxed text-ink"
  style={{ ['--reveal-delay' as string]: '0.06s' }}
>
  Each one is its own tool, made for one audience and one job. Open a
  project to see what it does, how it works and where to get it.
</p>
```

- [ ] **Step 4: Typecheck, build, visual check.** Run: `npm run typecheck && npm run build`. Then in `npm run dev` confirm at lg width: row one = ResearchAssistant + ClinicalPROMs (equal), row two = Chapbook (wider) + OrthoPortfolio, row three = the remaining three; flagship cards show hook lines; tablet width still closes cleanly (last card spans 2).

- [ ] **Step 5: Commit.**

```bash
git add src/components/PerspectiveShowcase.tsx
git commit -m "feat: flagship-weighted home grid with hook lines"
```

---

### Task 3: Home page rewrite (`Home.tsx`)

**Files:**
- Modify: `src/pages/Home.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: no exports; hero + closing band copy changes only (structure, classes and Constellation usage stay).

- [ ] **Step 1: Replace the meta constants:**

```ts
const HOME_TITLE = 'RQAI: focused software for clinicians, researchers and writers'
const HOME_DESCRIPTION =
  'Seven focused, local-first projects: ResearchAssistant, ClinicalPROMs, Chapbook, OrthoPortfolio, OrthoConsultantPrep, AudioQuill and Scribble. Your data stays on your device.'
```

- [ ] **Step 2: Replace the hero heading and sub-line** (same classes and reveal delays):

Heading `<h1>` text becomes: `Software that does one job well.`

Sub-paragraph text becomes: `Seven focused projects for clinicians, researchers and writers. Each one is local-first: your data stays on your device, with no accounts and no tracking.`

- [ ] **Step 3: Replace the closing "studio note" band copy** (keep the card, Constellation and Link structure). The paragraph becomes:

```
Every project here is built the same way: local-first, honest about what
it does, and careful with your data. Nothing is claimed on these pages
that is not already in the software.
```

The Link text becomes `How these projects are built` (still `to="/about"`).

- [ ] **Step 4: Sweep the file for stale comments** that say "studio" framing (the header comment "front door of the RQAI studio", "a short studio note") and reword to neutral ("front door of the site", "a principles note into /about").

- [ ] **Step 5: Typecheck, build, visual check.** `npm run typecheck && npm run build`; in dev, home reads with no studio framing anywhere.

- [ ] **Step 6: Commit.**

```bash
git add src/pages/Home.tsx
git commit -m "feat: product-led home hero and principles band"
```

---

### Task 4: About page rewrite (`About.tsx`)

**Files:**
- Modify: `src/pages/About.tsx`

**Interfaces:**
- Consumes: nothing new. Structure (hero, lead, commitments list, contact card) stays; copy changes.

- [ ] **Step 1: Replace meta constants:**

```ts
const ABOUT_TITLE = 'About RQAI: how these projects are built'
const ABOUT_DESCRIPTION =
  'The principles behind every RQAI project: one job done well, local-first, no accounts, no tracking, and nothing claimed that is not built.'
```

- [ ] **Step 2: Replace the hero.** `<h1>` becomes `Made thoughtfully.` and the sub-paragraph becomes:

```
Seven projects, one set of principles. Whatever the job, every RQAI
project is built the same way. Here is what that means in practice.
```

- [ ] **Step 3: Replace the lead paragraph** (the `py-10 md:py-14` section):

```
Each project is made for one audience and one job: a surgeon collecting
outcomes, a researcher writing a paper, a writer publishing a blog. They
share no platform and no login. What they share is a way of being built.
```

- [ ] **Step 4: Replace the COMMITMENTS array** (five entries; the studio entry is removed and replaced by a verifiability commitment):

```ts
const COMMITMENTS: Array<{ title: string; body: string }> = [
  {
    title: 'One job, done well.',
    body: 'Each project sets out to do one thing and do it properly, then stay out of your way. Nothing here grows into a suite you have to manage or a platform you never finish learning. A tool you understand in an afternoon is worth more than one you never master.',
  },
  {
    title: 'Local-first. Your data stays with you.',
    body: 'Your work lives on your own device by default. Nothing is uploaded, synced or stored on a server unless you ask for it, and where a project does sync, it uses storage you own and control. The surest way to keep data private is never to collect it in the first place.',
  },
  {
    title: 'No accounts, no tracking.',
    body: 'There is no sign-up wall and no analytics trailing you from page to page. Where a project needs a licence key, that is all it needs: nothing you do inside is measured, profiled or sold. A project should be useful the moment you open it, and mind its own business while you use it.',
  },
  {
    title: 'Nothing claimed that is not built.',
    body: 'Every feature described on these pages exists in the shipping project, and the write-ups are checked against the code before they are published. Where something is still in progress, the page says so. If a claim here cannot be verified, it comes down.',
  },
  {
    title: 'Buy once, or subscribe. Plainly.',
    body: 'Pricing is one clear line. Some projects are a single purchase, others a straightforward subscription, and where a project is for sale, its page shows the price up front. No per-seat fees, no add-on tiers, and no upsell once you have paid.',
  },
]
```

- [ ] **Step 5: Sweep stale comments** (header comment mentions "the studio"; the contact card copy "go straight to the studio" becomes "go straight to the maker"). Keep `hello@rqai.co.uk`.

- [ ] **Step 6: Typecheck, build, visual check, commit.**

```bash
git add src/pages/About.tsx
git commit -m "feat: About rewritten around build principles, studio framing removed"
```

---

### Task 5: Shell chrome copy (`Shell.tsx`)

**Files:**
- Modify: `src/components/Shell.tsx`

- [ ] **Step 1: Replace the footer strapline** (line ~233): `A small independent UK studio building focused, local-first software.` becomes:

```
Focused, local-first software for clinicians, researchers and writers.
```

- [ ] **Step 2: Rename the footer "Studio" column heading to `Site`** (line ~262). Links inside (Home, About, Contact) stay.

- [ ] **Step 3: Grep the whole of `src/` for leftovers.** Run: `grep -rn -i "small studio\|independent UK studio\|small on purpose\|one small" src/`. Expected: no matches in copy (comments must also be cleaned where they describe removed copy).

- [ ] **Step 4: Typecheck, build, commit.**

```bash
git add src/components/Shell.tsx
git commit -m "feat: footer copy product-led"
```

---

### Task 6: Flagship demos (ResearchAssistant, ClinicalPROMs, Chapbook)

**Files:**
- Modify: `src/components/demos/ResearchAssistantDemo.tsx` (full replace)
- Modify: `src/components/demos/ClinicalPROMsDemo.tsx` (full replace)
- Modify: `src/components/demos/ChapbookDemo.tsx` (full replace)

**Interfaces:**
- Consumes: framer-motion, Tailwind tokens. Each component keeps its existing exported name so `products.ts` imports are untouched.
- Produces: same-name components. Constraints every demo must keep: root element `aria-hidden="true"`, compact horizontal composition that reads at `h-14` card size AND scaled up on the AppPage stage, `useReducedMotion()` respected (`initial={reduce ? false : ...}`), `whileInView` + `viewport={{ once: true, amount: 0.6 }}`, only theme tokens (`bg-accent`, `bg-accentWarm`, `bg-ink/25`, `text-accent/60`, `border-hairline`).

- [ ] **Step 1: Replace `ResearchAssistantDemo.tsx`** (scattered evidence condenses into a cited manuscript line — the product's real job, replacing the wrong search-and-summarise motif):

```tsx
import { motion, useReducedMotion } from 'framer-motion'

/**
 * ResearchAssistant: scattered evidence (a loose cluster of source dots)
 * condenses into manuscript lines that write themselves, finished by a tiny
 * citation chip. Evidence in, cited draft out. Abstract, no real text.
 */
const DOTS = [
  { x: 0, y: -10 },
  { x: 12, y: 4 },
  { x: 2, y: 12 },
  { x: -10, y: 2 },
  { x: -4, y: -2 },
]
const LINES = ['100%', '92%', '58%']

export function ResearchAssistantDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      {/* Evidence cluster */}
      <div className="relative h-9 w-9 flex-none">
        {DOTS.map((d, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-accent/80"
            style={{ marginLeft: d.x, marginTop: d.y }}
            initial={reduce ? false : { opacity: 0, scale: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce ? undefined : { duration: 0.35, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </div>

      <span className="flex-none text-accent/60">&rarr;</span>

      {/* Manuscript lines writing themselves */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {LINES.map((w, i) => (
          <motion.span
            key={i}
            className="block h-1.5 rounded-full bg-ink/25"
            style={{ width: w, transformOrigin: 'left' }}
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce
                ? undefined
                : { duration: 0.45, delay: 0.5 + i * 0.16, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </div>

      {/* Citation chip: the claim is grounded */}
      <motion.span
        className="flex-none rounded-md border border-accent/40 bg-accent/10 px-1.5 py-0.5 font-mono text-[0.55rem] font-medium text-accent"
        initial={reduce ? false : { opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? undefined : { duration: 0.4, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
      >
        [1]
      </motion.span>
    </div>
  )
}
```

- [ ] **Step 2: Replace `ClinicalPROMsDemo.tsx`** (an outcome trajectory rising across follow-up and crossing a dashed MCID line — the product's headline claim, replacing the static gauge):

```tsx
import { motion, useReducedMotion } from 'framer-motion'

/**
 * ClinicalPROMs: a recovery trajectory draws itself across follow-up
 * timepoints and crosses a dashed reference line (the MCID), the moment a
 * score change becomes clinically meaningful. Abstract, no real data.
 */
const POINTS = [
  { x: 8, y: 44 },
  { x: 42, y: 38 },
  { x: 78, y: 24 },
  { x: 112, y: 10 },
]

export function ClinicalPROMsDemo() {
  const reduce = useReducedMotion()
  const path = `M ${POINTS.map((p) => `${p.x} ${p.y}`).join(' L ')}`

  return (
    <div className="w-full max-w-[10rem]" aria-hidden="true">
      <svg viewBox="0 0 120 52" fill="none" className="block w-full">
        {/* Dashed MCID reference line */}
        <motion.line
          x1="4"
          y1="20"
          x2="116"
          y2="20"
          stroke="#f4b05a"
          strokeOpacity="0.55"
          strokeWidth="1.4"
          strokeDasharray="4 4"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 0.4 }}
        />
        {/* Trajectory */}
        <motion.path
          d={path}
          stroke="#45d5f2"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 1.1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
        {/* Follow-up timepoints */}
        {POINTS.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="2.6"
            fill="#45d5f2"
            initial={reduce ? false : { opacity: 0, scale: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce ? undefined : { duration: 0.3, delay: 0.3 + i * 0.26, ease: [0.16, 1, 0.3, 1] }
          }
          />
        ))}
      </svg>
    </div>
  )
}
```

- [ ] **Step 3: Replace `ChapbookDemo.tsx`** (chat bubbles are sent and become a published post — the chat-to-your-own-blog flow):

```tsx
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Chapbook: two chat bubbles are typed and sent, then resolve into a post
 * card with a warm "live on your own site" mark (chat in, post live).
 * Abstract, no real text.
 */
export function ChapbookDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      {/* Chat bubbles */}
      <div className="flex w-16 flex-none flex-col items-end gap-1.5">
        {(['100%', '70%'] as const).map((w, i) => (
          <motion.span
            key={i}
            className="block h-3 rounded-lg rounded-br-sm bg-accent/25"
            style={{ width: w, transformOrigin: 'right' }}
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce
                ? undefined
                : { duration: 0.4, delay: i * 0.22, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </div>

      <span className="flex-none text-accent/60">&rarr;</span>

      {/* The published post card */}
      <motion.div
        className="min-w-0 flex-1 rounded-lg border border-hairline bg-ink/10 p-2"
        initial={reduce ? false : { opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? undefined : { duration: 0.45, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="block h-1.5 w-3/4 rounded-full bg-ink/40" />
        <span className="mt-1.5 block h-1 w-full rounded-full bg-ink/25" />
        <span className="mt-1 block h-1 w-2/3 rounded-full bg-ink/25" />
      </motion.div>

      {/* Live on your own site */}
      <motion.span
        className="h-2.5 w-2.5 flex-none rounded-full bg-accentWarm"
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? undefined : { duration: 0.4, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
```

- [ ] **Step 4: Typecheck, build, visual check.** `npm run typecheck && npm run build`; in dev check the home cards AND each flagship project page (demo scaled on the stage): nothing clipped, reads at both sizes, reduced-motion (macOS: System Settings, Accessibility, Display, Reduce motion) shows the final state immediately.

- [ ] **Step 5: Commit.**

```bash
git add src/components/demos/ResearchAssistantDemo.tsx src/components/demos/ClinicalPROMsDemo.tsx src/components/demos/ChapbookDemo.tsx
git commit -m "feat: flagship demos show the real differentiators"
```

---

### Task 7: Ortho demos (OrthoPortfolio, OrthoConsultantPrep)

**Files:**
- Modify: `src/components/demos/OrthoPortfolioDemo.tsx` (full replace)
- Modify: `src/components/demos/OrthoConsultantPrepDemo.tsx` (full replace)

Same constraints as Task 6.

- [ ] **Step 1: Replace `OrthoPortfolioDemo.tsx`** (scattered documents file themselves into labelled section slots — evidence in, submission-ready sections out):

```tsx
import { motion, useReducedMotion } from 'framer-motion'

/**
 * OrthoPortfolio: a scatter of loose documents files itself into a neat
 * grid of section slots, and a readiness tick lands. Evidence in,
 * submission-ready sections out. Abstract, no real data.
 */
const DOCS = [-8, 0, 8]

export function OrthoPortfolioDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      {/* Loose documents, slightly fanned */}
      <div className="relative h-10 w-9 flex-none">
        {DOCS.map((r, i) => (
          <motion.span
            key={i}
            className="absolute inset-x-1 top-1 block h-8 rounded-[3px] border border-hairline bg-ink/15"
            style={{ rotate: r }}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce ? undefined : { duration: 0.35, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </div>

      <span className="flex-none text-accent/60">&rarr;</span>

      {/* Section slots filling */}
      <div className="grid flex-1 grid-cols-2 gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="block h-4 rounded-[4px] border border-accent/30 bg-accent/15"
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce
                ? undefined
                : { duration: 0.3, delay: 0.45 + i * 0.12, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </div>

      {/* Readiness tick */}
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="flex-none"
        initial={reduce ? false : { opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? undefined : { duration: 0.35, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <path
          d="m3 8.5 3.2 3L13 5"
          stroke="#f4b05a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  )
}
```

- [ ] **Step 2: Replace `OrthoConsultantPrepDemo.tsx`** (a question card on a live interview clock, ticking toward the urgency colour):

```tsx
import { motion, useReducedMotion } from 'framer-motion'

/**
 * OrthoConsultantPrep: a question line sits on a live interview clock; the
 * ring runs down and shifts to the urgency colour, the way the real timed
 * mock does. Abstract, no real text.
 */
export function OrthoConsultantPrepDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      {/* Interview clock */}
      <div className="relative h-10 w-10 flex-none">
        <svg viewBox="0 0 40 40" fill="none" className="h-full w-full -rotate-90">
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" />
          <motion.circle
            cx="20"
            cy="20"
            r="16"
            strokeWidth="3"
            strokeLinecap="round"
            initial={reduce ? { pathLength: 0.3, stroke: '#f4b05a' } : { pathLength: 1, stroke: '#45d5f2' }}
            whileInView={
              reduce ? {} : { pathLength: 0.3, stroke: ['#45d5f2', '#45d5f2', '#f4b05a'] }
            }
            viewport={{ once: true, amount: 0.6 }}
            transition={reduce ? undefined : { duration: 2.2, delay: 0.3, ease: 'linear' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.5rem] font-medium text-ink">
          3:00
        </span>
      </div>

      {/* Question card */}
      <motion.div
        className="min-w-0 flex-1 rounded-lg border border-hairline bg-ink/10 p-2"
        initial={reduce ? false : { opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? undefined : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="block h-1.5 w-5/6 rounded-full bg-ink/40" />
        <span className="mt-1.5 block h-1 w-full rounded-full bg-ink/25" />
        <span className="mt-1 block h-1 w-1/2 rounded-full bg-ink/25" />
      </motion.div>
    </div>
  )
}
```

- [ ] **Step 3: Typecheck, build, visual check both cards + both project pages, commit.**

```bash
git add src/components/demos/OrthoPortfolioDemo.tsx src/components/demos/OrthoConsultantPrepDemo.tsx
git commit -m "feat: ortho demos show filing-to-ready and the interview clock"
```

---

### Task 8: Writing-tool demos (AudioQuill, Scribble)

**Files:**
- Modify: `src/components/demos/AudioQuillDemo.tsx` (full replace)
- Modify: `src/components/demos/ScribbleDemo.tsx` (full replace)

Same constraints as Task 6.

- [ ] **Step 1: Replace `AudioQuillDemo.tsx`** (a spoken waveform becomes structured writing: a bright heading bar then tidy lines, not just raw text):

```tsx
import { motion, useReducedMotion } from 'framer-motion'

/**
 * AudioQuill: a burst of speech (waveform bars) becomes structured writing,
 * a heading bar then tidy body lines, the clean-and-structure step that
 * plain dictation lacks. Abstract, no real text.
 */
const WAVE = [10, 22, 14, 26, 12, 18]

export function AudioQuillDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      {/* Spoken waveform */}
      <div className="flex h-8 flex-none items-center gap-[3px]">
        {WAVE.map((h, i) => (
          <motion.span
            key={i}
            className="block w-[3px] rounded-full bg-accent/70"
            style={{ height: h }}
            initial={reduce ? false : { scaleY: 0.2, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce ? undefined : { duration: 0.3, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </div>

      <span className="flex-none text-accent/60">&rarr;</span>

      {/* Structured writing: heading, then body */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <motion.span
          className="block h-2 w-1/2 rounded-full bg-ink/40"
          style={{ transformOrigin: 'left' }}
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 0.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />
        {(['100%', '78%'] as const).map((w, i) => (
          <motion.span
            key={i}
            className="block h-1.5 rounded-full bg-ink/25"
            style={{ width: w, transformOrigin: 'left' }}
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce
                ? undefined
                : { duration: 0.45, delay: 0.75 + i * 0.16, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Replace `ScribbleDemo.tsx`** (typed blocks assemble into a note, with an on-device pulse — kills the misleading handwriting squiggle):

```tsx
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Scribble: a note assembles from typed blocks (heading, text, a sticker
 * tile) and an on-device pulse settles beside it: block editor, nothing
 * leaving the device. Replaces the old pen-stroke squiggle, which wrongly
 * implied handwriting. Abstract, no real text.
 */
export function ScribbleDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      {/* The note, block by block */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <motion.span
          className="block h-2 w-2/3 rounded-full bg-ink/40"
          style={{ transformOrigin: 'left' }}
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="flex items-center gap-1.5">
          <motion.span
            className="block h-1.5 flex-1 rounded-full bg-ink/25"
            style={{ transformOrigin: 'left' }}
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={reduce ? undefined : { duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Sticker tile */}
          <motion.span
            className="block h-4 w-4 flex-none rounded-[4px] border border-accentWarm/50 bg-accentWarm/25"
            initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: -12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={reduce ? undefined : { duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <motion.span
          className="block h-1.5 w-1/2 rounded-full bg-ink/25"
          style={{ transformOrigin: 'left' }}
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 0.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* On-device pulse: a dot held inside its ring */}
      <div className="relative h-6 w-6 flex-none">
        <motion.span
          className="absolute inset-0 rounded-full border border-accent/40"
          initial={reduce ? false : { opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 0.45, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.span
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          initial={reduce ? false : { opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 0.35, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Typecheck, build, visual check both cards + pages, commit.**

```bash
git add src/components/demos/AudioQuillDemo.tsx src/components/demos/ScribbleDemo.tsx
git commit -m "feat: audioquill structure demo; scribble typed-blocks demo replaces squiggle"
```

---

### Task 9: ResearchAssistant showcase band (WorkflowReel port + walkthroughs)

**Files:**
- Create: `src/components/showcase/WorkflowReel.tsx` (ported from the RA repo)
- Create: `src/components/showcase/ResearchAssistantShowcase.tsx`
- Create: `public/walkthroughs/meta-analysis.html` + `public/walkthroughs/systematic-review.html` (copied from the RA repo)
- Modify: `src/pages/AppPage.tsx` (render optional `product.Showcase` band)
- Modify: `src/data/products.ts` (wire `Showcase` onto the ResearchAssistant entry)

**Interfaces:**
- Consumes: `Product.Showcase?: ComponentType` (declared in Task 1).
- Produces: `ResearchAssistantShowcase` (default-less named export) rendered as a full-width band on /researchassistant only.

- [ ] **Step 1: Copy the source assets:**

```bash
mkdir -p src/components/showcase public/walkthroughs
cp "/Users/inayatsmac/Desktop/Transferred to new mac/Research-assistant/apps/site/src/components/WorkflowReel.tsx" src/components/showcase/WorkflowReel.tsx
cp "/Users/inayatsmac/Desktop/Transferred to new mac/Research-assistant/apps/site/public/walkthroughs/meta-analysis-walkthrough.html" public/walkthroughs/meta-analysis.html
cp "/Users/inayatsmac/Desktop/Transferred to new mac/Research-assistant/apps/site/public/walkthroughs/systematic-review-from-scratch.html" public/walkthroughs/systematic-review.html
```

- [ ] **Step 2: Make the ported reel compile here.** Open `src/components/showcase/WorkflowReel.tsx`. Prior audit found it self-contained (all animation in an inline `REEL_CSS` keyframes string; the only external import is `useReducedMotion` from framer-motion; no Tailwind dependency, no app imports). Verify and fix exactly and only: (a) remove/replace any import that does not resolve in this repo (if it imports from `@/lib/...` or `react-router-dom`, strip the usage — the audit says it does not, but verify); (b) keep its named export `WorkflowReel`. Run `npm run typecheck` to confirm.

- [ ] **Step 3: Create `src/components/showcase/ResearchAssistantShowcase.tsx`:**

```tsx
import { WorkflowReel } from './WorkflowReel'

/*
 * ResearchAssistantShowcase — the flagship band on /researchassistant.
 * Reuses the product's own assets rather than re-inventing them: the
 * "Watch it work" reel ported from researchassistant.rqai.co.uk, and two of
 * its self-contained walkthrough tours (single-file HTML, no external
 * requests) served from /walkthroughs/. The reel was designed on a light
 * canvas, so it sits in a light panel inside the dark page.
 */
const TOURS = [
  {
    href: '/walkthroughs/systematic-review.html',
    title: 'A systematic review, from scratch',
    blurb: 'PICO to search to screening to synthesis to write-up, in one guided tour.',
  },
  {
    href: '/walkthroughs/meta-analysis.html',
    title: 'Meta-analysis walkthrough',
    blurb: 'Pooled effects, heterogeneity, sensitivity and GRADE, with a real worked example.',
  },
]

export function ResearchAssistantShowcase() {
  return (
    <div>
      <h2 className="reveal text-2xl leading-tight md:text-3xl">Watch it work</h2>
      <p className="reveal mt-3 max-w-[52ch] leading-relaxed text-ink">
        The same animated workflow shown on researchassistant.rqai.co.uk:
        highlight, compile, analyse and write, step by step.
      </p>
      <div className="reveal mt-8 overflow-hidden rounded-2xl border border-hairline bg-[#f8fafc] p-4 md:p-6">
        <WorkflowReel />
      </div>

      <h3 className="reveal mt-12 text-xl leading-tight md:text-2xl">
        Sixty-second tours
      </h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {TOURS.map((tour) => (
          <a
            key={tour.href}
            href={tour.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group reveal flex h-full flex-col rounded-2xl border border-hairline bg-card p-6 transition-colors duration-300 ease-out-soft hover:border-accent/50"
          >
            <h4 className="font-display text-lg font-semibold text-inkStrong">
              {tour.title}
            </h4>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-inkMuted">{tour.blurb}</p>
            <span className="mt-4 text-sm font-medium text-ink transition-colors duration-300 group-hover:text-accent">
              Open the tour
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Render the band in `AppPage.tsx`.** After the Features `</section>` and before the "Where to find it" section, insert:

```tsx
{product.Showcase && (
  <section className="container-edge py-8 md:py-12">
    <product.Showcase />
  </section>
)}
```

(If TSX complains about lowercase member expressions, alias first: `const Showcase = product.Showcase` near the other destructuring, then `{Showcase && (<section className="container-edge py-8 md:py-12"><Showcase /></section>)}`.)

- [ ] **Step 5: Wire it in `src/data/products.ts`:** add `import { ResearchAssistantShowcase } from '../components/showcase/ResearchAssistantShowcase'` and `Showcase: ResearchAssistantShowcase,` on the ResearchAssistant entry.

- [ ] **Step 6: Typecheck, build, visual check.** `npm run typecheck && npm run build`. In dev on /researchassistant: the reel plays in its light panel (check reduced-motion shows its static final frame), both tour links open the local walkthrough HTMLs in a new tab and the tours are fully interactive offline. Confirm `dist/walkthroughs/meta-analysis.html` exists after build.

- [ ] **Step 7: Commit.**

```bash
git add src/components/showcase public/walkthroughs src/pages/AppPage.tsx src/data/products.ts
git commit -m "feat: RA showcase band reusing spoke reel and walkthrough tours"
```

---

### Task 10: Canonicals, OG image and social meta

**Files:**
- Create: `scripts/og-template.html`
- Create: `public/og.png` (1200x630 screenshot of the template)
- Modify: `src/pages/Home.tsx`, `src/pages/About.tsx`, `src/pages/AppPage.tsx` (Head blocks only)

This clears the deferred ledger items: canonical/og:url trailing slash and the missing og:image.

- [ ] **Step 1: Create `scripts/og-template.html`** (the OG card: dark-blue canvas, wordmark, one line, constellation dots):

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #0c1a3a;
    font-family: "Avenir Next", "Segoe UI", -apple-system, sans-serif;
    color: #eef3ff; position: relative;
    display: flex; flex-direction: column; justify-content: center;
    padding: 0 96px;
  }
  .glow {
    position: absolute; right: -160px; top: -220px; width: 720px; height: 640px;
    background: radial-gradient(closest-side, rgba(69,213,242,0.22), transparent 70%);
  }
  .mark { font-size: 44px; font-weight: 700; letter-spacing: 0.14em; }
  h1 { margin-top: 28px; font-size: 76px; font-weight: 650; line-height: 1.06; max-width: 18ch; }
  p { margin-top: 26px; font-size: 30px; color: #9fb2d9; }
  svg { position: absolute; right: 84px; bottom: 72px; }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="mark">RQAI</div>
  <h1>Software that does one job well.</h1>
  <p>Local-first projects for clinicians, researchers and writers.</p>
  <svg width="300" height="120" viewBox="0 0 300 120" fill="none">
    <path d="M20 90 L90 40 L160 70 L230 22 L280 58" stroke="#45d5f2" stroke-opacity="0.7" stroke-width="2"/>
    <circle cx="20" cy="90" r="5" fill="#45d5f2"/>
    <circle cx="90" cy="40" r="5" fill="#45d5f2"/>
    <circle cx="160" cy="70" r="5" fill="#45d5f2"/>
    <circle cx="230" cy="22" r="5" fill="#f4b05a"/>
    <circle cx="280" cy="58" r="5" fill="#45d5f2"/>
  </svg>
</body>
</html>
```

- [ ] **Step 2: Produce `public/og.png`.** Open `scripts/og-template.html` in a browser sized to exactly 1200x630 and screenshot it to `public/og.png`. Preferred: the Playwright or chrome-devtools MCP browser (set viewport 1200x630, `file://` URL, full-page screenshot, save). CLI fallback if Chrome is present: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --screenshot="$(pwd)/public/og.png" --window-size=1200,630 "file://$(pwd)/scripts/og-template.html"`. Verify the file is a 1200x630 PNG: `file public/og.png`.

- [ ] **Step 3: Home.tsx Head additions** (inside the existing `<Head>`):

```tsx
<link rel="canonical" href="https://rqai.co.uk/" />
<meta property="og:image" content="https://rqai.co.uk/og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://rqai.co.uk/og.png" />
```

Also delete the now-duplicated `<meta name="twitter:card" content="summary" />` line.

- [ ] **Step 4: About.tsx Head additions:** same block as Step 3 but `<link rel="canonical" href="https://rqai.co.uk/about/" />`, and change its `og:url` to `https://rqai.co.uk/about/` (trailing slash, matching the served directory URL).

- [ ] **Step 5: AppPage.tsx Head changes:** change `og:url` to `` `https://rqai.co.uk/${product.slug}/` `` (trailing slash) and add:

```tsx
<link rel="canonical" href={`https://rqai.co.uk/${product.slug}/`} />
<meta property="og:image" content="https://rqai.co.uk/og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:image" content="https://rqai.co.uk/og.png" />
```

and change `twitter:card` to `summary_large_image`.

- [ ] **Step 6: Build and verify.** `npm run typecheck && npm run build`, then `grep -l 'rel="canonical"' dist/index.html dist/about/index.html dist/researchassistant/index.html` (all three must match) and confirm `dist/og.png` exists.

- [ ] **Step 7: Commit.**

```bash
git add scripts/og-template.html public/og.png src/pages/Home.tsx src/pages/About.tsx src/pages/AppPage.tsx
git commit -m "feat: canonicals, og image and large social cards"
```

---

### Task 11: JSON-LD structured data

**Files:**
- Modify: `src/pages/AppPage.tsx` (SoftwareApplication per project page)
- Modify: `src/pages/Home.tsx` (Organization + ItemList)

**Interfaces:**
- Consumes: `Product.category`, `Product.platforms`, `Product.offer` (Task 1).

- [ ] **Step 1: AppPage.** Above the `return`, build the object:

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name,
  url,
  description: metaDescription,
  applicationCategory: product.category,
  operatingSystem: product.platforms,
  ...(product.offer
    ? {
        offers: {
          '@type': 'Offer',
          price: product.offer.price,
          priceCurrency: product.offer.currency,
        },
      }
    : {}),
  publisher: { '@type': 'Organization', name: 'RQAI', url: 'https://rqai.co.uk/' },
}
```

Inside `<Head>` add:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

- [ ] **Step 2: Home.** Add above the return:

```tsx
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RQAI',
  url: 'https://rqai.co.uk/',
  email: 'hello@rqai.co.uk',
  description:
    'Focused, local-first software for clinicians, researchers and writers.',
}
```

and the same `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />` inside `<Head>`.

- [ ] **Step 3: Build and verify emission.** `npm run build`, then `grep -o 'application/ld+json' dist/researchassistant/index.html dist/index.html` (both match) and validate one page's JSON by pasting the script body into `node -e "JSON.parse(process.argv[1])" '<paste>'` or the schema.org validator later.

- [ ] **Step 4: Commit.**

```bash
git add src/pages/AppPage.tsx src/pages/Home.tsx
git commit -m "feat: SoftwareApplication and Organization JSON-LD"
```

---

### Task 12: llms.txt, sitemap, robots, NotFound noindex

**Files:**
- Create: `public/llms.txt`
- Modify: `public/sitemap.xml` (full replace)
- Modify: `public/robots.txt` (full replace)
- Modify: `src/pages/NotFound.tsx` (add noindex Head)

- [ ] **Step 1: Create `public/llms.txt` with exactly this content:**

```
# RQAI

> RQAI (rqai.co.uk) makes focused, local-first software for clinicians,
> researchers and writers. Each project does one job, keeps data on the
> user's own device or hardware, and has no accounts and no tracking.
> Contact: hello@rqai.co.uk

## Projects

- [ResearchAssistant](https://rqai.co.uk/researchassistant/): a local-first
  clinical research workbench for Mac, Windows and Linux. Carries a study
  from question to submitted manuscript: PubMed-wired library, guided
  systematic reviews (offline MeSH search builder, dual screening with live
  Cohen's kappa, risk of bias, meta-analysis, GRADE), 52 statistical tests
  validated value for value against R, strict AI drafting that grounds every
  claim to a sentence in the user's library, offline AI via Ollama, and
  one-click submission packets. $60 a year. Full site:
  https://researchassistant.rqai.co.uk
- [ClinicalPROMs](https://rqai.co.uk/clinicalproms/): self-hosted software
  (also known as Ortho Outcomes) for collecting and tracking validated
  patient-reported outcome measures in orthopaedics. Twenty validated
  instruments scored exactly as published with MCID thresholds, photo
  capture of theatre lists, end-to-end encrypted patient questionnaires,
  outcome trajectories over time. Runs on the surgeon's own Mac or Windows
  PC; one licence, no per-seat fees. Full site:
  https://clinicalproms.rqai.co.uk
- [Chapbook](https://rqai.co.uk/chapbook/): write a blog from a phone in a
  chat-style composer, with photos, video embeds, 75 interactive widgets and
  six themes; posts commit to the user's own repository and deploy to their
  own domain. No platform holds the content. App:
  https://chapbook.rqai.co.uk
- [OrthoPortfolio](https://rqai.co.uk/orthoportfolio/): compiles a
  submission-ready GMC Portfolio Pathway application for Trauma and
  Orthopaedics: redaction with PII detection and verification, automatic
  filing against the T&O requirements, indexed section bundles, readiness
  dashboard. £49 a year. App: https://topp.rqai.co.uk
- [OrthoConsultantPrep](https://rqai.co.uk/consultantprep/): preparation for
  the UK T&O consultant interview: 237 questions with model answers, timed
  three-minute mock interviews, Trust Prep matched to 20 real trust
  profiles. £49 one-off. App: https://consultantprep.rqai.co.uk
- [AudioQuill](https://rqai.co.uk/audioquill/): a voice-to-writing studio
  with on-device Whisper transcription, non-destructive AI cleanup over a
  preserved raw transcript, 44 templates and 49 voice commands. £30 a year.
  App: https://audioquill.rqai.co.uk
- [Scribble](https://rqai.co.uk/scribble/): a private, on-device notebook of
  typed blocks with stickers, figures and interactive playgrounds; optional
  bring-your-own-key AI; publishing and sync through the user's own
  repositories. App: https://scribble.rqai.co.uk

## About

- [How these projects are built](https://rqai.co.uk/about/): one job done
  well, local-first, no accounts, no tracking, nothing claimed that is not
  built.
```

- [ ] **Step 2: Replace `public/sitemap.xml`:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://rqai.co.uk/</loc><lastmod>2026-07-10</lastmod></url>
  <url><loc>https://rqai.co.uk/researchassistant/</loc><lastmod>2026-07-10</lastmod></url>
  <url><loc>https://rqai.co.uk/clinicalproms/</loc><lastmod>2026-07-10</lastmod></url>
  <url><loc>https://rqai.co.uk/chapbook/</loc><lastmod>2026-07-10</lastmod></url>
  <url><loc>https://rqai.co.uk/orthoportfolio/</loc><lastmod>2026-07-10</lastmod></url>
  <url><loc>https://rqai.co.uk/consultantprep/</loc><lastmod>2026-07-10</lastmod></url>
  <url><loc>https://rqai.co.uk/audioquill/</loc><lastmod>2026-07-10</lastmod></url>
  <url><loc>https://rqai.co.uk/scribble/</loc><lastmod>2026-07-10</lastmod></url>
  <url><loc>https://rqai.co.uk/about/</loc><lastmod>2026-07-10</lastmod></url>
</urlset>
```

- [ ] **Step 3: Replace `public/robots.txt`:**

```
User-agent: *
Allow: /

Sitemap: https://rqai.co.uk/sitemap.xml
```

- [ ] **Step 4: NotFound noindex.** In `src/pages/NotFound.tsx`, add `import { Head } from 'vite-react-ssg'` (if absent) and, at the top of the returned JSX:

```tsx
<Head>
  <title>Page not found: RQAI</title>
  <meta name="robots" content="noindex" />
</Head>
```

- [ ] **Step 5: Build and verify.** `npm run build`; confirm `dist/llms.txt`, `dist/sitemap.xml`, `dist/robots.txt` exist with the new content and `dist/404/index.html` contains `noindex`.

- [ ] **Step 6: Commit.**

```bash
git add public/llms.txt public/sitemap.xml public/robots.txt src/pages/NotFound.tsx
git commit -m "feat: llms.txt, refreshed sitemap, robots, noindex 404"
```

---

### Task 13: SEO runbook + final QA sweep

**Files:**
- Create: `docs/SEO-RUNBOOK.md`

- [ ] **Step 1: Create `docs/SEO-RUNBOOK.md`:**

```markdown
# SEO & visibility runbook (rqai.co.uk)

## One-time, owner (after deploy)
1. **Google Search Console**: add property `rqai.co.uk` (Domain property;
   verify by DNS TXT record in the Hostinger DNS panel). Then Sitemaps ->
   submit `https://rqai.co.uk/sitemap.xml`. Use URL Inspection -> Request
   indexing for the home page and the three flagship pages.
2. **Bing Webmaster Tools**: import the verified Search Console property
   (one click; covers Bing + DuckDuckGo + ChatGPT browsing).
3. **Analytics decision**: GA4 conflicts with the no-tracking stance.
   Recommended: Plausible (paid, EU) or GoatCounter (free) as a single
   cookieless script, or none at all and rely on Search Console. If one is
   added, add its script tag in `index.html` and disclose it on /about.

## Baseline (record once, compare monthly)
- `npx lighthouse https://rqai.co.uk --output=json --output-path=docs/lighthouse-baseline.json`
- Search Console -> Performance: export queries/impressions once indexed.

## Monthly 15-minute ritual
1. Search Console: Performance (queries, pages), Coverage (errors), and
   any manual actions.
2. `npm run check-links` (project URLs still answering).
3. Spot-check one flagship page in an AI answer engine (ask ChatGPT/Claude
   "what is ResearchAssistant by RQAI?") and note wrong claims to fix at
   the source.

## Go-live checklist (commerce, tracked outside this site)
- Swap ALL test Stripe links to live (all seven projects; see rqai-sales/LINKS.md).
- ClinicalPROMs: set the real annual price, fix the spoke pricing page
  (still shows the stale GBP 49 lifetime in Terms and GBP 200 mock on the
  pricing page), then add the price here in products.ts.
- ResearchAssistant: create the LemonSqueezy product (buy link is a
  placeholder slug), add `research` to PRODUCT_URLS in
  helm/scripts/fulfil-sales.mjs (buyers currently get a key with no
  download link), and remove the four "open source" claims on the spoke
  site (AccordionSection.tsx, TrustStrip.tsx, data/marketing.ts:62,
  PricingPage.tsx:89).
- Scribble: confirm the GBP 29/yr app price, then add it to products.ts.
- Chapbook: confirm the price, then add it to products.ts.
- Helm: set RESEND_API_KEY so licence emails send automatically.
```

- [ ] **Step 2: Banned-phrase sweep.** Run and expect ZERO matches in copy:

```bash
grep -rn -i "small studio\|independent UK studio\|small on purpose\|online-only\|still in development\|fixed, considered voice\|verification proformas\|open source" src/ public/llms.txt
```

(One allowed exception: nothing. If a match is a code comment, reword it.)

- [ ] **Step 3: Em-dash sweep of visible copy.** Run `grep -rn "—\|–" src/data/products.ts src/pages src/components public/llms.txt` and fix any hit that is inside a UI string (comments are fine but prefer clean).

- [ ] **Step 4: Full verification.** Run: `npm run check-links && npm run typecheck && npm run build && npm run preview`. Browse all nine pages plus /404 on the preview server. Confirm: new copy everywhere, flagship grid weighting, all seven demos animate and respect reduced motion, RA showcase reel + tours work, prices shown only for RA/TOPP/ConsultantPrep/AudioQuill.

- [ ] **Step 5: Commit.**

```bash
git add docs/SEO-RUNBOOK.md
git commit -m "docs: SEO runbook, go-live checklist; final QA sweep"
```

---

## Self-Review (completed at authoring)

- **Spec coverage:** §2 positioning -> Tasks 3/4/5; §3 home -> Tasks 1/2/3; §4 hub-and-spoke -> Task 1 (descriptions link out) + Task 9 (RA band); §5 per-product copy -> Task 1; §6 demos -> Tasks 6/7/8 + 9; §7 visibility -> Tasks 10/11/12 (llms.txt, JSON-LD, canonical/OG, sitemap, robots, noindex 404); §8 measurement -> Task 13 runbook; §9/§10 out-of-scope + owner inputs -> Task 13 go-live checklist. Image-compression item: the only new raster is og.png (single, small); existing site ships no other large images, so no separate task.
- **Placeholders:** none; every code step carries full content. Task 9 Step 2 is a verify-and-fix step by design (port), with the audit's expected state stated.
- **Type consistency:** `flagship`/`hook`/`category`/`platforms`/`offer`/`Showcase` are declared once in Task 1 and consumed with identical names in Tasks 2, 9, 11. `Slug` union unchanged, so `liveness.json` keys stay valid. `LG_SPAN` length (7) matches PRODUCTS length (7); rows sum to 6 (3+3, 4+2, 2+2+2).

## Execution note

Execute with superpowers:subagent-driven-development: one fresh subagent per task (Opus), orchestrator reviews the diff between tasks. NEVER push; the owner reviews the built site locally first.
