import type { ComponentType } from 'react'
import liveness from './liveness.json'
import { AudioQuillDemo } from '../components/demos/AudioQuillDemo'
import { ChapbookDemo } from '../components/demos/ChapbookDemo'
import { ClinicalPROMsDemo } from '../components/demos/ClinicalPROMsDemo'
import { OrthoConsultantPrepDemo } from '../components/demos/OrthoConsultantPrepDemo'
import { OrthoPortfolioDemo } from '../components/demos/OrthoPortfolioDemo'
import { ResearchAssistantDemo } from '../components/demos/ResearchAssistantDemo'
import { ScribbleDemo } from '../components/demos/ScribbleDemo'

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
  | 'orthoportfolio'
  | 'consultantprep'
  | 'clinicalproms'
  | 'chapbook'
  | 'audioquill'
  | 'scribble'
  | 'researchassistant'

export type Product = {
  name: string
  slug: Slug
  url: string
  /** <= 8 words, factual. */
  tagline: string
  /** One paragraph, factual. */
  description: string
  /** 3-5 bullets, each verifiable against the product. */
  features: string[]
  /** Only where a specific amount is verified in the product's own source. */
  price?: string
  /** The existing animated micro-demo for this project. */
  Demo: ComponentType
}

export const PRODUCTS: Product[] = [
  {
    name: 'OrthoPortfolio',
    slug: 'orthoportfolio',
    url: 'https://topp.rqai.co.uk',
    tagline: 'Compile a submission-ready Portfolio Pathway application.',
    description:
      'OrthoPortfolio turns a pile of raw evidence documents into a submission-ready GMC Specialist Register (Portfolio Pathway) application for Trauma & Orthopaedics. It redacts your documents, sorts them into the right categories, indexes and bundles them, validates the portfolio against the published rules and produces the verification proformas. Everything runs locally on your own device.',
    features: [
      'Redacts, sorts and indexes your evidence into the application’s categories, then compiles bundled section PDFs with cover pages and page numbering.',
      'A dashboard tracks overall readiness, highlights gaps and shows what to do next.',
      'Trackers for logbook numbers, PBAs, CBD/CEX and a CPD diary, checked against the indicative requirements.',
      'Validates the portfolio against the published rules and generates the verification proformas.',
      'Local-first: documents stay on your device unless you back up or sync, and an optional AI writing assistant uses your own key.',
    ],
    Demo: OrthoPortfolioDemo,
  },
  {
    name: 'OrthoConsultantPrep',
    slug: 'consultantprep',
    url: 'https://consultantprep.rqai.co.uk',
    tagline: 'Structured preparation for the consultant interview.',
    description:
      'OrthoConsultantPrep is a local-first tool for preparing for the UK consultant interview in Trauma & Orthopaedics. It ships with a searchable question bank — model answers, delivery advice, key statistics, references and follow-ups — plus refreshed hot-topic briefings, timed mock interviews and a Trust Prep mode that tailors preparation to a specific trust and its context. All the content is bundled in; your notes and progress stay on your device, with no account and no cloud.',
    features: [
      'A searchable question bank with model answers, delivery advice, key statistics, clickable references and follow-ups, plus confidence flags and per-question notes.',
      'Trust Prep: choose a target trust for its profile and context, then match interview scenarios to tailored talking points (20 trust profiles, 13 interview scenarios).',
      'Timed mock interviews with an end-of-run review, and a daily card-based practice flow.',
      'Refreshed hot-topic briefings linked to their related questions.',
      'Optional AI question builder and CV tools that run with your own key; all content and progress stay on your device.',
    ],
    price: '£49 one-off',
    Demo: OrthoConsultantPrepDemo,
  },
  {
    name: 'ClinicalPROMs',
    slug: 'clinicalproms',
    url: 'https://clinicalproms.rqai.co.uk',
    tagline: 'Collect and track validated patient-reported outcomes.',
    description:
      'ClinicalPROMs is a self-hosted platform for collecting and tracking patient-reported outcome measures. Capture cases straight from a photograph of a list, send patients encrypted questionnaires they complete on their own device, and watch validated outcome scores build over time. It carries more than twenty validated instruments, each scored exactly as published, alongside outcome trajectories, analytics and an audit log. Everything runs on your own Windows PC or Mac — one licence, no per-seat fees, no cloud.',
    features: [
      'Capture cases from a photograph of a theatre or clinic list, with no retyping.',
      'More than twenty validated outcome instruments, each scored exactly as published with its established thresholds.',
      'Encrypted patient questionnaires completed on the patient’s own device — the encryption key never reaches a server.',
      'Outcome trajectories, analytics, and an audit log with data-rights tooling.',
      'Self-hosted on your own PC or Mac — one licence, unlimited cases and patients, no per-seat fees.',
    ],
    Demo: ClinicalPROMsDemo,
  },
  {
    name: 'Chapbook',
    slug: 'chapbook',
    url: 'https://chapbook.rqai.co.uk',
    tagline: 'Capture an idea, draft a post, publish.',
    description:
      'Chapbook is a mobile-first tool for turning a rough idea into a finished post. Type or paste a thought and an AI drafts a single post in a fixed, considered voice — with alternative opening hooks to try — which you edit and approve before anything goes out. Share it through your phone’s native share sheet, or expand it into a full blog article that commits straight to your own site’s repository and publishes itself. It never posts on your behalf, and it doubles as a content manager for your blog.',
    features: [
      'Turn a rough idea or a pasted note into one finished draft, written in a fixed voice with alternative opening hooks.',
      'You always edit and approve before anything is shared — it never auto-posts.',
      'Share through your phone’s native share sheet, with no OAuth and no monthly platform fees.',
      'Expand a post into a 500–900 word article that commits to your own site repository and auto-deploys.',
      'Manage your blog from one place — publish, take down and delete posts, with images resized on-device. Uses your own AI key.',
    ],
    Demo: ChapbookDemo,
  },
  {
    name: 'AudioQuill',
    slug: 'audioquill',
    url: 'https://audioquill.rqai.co.uk',
    tagline: 'Write your story with your voice.',
    description:
      'AudioQuill is a voice dictation tool: speak, and it turns your words into clean, structured text you can edit and export. Every recording keeps its original transcript untouched — the AI-cleaned versions are derived and non-destructive — so nothing is lost. It works offline for everything except the AI calls you make with your own key, which is encrypted in your browser and only ever sent to the provider you choose.',
    features: [
      'Speak and get clean, structured text back, ready to edit and export.',
      'The original transcript is always preserved; every AI-cleaned version is derived and non-destructive.',
      'Local-first and offline for everything except your own AI calls.',
      'Bring your own key: it is encrypted in your browser and only sent to the provider you choose.',
      'A library of templates and voice commands, with document export.',
    ],
    Demo: AudioQuillDemo,
  },
  {
    name: 'Scribble',
    slug: 'scribble',
    url: 'https://scribble.rqai.co.uk',
    tagline: 'A private, on-device notebook.',
    description:
      'Scribble is a private, on-device notebook. Your notes, notebooks and keys live on your device — nothing is collected, and there is no Scribble server. Write in a block editor with text, headings, images, stickers and interactive playgrounds, and see a live preview as you go. Add AI writing help with your own key, publish a note straight to your own site’s repository, and sync across devices through a private GitHub repo — all bring-your-own, with conflicts surfaced rather than silently overwritten.',
    features: [
      'Private and offline-first: notes, notebooks and keys stay on your device, with no account and no server.',
      'A block editor — text, headings, quotes, images, stickers, figures and interactive playgrounds — with a live preview.',
      'Optional AI writing help using your own key, stored only in the device keychain.',
      'Publish a note straight to your own site’s repository, and sync across devices via a private GitHub repo.',
      'Runs in any browser and installs natively on iOS and Android, and includes a calendar planner.',
    ],
    Demo: ScribbleDemo,
  },
  {
    name: 'ResearchAssistant',
    slug: 'researchassistant',
    url: 'https://researchassistant.rqai.co.uk',
    tagline: 'Research papers, made clear — in development.',
    description:
      'ResearchAssistant is an early, in-development project. It is designed to turn a research paper into a short, honest, interactive article a busy reader can take in quickly and share, with a planned AI step that extracts a paper’s structure — its arms, outcomes and harms — into a reviewable summary, always behind a human review. A critical-appraisal layer, grounded in the source and the wider evidence, is central to the idea. The work is still taking shape, and nothing here is claimed as finished.',
    features: [
      'Designed to turn a research paper into a short, interactive article you can read quickly and share.',
      'A planned AI step to extract a paper’s structure — arms, outcomes and harms — into a reviewable summary, always behind human review.',
      'A critical-appraisal layer intended to be grounded in the source paper and the wider evidence.',
      'Built on firm commitments: never fabricate data, keep every figure traceable to its source, and cite DOIs.',
    ],
    Demo: ResearchAssistantDemo,
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
