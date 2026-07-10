import type { ComponentType } from 'react'
import liveness from './liveness.json'
import { AudioQuillDemo } from '../components/demos/AudioQuillDemo'
import { ChapbookDemo } from '../components/demos/ChapbookDemo'
import { ClinicalPROMsDemo } from '../components/demos/ClinicalPROMsDemo'
import { OrthoConsultantPrepDemo } from '../components/demos/OrthoConsultantPrepDemo'
import { OrthoPortfolioDemo } from '../components/demos/OrthoPortfolioDemo'
import { ResearchAssistantDemo } from '../components/demos/ResearchAssistantDemo'
import { ScribbleDemo } from '../components/demos/ScribbleDemo'
import { ResearchAssistantShowcase } from '../components/showcase/ResearchAssistantShowcase'
import { ResearchAssistantHero } from '../components/heroes/ResearchAssistantHero'
import { ClinicalPROMsHero } from '../components/heroes/ClinicalPROMsHero'
import { OrthoConsultantPrepHero } from '../components/heroes/OrthoConsultantPrepHero'
import { ChapbookHero } from '../components/heroes/ChapbookHero'
import { OrthoPortfolioHero } from '../components/heroes/OrthoPortfolioHero'
import { AudioQuillHero } from '../components/heroes/AudioQuillHero'
import { ScribbleHero } from '../components/heroes/ScribbleHero'

/**
 * The single source of truth for the seven RQAI projects.
 *
 * Copy is factual and verifiable against each product's own repo (README /
 * spec / marketing copy) — never exaggerated, British spelling, and the
 * products are called "projects" in the UI, never "apps". Each description
 * leads with what the project actually does across its real features, names a
 * single audience, and keeps the privacy/local note as a closing line rather
 * than the pitch. `price` is present only where a specific amount is confirmed
 * in the product's own source.
 *
 * `url` is the intended final URL from the global constraints, used regardless
 * of current reachability. `scripts/check-links.mjs` probes each URL at ship
 * time and writes liveness.json; `isLive()` reads it so the UI can downgrade an
 * unreachable project to a "coming soon" state without a code change.
 */
export type Slug =
  | 'researchassistant'
  | 'clinicalproms'
  | 'chapbook'
  | 'orthoportfolio'
  | 'consultantprep'
  | 'audioquill'
  | 'scribble'

/**
 * Optional spoke-site palette for a project whose external marketing site has
 * its own identity (ResearchAssistant, ClinicalPROMs). The project page adopts
 * it on the light hero panel (which mirrors the spoke's own light canvas) and,
 * where AA contrast holds on the dark hub canvas, on the page's CTA and accents,
 * so the hand-off to the external site reads as one continuous surface. Every
 * value here is drawn from the spoke's own Tailwind theme and is WCAG AA safe in
 * the context it is used (accent as text/CTA, panel colours against panelBg).
 */
export type ProductTheme = {
  /** AA-safe spoke accent: the page CTA fill and accent text on the light panel. */
  accent: string
  /** Ink that sits on `accent` (e.g. a CTA label). */
  accentInk: string
  /** Brighter spoke accent for the decorative feature dots on the dark hub page. */
  accentBright: string
  /** Light hero-panel background, adopting the spoke's own canvas. */
  panelBg: string
  /** Panel headings / strong text. */
  panelInk: string
  /** Panel secondary / muted text. */
  panelMuted: string
  /** Panel hairline / borders. */
  panelLine: string
  /** Faint accent-tint surface used for highlighted cards inside the panel. */
  panelTint: string
}

/** Props a hero scene may receive; the two spoke heroes consume `theme`. */
export type HeroSceneProps = { theme?: ProductTheme }

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
  /** Optional spoke-site palette; applied to the project page for those products only. */
  theme?: ProductTheme
  /** The animated micro-demo for this project (home card, and project page where no scene exists). */
  Demo: ComponentType
  /** An animated product scene framed as the project page hero. */
  HeroScene?: ComponentType<HeroSceneProps>
  /** Optional full-width showcase band on the project page. */
  Showcase?: ComponentType
}

export const PRODUCTS: Product[] = [
  {
    name: 'ResearchAssistant',
    slug: 'researchassistant',
    url: 'https://researchassistant.rqai.co.uk',
    tagline: 'Evidence, from search to submission.',
    hook: 'One desktop app that carries a study from question to submitted manuscript.',
    description:
      'For the clinician running a systematic review or writing up a study, ResearchAssistant is one desktop app that carries the whole project from question to submitted manuscript. Build a PubMed search from an offline MeSH index of 30,956 terms, screen with a live Cohen’s kappa, then run risk of bias, meta-analysis and GRADE. The statistics module has 52 tests validated value for value against R, and strict AI mode must ground every claim to a sentence in your library or say nothing. A simulated Reviewer 2 critiques the draft, and a one-click packet builds the submission zip. Your project stays in a database on your own Mac, Windows or Linux machine. Full walkthroughs and downloads are at researchassistant.rqai.co.uk.',
    features: [
      '52 statistical tests validated value for value against R, with the full comparison published, plus power and sample-size planning.',
      'A guided systematic review: an offline MeSH builder of 30,956 descriptors with live PubMed counts, dual screening with a live Cohen’s kappa, then risk of bias, meta-analysis and GRADE.',
      'Synthesis beyond the basics: individual-participant data pooling, network meta-analysis and survival meta-analysis, with forest and funnel plots.',
      'Strict AI drafting that grounds every claim to a sentence in your library, flags weak paraphrases and uncited paragraphs, then a simulated Reviewer 2 critiques the draft before you submit.',
      'Runs on your own Mac, Windows or Linux machine; AI can work fully offline through Ollama, and your phone, iPad and co-authors connect over your private Tailscale network.',
    ],
    price: '£99 a year',
    offer: { price: '99', currency: 'GBP', period: 'year' },
    category: 'Research software',
    platforms: 'macOS, Windows, Linux',
    flagship: true,
    whereLine:
      'ResearchAssistant is desktop software for Mac, Windows and Linux. Walkthroughs, documentation and downloads are at researchassistant.rqai.co.uk.',
    theme: {
      accent: '#2563eb',
      accentInk: '#ffffff',
      accentBright: '#3b82f6',
      panelBg: '#fafafa',
      panelInk: '#1e293b',
      panelMuted: '#475569',
      panelLine: '#e2e8f0',
      panelTint: '#eff6ff',
    },
    Demo: ResearchAssistantDemo,
    HeroScene: ResearchAssistantHero,
    Showcase: ResearchAssistantShowcase,
  },
  {
    name: 'ClinicalPROMs',
    slug: 'clinicalproms',
    url: 'https://clinicalproms.rqai.co.uk',
    tagline: 'Collect and track validated patient-reported outcomes.',
    hook: 'Twenty validated instruments, scored as published, on hardware you control.',
    description:
      'For the orthopaedic surgeon or department that wants to know how patients actually do after surgery, ClinicalPROMs (also known as Ortho Outcomes) collects and tracks validated patient-reported outcomes without a vendor cloud. Photograph a theatre or clinic list and it becomes structured cases with no retyping. Patients answer end-to-end encrypted questionnaires on their own phone, and the key never touches a server. Twenty validated instruments, from the Oxford scores to EQ-5D-5L, are scored exactly as published, each with the MCID thresholds and concern bands that make a change clinically meaningful, and every patient’s recovery plots as a trajectory over time. It runs on your own Mac or Windows PC with an embedded database: one licence, no per-seat fees. The full detail is at clinicalproms.rqai.co.uk.',
    features: [
      'Twenty validated instruments, from the Oxford scores to EQ-5D-5L, each scored exactly as published and checked by its own test.',
      'MCID thresholds and concern bands built in, so a score change reads as improvement met, not just a different number.',
      'Capture cases from a photograph of a theatre or clinic list; patients answer in any phone browser and their recovery plots as a trajectory over time.',
      'End-to-end encrypted patient links: answers are encrypted on the patient’s device and the key never reaches a server.',
      'Self-hosted on your own Mac or Windows PC with an embedded database, an audit log and data-rights tooling: one licence, unlimited patients.',
    ],
    price: '£199 a year',
    offer: { price: '199', currency: 'GBP', period: 'year' },
    category: 'Medical software',
    platforms: 'macOS, Windows',
    flagship: true,
    whereLine:
      'ClinicalPROMs is self-hosted software for your own Mac or Windows PC. Learn more and get it at clinicalproms.rqai.co.uk.',
    theme: {
      accent: '#0e7490',
      accentInk: '#ffffff',
      accentBright: '#22d3ee',
      panelBg: '#ffffff',
      panelInk: '#0c3a47',
      panelMuted: '#3f5b65',
      panelLine: '#d6eef5',
      panelTint: '#ecfeff',
    },
    Demo: ClinicalPROMsDemo,
    HeroScene: ClinicalPROMsHero,
  },
  {
    name: 'Chapbook',
    slug: 'chapbook',
    url: 'https://chapbook.rqai.co.uk',
    tagline: 'Write your blog from your phone.',
    hook: 'A chat-style composer that publishes to a blog you own.',
    description:
      'For the writer who wants to publish from a phone without renting an audience, Chapbook makes blogging as quick as sending a message. Type into a chat-style composer where each message becomes a paragraph, and edit any block by tapping it and carrying on the conversation. Drop in photos processed on your device, embed a video, or add one of 75 interactive widgets, and choose from six reading surfaces for how the blog looks. Publishing is a real commit to your own repository, deployed to your own site on your own domain, with no Chapbook server in between. An AI can draft in a voice it learns from your recent posts, and nothing posts without your say-so.',
    features: [
      'A chat-style composer: write a post the way you send messages, one paragraph at a time, and edit any block by chatting to it.',
      'Photos processed on your device, video embeds, and 75 interactive widgets you can drop straight into a post.',
      'Six reading surfaces (Observatory, Parchment, Manuscript, Newsprint, Slate and Focus), custom accents, topics and your own domain.',
      'Publishing is a real commit to your own repository; your blog deploys to your own site and belongs to you.',
      'AI drafting that learns your voice from your recent posts, with your own key, and never posts on your behalf.',
    ],
    price: '£49 a year',
    offer: { price: '49', currency: 'GBP', period: 'year' },
    category: 'Publishing software',
    platforms: 'Web, iOS, Android',
    flagship: true,
    whereLine:
      'Chapbook runs in your browser at chapbook.rqai.co.uk and installs to your phone. Your posts live in your own repository; your keys stay in your browser.',
    Demo: ChapbookDemo,
    HeroScene: ChapbookHero,
  },
  {
    name: 'OrthoPortfolio',
    slug: 'orthoportfolio',
    url: 'https://orthoportfolio.rqai.co.uk',
    tagline: 'Compile a submission-ready Portfolio Pathway application.',
    description:
      'For the SAS or overseas-trained T&O surgeon assembling a GMC Portfolio Pathway application, the hard part is not storage but shaping a pile of certificates, WBAs and letters into what the GMC asks for. OrthoPortfolio knows the Trauma and Orthopaedics curriculum, its 13 index procedures, 14 critical conditions and CiP structured reports, so it files each document against the right requirement, redacts patient details and verifies no recoverable text remains, then compiles indexed per-section PDF bundles with cover pages and continuous numbering. A dashboard tracks readiness, lists the gaps and prints a submission checklist. Everything runs on your own device.',
    features: [
      'Built on the published T&O requirements: 13 index procedures, 14 critical conditions, the CiP structured reports and the MSF and appraisal minimums.',
      'Redaction that rasterises each page and detects NHS numbers, postcodes, phone numbers and dates of birth, then verifies no recoverable text remains.',
      'Files each document against the right requirement automatically, with an offline keyword fallback when no AI key is set.',
      'Compiles indexed section bundles: cover band, document index, per-document reflection pages and continuous page numbering.',
      'A readiness dashboard, a prioritised gap list and a printable submission checklist, plus logbook and CPD trackers checked against the indicative requirements.',
    ],
    price: '£49 a year',
    offer: { price: '49', currency: 'GBP', period: 'year' },
    category: 'Medical software',
    platforms: 'Web, macOS, Windows',
    flagship: false,
    Demo: OrthoPortfolioDemo,
    HeroScene: OrthoPortfolioHero,
  },
  {
    name: 'OrthoConsultantPrep',
    slug: 'consultantprep',
    url: 'https://consultantprep.rqai.co.uk',
    tagline: 'Structured preparation for the consultant interview.',
    description:
      'For the T&O registrar, fellow or locum consultant facing a substantive consultant interview, OrthoConsultantPrep is a self-contained way to rehearse. It ships with 237 questions across 15 categories, each carrying a model answer, delivery advice, key statistics, references and follow-ups. A daily five-card flow keeps revision moving, a timed mock runs ten questions on a real three-minute clock, and Trust Prep reads a named trust’s published CQC, GIRFT and NHFD signals to show which scenarios that panel is likely to probe. All content is built in, your notes and progress stay on your device, and it is £49 once with no subscription.',
    features: [
      '237 questions across 15 categories, each with a model answer, delivery advice, key statistics, clickable references and follow-ups.',
      'Trust Prep: pick from 20 real trust profiles and 13 interview scenarios are matched to that trust’s published signals, with the triggering evidence shown.',
      'A timed mock interview: ten questions, three minutes each, with an end-of-run review of what you answered, skipped or timed out.',
      'A daily five-card flow that weights what you have not seen and what you flagged for review, and keeps a streak.',
      '28 hot-topic briefings linked to their questions and checked against current NHS source documents. Everything stays on your device.',
    ],
    price: '£49 one-off',
    offer: { price: '49', currency: 'GBP', period: 'once' },
    category: 'Education software',
    platforms: 'Web (installable)',
    flagship: false,
    Demo: OrthoConsultantPrepDemo,
    HeroScene: OrthoConsultantPrepHero,
  },
  {
    name: 'AudioQuill',
    slug: 'audioquill',
    url: 'https://audioquill.rqai.co.uk',
    tagline: 'Speak, and get clean, structured writing.',
    description:
      'For anyone who thinks faster than they type, AudioQuill turns speech into clean, structured writing you can shape into a finished document. Transcription runs on your own device with a local Whisper model, free and offline, or through your own key to a provider you choose. Every recording keeps its raw transcript intact while AI-cleaned versions layer on top, so you can switch between raw, clean and structured without losing the original. 44 guided templates and 49 spoken commands shape a dictation as you talk, and topics gather scattered recordings into one compiled document you can export to DOCX, PDF or Markdown.',
    features: [
      'On-device transcription with a local Whisper model: free, no key, and nothing leaves your device.',
      'The raw transcript is always preserved; AI-cleaned versions layer on top, so you can switch between raw, clean and structured at any time.',
      '44 guided templates and 49 spoken commands shape a dictation while you talk.',
      'Topics gather scattered recordings, then compile them into one document; export to DOCX, PDF or Markdown.',
      'Bring your own AI key, encrypted in your browser and sent only to the provider you choose. No account, no tracking.',
    ],
    price: '£29 a year',
    offer: { price: '29', currency: 'GBP', period: 'year' },
    category: 'Productivity software',
    platforms: 'Web (installable)',
    flagship: false,
    Demo: AudioQuillDemo,
    HeroScene: AudioQuillHero,
  },
  {
    name: 'Scribble',
    slug: 'scribble',
    url: 'https://scribble.rqai.co.uk',
    tagline: 'Typed notes in blocks, with AI and publishing.',
    description:
      'For the note-taker who wants more than plain text without the tracking, Scribble is a notebook built from typed blocks: text, headings, quotes, images, figures, 211 stickers and sandboxed interactive playgrounds, with a live preview as you write. Optional AI drafts with your own key across seven providers. A note can publish straight to your own website’s repository, and your devices sync through a private repository you control, with conflicts surfaced rather than silently overwritten. There is also a calendar planner and a video-reel maker that renders on your device. It runs in any browser, installs on iOS and Android, and keeps no account and collects nothing.',
    features: [
      'A typed block editor with text, headings, quotes, images, figures, 211 stickers and sandboxed interactive playgrounds, plus a live preview.',
      'Optional AI with your own key across seven providers; keys never enter your notes and go nowhere but the provider you choose.',
      'Publish a note straight to your own website’s repository, and sync devices through a private repository you control.',
      'A calendar planner and an on-device video-reel maker; runs in any browser and installs on iOS and Android.',
      'On-device and offline-first: notes and keys stay with you, there is no Scribble server and no account, and nothing is collected.',
    ],
    price: '£29 a year',
    offer: { price: '29', currency: 'GBP', period: 'year' },
    category: 'Productivity software',
    platforms: 'Web, iOS, Android',
    flagship: false,
    Demo: ScribbleDemo,
    HeroScene: ScribbleHero,
  },
]

type LivenessEntry = { url: string; ok: boolean; checkedAt: string }
const livenessMap = liveness as Record<string, LivenessEntry>

/**
 * Whether a project's URL answered at the last ship-time link check
 * (scripts/check-links.mjs). Reads the committed liveness.json; an unknown or
 * unreachable slug is treated as not live so the UI shows "coming soon".
 */
export function isLive(slug: Slug): boolean {
  return livenessMap[slug]?.ok === true
}
