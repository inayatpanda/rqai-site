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
 * products are called "projects" in the UI, never "apps". `price` is present
 * only where a specific amount is confirmed in the product's own source; where
 * it could not be verified it is omitted (the honest outcome).
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
  /** The animated micro-demo for this project (home card, and project page where no scene exists). */
  Demo: ComponentType
  /** An animated product scene framed as the project page hero. */
  HeroScene?: ComponentType
  /** Optional full-width showcase band on the project page. */
  Showcase?: ComponentType
}

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
    price: '£99 a year',
    offer: { price: '99', currency: 'GBP', period: 'year' },
    category: 'Research software',
    platforms: 'macOS, Windows, Linux',
    flagship: true,
    whereLine:
      'ResearchAssistant is desktop software for Mac, Windows and Linux. Walkthroughs, documentation and downloads are at researchassistant.rqai.co.uk.',
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
      'ClinicalPROMs (also known as Ortho Outcomes) is self-hosted software for collecting and tracking validated patient-reported outcome measures. Photograph a theatre or clinic list and it becomes structured cases with no retyping. Patients answer encrypted questionnaires on their own phone, and the encryption key never touches a server. Twenty validated instruments are scored exactly as published, each with the thresholds that make a change clinically meaningful, and every patient’s recovery plots as a trajectory over time. It runs on your own Mac or Windows PC with its own embedded database: one licence, no per-seat fees, no vendor cloud. The full detail is at clinicalproms.rqai.co.uk.',
    features: [
      'Twenty validated instruments, from the Oxford scores to EQ-5D-5L, each scored exactly as published and checked by its own test.',
      'Clinically meaningful interpretation built in: MCID thresholds and concern bands, so a score change reads as improvement, not just a number.',
      'Capture cases from a photograph of a theatre or clinic list; patient questionnaires run in any phone browser.',
      'End-to-end encrypted patient links: answers are encrypted on the patient’s device and the key never reaches a server.',
      'Self-hosted on your own Mac or Windows PC with an embedded database, an audit log and data-rights tooling: one licence, unlimited patients.',
    ],
    price: '£200 a year',
    offer: { price: '200', currency: 'GBP', period: 'year' },
    category: 'Medical software',
    platforms: 'macOS, Windows',
    flagship: true,
    whereLine:
      'ClinicalPROMs is self-hosted software for your own Mac or Windows PC. Learn more and get it at clinicalproms.rqai.co.uk.',
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
      'Chapbook turns writing a blog into something you can do from your phone, as naturally as texting. Ideas go into a chat-style composer: each message becomes a paragraph, and tapping any block lets you edit it by chatting. Drop in photos, embed videos, add interactive widgets from a library of 75, and pick from six reading surfaces for how your blog looks. When you publish, the post commits straight to your own repository and deploys to your own site, on your own domain. There is no Chapbook server holding your words: your blog belongs to you. An AI can help draft, in a voice it learns from your own recent posts, and nothing ever posts without your say-so.',
    features: [
      'A chat-style composer: write a post the way you text, message by message, and edit any block by chatting.',
      'Photos processed on your device, video embeds, and 75 interactive widgets you can drop into a post.',
      'Six reading surfaces (Observatory, Parchment, Manuscript, Newsprint, Slate and Focus), custom accents, topics and your own domain.',
      'Publishing is a real commit to your own repository; your blog deploys to your own site and belongs to you.',
      'AI drafting that learns your voice from your own recent posts, with your own key; it never posts on your behalf.',
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
    HeroScene: OrthoPortfolioHero,
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
    HeroScene: OrthoConsultantPrepHero,
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
