import type { ComponentType } from 'react'
import liveness from './liveness.json'
import { AudioQuillDemo } from '../components/demos/AudioQuillDemo'
import { ChapbookDemo } from '../components/demos/ChapbookDemo'
import { ClinicalPROMsDemo } from '../components/demos/ClinicalPROMsDemo'
import { OrthoConsultantPrepDemo } from '../components/demos/OrthoConsultantPrepDemo'
import { OrthoPortfolioDemo } from '../components/demos/OrthoPortfolioDemo'
import { ResearchAssistantDemo } from '../components/demos/ResearchAssistantDemo'
import { ScribbleDemo } from '../components/demos/ScribbleDemo'
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

export type FeatureMoment = { title: string; body: string }
export type ProofPoint = { value: string; label: string }

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
  /** The human problem or possibility that opens the visible project story. */
  recognition: string
  /** A short display headline for the visible project story. */
  storyHeadline: string
  /** A concise outcome-led visible pitch; detailed description remains metadata. */
  promise: string
  /** 3-5 titled, verifiable capabilities. */
  featureMoments: FeatureMoment[]
  /** Scannable product facts, not adjectives. */
  proof: ProofPoint[]
  /** Compact ownership, privacy or optional-AI statement. */
  controlNote: string
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
}

export const PRODUCTS: Product[] = [
  {
    name: 'ResearchAssistant',
    slug: 'researchassistant',
    url: 'https://researchassistant.rqai.co.uk',
    tagline: 'Evidence, from search to submission.',
    hook: 'One desktop app that carries a study from question to submitted manuscript.',
    description:
      'For the clinician running a systematic review or writing up a study, ResearchAssistant is one desktop app that carries the whole project from question to submitted manuscript. Build a PubMed search from an offline MeSH index of 30,956 terms, screen with a live Cohen’s kappa, then run risk of bias, meta-analysis and GRADE. The statistics module has 52 tests, each validated against the same run in R, and strict AI mode must ground every claim to a sentence in your library or say nothing. A simulated Reviewer 2 critiques the draft, and a one-click packet builds the submission zip. Your project stays in a database on your own Mac, Windows or Linux machine. Full walkthroughs and downloads are at researchassistant.rqai.co.uk.',
    recognition: 'From the first search to the final submission.',
    storyHeadline: 'One research workbench. Every stage connected.',
    promise:
      'Build systematic reviews. Run validated statistics and health-economic analyses. Draft manuscripts, check the evidence and prepare submission files without changing tools.',
    featureMoments: [
      { title: 'Run the whole systematic review', body: 'Build the search, screen together, assess bias, pool results and produce GRADE summaries.' },
      { title: 'Use statistics you can defend', body: 'Choose from 52 tests validated against equivalent runs in R, with power and sample-size planning.' },
      { title: 'Make the economics visible', body: 'Run QALY, ICER, NMB, CEAC and sensitivity analyses, then produce CHEERS-style reporting.' },
      { title: 'Keep AI on a short lead', body: 'Ground drafts in your evidence, inspect every claim, use local Ollama—or write without AI.' },
      { title: 'Meet Reviewer 2 early', body: 'Stress-test the manuscript, resolve criticism and build the final submission package.' },
    ],
    proof: [
      { value: '52', label: 'validated statistical tests' },
      { value: '30,956', label: 'offline MeSH descriptors' },
      { value: '1', label: 'workflow from search to submission' },
    ],
    controlNote: 'Your library and project database stay on your own computer. Generative AI is optional, inspectable and can run locally.',
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
  },
  {
    name: 'ClinicalPROMs',
    slug: 'clinicalproms',
    url: 'https://clinicalproms.rqai.co.uk',
    tagline: 'Collect and track validated patient-reported outcomes.',
    hook: 'Twenty validated instruments, scored as published, on hardware you control.',
    description:
      'For the orthopaedic surgeon or department that wants to know how patients actually do after surgery, ClinicalPROMs (also known as Ortho Outcomes) collects and tracks validated patient-reported outcomes without a vendor cloud. Photograph a theatre or clinic list and it becomes structured cases with no retyping. Patients answer end-to-end encrypted questionnaires on their own phone, and the key never touches a server. Twenty validated instruments, from the Oxford scores to EQ-5D-5L, are scored exactly as published, each with the MCID thresholds and concern bands that make a change clinically meaningful, and every patient’s recovery plots as a trajectory over time. It runs on your own Mac or Windows PC with an embedded database: one licence, no per-seat fees. The full detail is at clinicalproms.rqai.co.uk.',
    recognition: 'Collecting scores is easy. Understanding recovery is the real work.',
    storyHeadline: 'See recovery, not just another score.',
    promise:
      'Collect validated PROMs and follow each patient’s progress over time. MCID thresholds show when change is clinically meaningful.',
    featureMoments: [
      { title: 'See recovery, not isolated scores', body: 'Follow every patient over time with MCID thresholds and concern bands already interpreted.' },
      { title: 'Use measures clinicians recognise', body: 'Twenty validated instruments are scored as published, from Oxford scores to EQ-5D-5L.' },
      { title: 'Turn a list into a clinic', body: 'Photograph a theatre or clinic list and create structured cases without retyping them.' },
      { title: 'Let patients answer anywhere', body: 'Send a secure link that works in the patient’s own phone browser.' },
      { title: 'Keep the key out of the cloud', body: 'Answers are encrypted on the patient’s device before they travel.' },
    ],
    proof: [
      { value: '20', label: 'validated outcome measures' },
      { value: '∞', label: 'patients on one licence' },
      { value: '0', label: 'vendor-held encryption keys' },
    ],
    controlNote: 'Self-hosted on your Mac or Windows PC, with an embedded database, audit log and data-rights tools.',
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
    recognition: 'What if owning a beautiful blog felt as easy as sending a message?',
    storyHeadline: 'Own a blog that never feels ordinary.',
    promise:
      'Write from your phone as naturally as sending a message. Change the reading mood, add interactive ideas and publish to your own domain.',
    featureMoments: [
      { title: 'Write by chatting', body: 'Each message becomes a paragraph; tap any block and continue editing the conversation.' },
      { title: 'Change the whole atmosphere', body: 'Cycle through six distinctive reading surfaces with one choice—not a site rebuild.' },
      { title: 'Make the page playful', body: 'Mix photos, video and 75 interactive widgets into the story.' },
      { title: 'Publish somewhere you own', body: 'A real repository commit deploys the post to your website and domain.' },
      { title: 'Borrow a spark, keep your voice', body: 'Optional AI can learn from recent posts, but nothing publishes without you.' },
    ],
    proof: [
      { value: '6', label: 'reading surfaces' },
      { value: '75', label: 'interactive widgets' },
      { value: '1 tap', label: 'to change the reading mood' },
    ],
    controlNote: 'Your posts live in your repository and publish to your domain. Chapbook has no publishing server in between.',
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
    recognition: 'A Portfolio Pathway application should not feel like organising a warehouse.',
    storyHeadline: 'Turn years of evidence into one coherent application.',
    promise:
      'Place each document against the right T&O requirement. Find the gaps, protect patient details and build indexed submission bundles.',
    featureMoments: [
      { title: 'Know where every document belongs', body: 'Match evidence to the curriculum, index procedures, critical conditions and CiP reports.' },
      { title: 'Find the gaps before the GMC does', body: 'See readiness by section and work from a prioritised missing-evidence list.' },
      { title: 'Redact beyond the black rectangle', body: 'Rasterise pages, detect common identifiers and verify that text cannot be recovered.' },
      { title: 'Build submission-ready bundles', body: 'Generate cover pages, indexes, reflection sheets and continuous page numbering.' },
      { title: 'Keep the wider portfolio moving', body: 'Track logbook evidence, CPD and the final printable submission checklist.' },
    ],
    proof: [
      { value: '13', label: 'index procedures mapped' },
      { value: '14', label: 'critical conditions mapped' },
      { value: '0', label: 'recoverable text after verified redaction' },
    ],
    controlNote: 'The application and its evidence stay on your own device. Classification still works offline when no AI key is configured.',
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
    recognition: 'A consultant interview is never generic. Your preparation should not be either.',
    storyHeadline: 'Prepare for the Trust, not a generic interview.',
    promise:
      'Build stronger answers around the Trust and NHS context in front of you. Then rehearse them against the clock.',
    featureMoments: [
      { title: 'Prepare for this Trust', body: 'Match interview scenarios to published CQC, GIRFT and NHFD signals from real Trust profiles.' },
      { title: 'Build answers with substance', body: 'Use model answers, delivery advice, statistics, references and follow-up questions.' },
      { title: 'Feel the three-minute clock', body: 'Run a ten-question mock and review what you answered, skipped or timed out.' },
      { title: 'Revise what needs attention', body: 'A daily five-card flow prioritises unseen and flagged material.' },
      { title: 'Stay fluent in the NHS conversation', body: 'Connect current hot-topic briefings directly to the questions they inform.' },
    ],
    proof: [
      { value: '237', label: 'interview questions' },
      { value: '20', label: 'real Trust profiles' },
      { value: '28', label: 'NHS hot-topic briefings' },
    ],
    controlNote: 'All core content is built in. Your notes and progress stay on your device, with one purchase and no subscription.',
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
    recognition: 'Your best sentence should not have to wait for your fingers.',
    storyHeadline: 'Speak while the thought is alive.',
    promise:
      'Turn recordings into clean, structured writing. Gather scattered dictations into finished documents without losing the untouched transcript.',
    featureMoments: [
      { title: 'Transcribe without sending audio away', body: 'Run a local Whisper model on your own device, free and offline.' },
      { title: 'Never lose what you actually said', body: 'Move between raw, clean and structured versions while preserving the original transcript.' },
      { title: 'Shape the document while speaking', body: 'Use guided templates and spoken commands to create structure in the moment.' },
      { title: 'Gather fragments into something whole', body: 'Compile recordings by topic, then export one coherent document.' },
      { title: 'Choose where intelligence comes from', body: 'Use local transcription or bring a key for the AI provider you prefer.' },
    ],
    proof: [
      { value: '44', label: 'guided templates' },
      { value: '49', label: 'spoken commands' },
      { value: '3', label: 'exports: DOCX, PDF, Markdown' },
    ],
    controlNote: 'Raw recordings and transcripts stay available. There is no AudioQuill account, tracking profile or required AI subscription.',
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
    recognition: 'Why should a note stop at words on a page?',
    storyHeadline: 'Let a note become something more.',
    promise:
      'Build visual stories, interactive playgrounds, tiny flipbooks and published posts. Keep the speed and simplicity of typed notes.',
    featureMoments: [
      { title: 'Build with more than text', body: 'Combine headings, images, figures, stickers and sandboxed interactive playgrounds.' },
      { title: 'Draw an idea into motion', body: 'Create frame-by-frame flipbooks and render caption, sketch or sticker reels on your device.' },
      { title: 'Invite a stranger idea in', body: 'Use Goblin mode, Partner chat or other optional BYOK tools when the blank page feels too polite.' },
      { title: 'Publish the note where you live', body: 'Send finished work directly to your own website repository.' },
      { title: 'Carry the notebook across devices', body: 'Sync through a private repository you control, with conflicts shown rather than overwritten.' },
    ],
    proof: [
      { value: '211', label: 'stickers ready to use' },
      { value: '7', label: 'supported AI providers' },
      { value: '0', label: 'Scribble accounts required' },
    ],
    controlNote: 'Notes, keys and rendered media stay with you. AI is optional, uses your key and disappears from the workflow when you choose not to configure it.',
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
