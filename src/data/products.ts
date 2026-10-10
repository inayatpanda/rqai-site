import { PodiumIllustration, LiteratureIllustration, SignalIllustration, ShoulderIllustration } from '../components/IllustratedHero'
import type { ComponentType } from 'react'
import liveness from './liveness.json'
import { AudioQuillDemo } from '../components/demos/AudioQuillDemo'
import { ChapbookDemo } from '../components/demos/ChapbookDemo'
import { ClinicalPROMsDemo } from '../components/demos/ClinicalPROMsDemo'
import { OrthoConsultantPrepDemo } from '../components/demos/OrthoConsultantPrepDemo'
import { OrthoPortfolioDemo } from '../components/demos/OrthoPortfolioDemo'
import { ResearchAssistantDemo } from '../components/demos/ResearchAssistantDemo'
import { ScribbleDemo } from '../components/demos/ScribbleDemo'
import { OrthoLogDemo } from '../components/demos/OrthoLogDemo'
import { ResearchAssistantHero } from '../components/heroes/ResearchAssistantHero'
import { ClinicalPROMsHero } from '../components/heroes/ClinicalPROMsHero'
import { OrthoConsultantPrepHero } from '../components/heroes/OrthoConsultantPrepHero'
import { ChapbookHero } from '../components/heroes/ChapbookHero'
import { OrthoPortfolioHero } from '../components/heroes/OrthoPortfolioHero'
import { AudioQuillHero } from '../components/heroes/AudioQuillHero'
import { ScribbleHero } from '../components/heroes/ScribbleHero'
import { OrthoLogHero } from '../components/heroes/OrthoLogHero'

/**
 * The single source of truth for the RQAI projects.
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
  | 'ortholog'
  | 'chapbook'
  | 'orthoportfolio'
  | 'consultantprep'
  | 'audioquill'
  | 'scribble'
  | 'podium'
  | 'literature-decoded'
  | 'thestreetsignal'
  | 'universal-shoulder-model'

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
  status?: 'development'
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
    tagline: 'Plan, run and write up research.',
    description:
      'Run systematic reviews, statistics and health-economic analyses. Write the manuscript and prepare submission files in the same app.',
    recognition: 'Research',
    storyHeadline: 'Work on a study from start to finish.',
    promise:
      'Run systematic reviews, statistics and health-economic analyses. Write the manuscript and prepare submission files in the same app.',
    featureMoments: [
      { title: 'Review the evidence', body: 'Search papers, screen studies, assess bias and combine results.' },
      { title: 'Analyse your data', body: 'Use statistical tests, sample-size tools and health-economic analyses.' },
      { title: 'Prepare your manuscript', body: 'Write with references, use Reviewer 2 feedback and export submission files.' },
      { title: 'Choose whether to use AI', body: 'Use your own evidence to guide drafts, run a local model or work without AI.' },
    ],
    proof: [
      { value: '52', label: 'validated statistical tests' },
      { value: '30,956', label: 'offline MeSH descriptors' },
      { value: '1', label: 'workflow from search to submission' },
    ],
    controlNote: 'The hosted workspace stores accounts and uploaded work on its servers. Desktop storage and optional AI follow the setup you choose. Read the app privacy notice before uploading data.',
    price: 'See current access options',
    category: 'Research software',
    platforms: 'Web; desktop early access',
    flagship: true,
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
    tagline: 'Collect patient scores and track recovery.',
    description:
      'Send patients questionnaires and track their scores over time. See changes against published thresholds for meaningful improvement.',
    recognition: 'Patient outcomes',
    storyHeadline: 'Follow recovery over time.',
    promise:
      'Send patients questionnaires and track their scores over time. See changes against published thresholds for meaningful improvement.',
    featureMoments: [
      { title: 'Collect patient scores', body: 'Patients complete questionnaires in their phone browser.' },
      { title: 'Track changes', body: 'View recovery charts using validated outcome measures and published scoring rules.' },
      { title: 'Import a clinic list', body: 'Create draft cases from a photo of a theatre or clinic list, then check the details.' },
      { title: 'Run it on your computer', body: 'Use your own Mac or Windows PC to store and manage the records.' },
    ],
    proof: [
      { value: '20', label: 'validated outcome measures' },
      { value: '∞', label: 'patients on one licence' },
      { value: '0', label: 'vendor-held encryption keys' },
    ],
    controlNote: 'Data handling depends on the clinical deployment. Confirm the operator, patient notice and approved storage arrangements before collecting patient information.',
    price: 'Beta access — contact the project',
    category: 'Medical software',
    platforms: 'macOS, Windows',
    flagship: true,
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
    name: 'OrthoLog',
    slug: 'ortholog',
    url: 'https://ortholog.rqai.co.uk',
    tagline: 'Record operations and what you learn.',
    description:
      'Log operations, add learning notes and review your experience. Use the app on your phone or computer.',
    recognition: 'Surgical logbook',
    storyHeadline: 'Keep cases and reflections together.',
    promise:
      'Log operations, add learning notes and review your experience. Use the app on your phone or computer.',
    featureMoments: [
      { title: 'Add cases', body: 'Enter cases yourself, import a spreadsheet or review an optional AI draft.' },
      { title: 'Keep learning notes', body: 'Add reflections, feedback, attachments and follow-up notes to each case.' },
      { title: 'Use more than one device', body: 'Install the web app and optionally sync an encrypted copy through Google Drive.' },
    ],
    proof: [
      { value: '0', label: 'required patient identifiers' },
      { value: '3', label: 'optional AI providers' },
      { value: '1', label: 'encrypted personal vault' },
    ],
    controlNote: 'Your logbook is encrypted. AI and Google Drive sync are optional. Use non-identifying data unless your organisation has approved otherwise.',
    category: 'Education software',
    platforms: 'Web, macOS, Android',
    flagship: false,
    Demo: OrthoLogDemo,
    HeroScene: OrthoLogHero,
  },
  {
    name: 'Chapbook',
    slug: 'chapbook',
    url: 'https://chapbook.rqai.co.uk',
    tagline: 'Write and publish a blog from your phone.',
    description:
      'Write posts in a chat-style editor. Add photos, video and interactive elements, then publish to your own website.',
    recognition: 'Blogging',
    storyHeadline: 'Write a post. Publish it on your site.',
    promise:
      'Write posts in a chat-style editor. Add photos, video and interactive elements, then publish to your own website.',
    featureMoments: [
      { title: 'Write in short blocks', body: 'Each message becomes a paragraph. Tap a block to edit it.' },
      { title: 'Add more to a post', body: 'Include photos, videos and interactive widgets.' },
      { title: 'Choose a layout', body: 'Pick a reading style for your blog.' },
      { title: 'Publish to your own site', body: 'Save posts to your repository and publish on your domain.' },
    ],
    proof: [
      { value: '6', label: 'reading surfaces' },
      { value: '75', label: 'interactive widgets' },
      { value: '1 tap', label: 'to change the reading mood' },
    ],
    controlNote: 'Your posts live in your own repository. AI drafting is optional, and you choose when to publish.',
    price: '£49 a year',
    offer: { price: '49', currency: 'GBP', period: 'year' },
    category: 'Publishing software',
    platforms: 'Web, iOS, Android',
    flagship: true,
    Demo: ChapbookDemo,
    HeroScene: ChapbookHero,
  },
  {
    name: 'OrthoPortfolio',
    slug: 'orthoportfolio',
    url: 'https://orthoportfolio.rqai.co.uk',
    tagline: 'Organise your Portfolio Pathway application.',
    description:
      'Match documents to the T&O requirements. Find missing evidence, redact patient details and export indexed PDF bundles.',
    recognition: 'Surgical portfolio',
    storyHeadline: 'Put your evidence in order.',
    promise:
      'Match documents to the T&O requirements. Find missing evidence, redact patient details and export indexed PDF bundles.',
    featureMoments: [
      { title: 'Sort your evidence', body: 'Organise documents by curriculum requirements, procedures and conditions.' },
      { title: 'Check what is missing', body: 'Review progress by section and see where you need more evidence.' },
      { title: 'Redact patient details', body: 'Remove identifying information and check the result before sharing.' },
      { title: 'Export your application', body: 'Create PDF bundles with cover pages, indexes and page numbers.' },
    ],
    proof: [
      { value: '13', label: 'index procedures mapped' },
      { value: '14', label: 'critical conditions mapped' },
      { value: '0', label: 'recoverable text after verified redaction' },
    ],
    controlNote: 'You can organise evidence on your device without an AI key. Optional cloud backup sends data to the configured backup service; check its settings before enabling it.',
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
    tagline: 'Practise for a T&O consultant interview.',
    description:
      'Revise interview questions, review Trust information and practise timed answers. Keep notes on the topics you need to revisit.',
    recognition: 'Interview preparation',
    storyHeadline: 'Prepare answers and practise aloud.',
    promise:
      'Revise interview questions, review Trust information and practise timed answers. Keep notes on the topics you need to revisit.',
    featureMoments: [
      { title: 'Revise questions', body: 'Read model answers, references and likely follow-up questions.' },
      { title: 'Practise a timed interview', body: 'Work through ten questions with three minutes for each answer.' },
      { title: 'Prepare for the Trust', body: 'Review published Trust information and relevant NHS topics.' },
      { title: 'Track your revision', body: 'Flag questions and return to topics that need more work.' },
    ],
    proof: [
      { value: '237', label: 'interview questions' },
      { value: '20', label: 'real Trust profiles' },
      { value: '28', label: 'NHS hot-topic briefings' },
    ],
    controlNote: 'Core content is included in the app. Your notes and progress stay on your device. The purchase is a one-off payment.',
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
    tagline: 'Turn speech into written documents.',
    description:
      'Transcribe recordings, edit the text and combine notes into documents. Export as Word, PDF or Markdown.',
    recognition: 'Dictation',
    storyHeadline: 'Record your thoughts. Edit the transcript.',
    promise:
      'Transcribe recordings, edit the text and combine notes into documents. Export as Word, PDF or Markdown.',
    featureMoments: [
      { title: 'Transcribe recordings', body: 'Run Whisper on your device or use your chosen online provider.' },
      { title: 'Keep the original', body: 'Compare edited versions with the original transcript.' },
      { title: 'Structure your notes', body: 'Use templates and spoken commands to organise dictation.' },
      { title: 'Export a document', body: 'Group recordings by topic and export the text.' },
    ],
    proof: [
      { value: '44', label: 'guided templates' },
      { value: '49', label: 'spoken commands' },
      { value: '3', label: 'exports: DOCX, PDF, Markdown' },
    ],
    controlNote: 'Local transcription works offline. If you choose an online provider, it receives the audio or text needed for that request.',
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
    tagline: 'Keep notes with text, images and sketches.',
    description:
      'Write notes, add pictures and sketches, and publish selected pages to your website. AI tools are optional.',
    recognition: 'Notes',
    storyHeadline: 'Make a notebook you can use anywhere.',
    promise:
      'Write notes, add pictures and sketches, and publish selected pages to your website. AI tools are optional.',
    featureMoments: [
      { title: 'Build a page', body: 'Combine text, images, stickers and interactive elements.' },
      { title: 'Add drawings and short videos', body: 'Make flipbooks or render a short reel on your device.' },
      { title: 'Publish selected notes', body: 'Send a finished note to your own website repository.' },
      { title: 'Sync if you need to', body: 'Use your own private repository and review any conflicting changes.' },
    ],
    proof: [
      { value: '332', label: 'stickers ready to use' },
      { value: '7', label: 'supported AI providers' },
      { value: '0', label: 'Scribble accounts required' },
    ],
    controlNote: 'Notes stay on your device by default. Optional AI requests go to the provider you choose.',
    price: 'Free until 4 August 2027',
    offer: { price: '0', currency: 'GBP', period: 'year' },
    category: 'Productivity software',
    platforms: 'Web, iOS, Android',
    flagship: false,
    Demo: ScribbleDemo,
    HeroScene: ScribbleHero,
  },
{
    name: 'Podium',
    slug: 'podium',
    url: 'https://podium.rqai.co.uk',
    tagline: 'Rehearse presentations and interviews.',
    description: 'Import your slides, choose a practice room and rehearse with a simulated audience. Record a take and review it.',
    recognition: 'Presentation practice',
    storyHeadline: 'Practise your talk before the day.',
    promise: 'Import your slides, choose a practice room and rehearse with a simulated audience. Record a take and review it.',
    featureMoments: [
      { title: 'Use your slides', body: 'Import PowerPoint, PDF, OpenDocument or image slides.' },
      { title: 'Choose an audience', body: 'Practise in different rooms with simulated audience characters.' },
      { title: 'Review a recording', body: 'Watch your rehearsal and use the feedback to plan your next attempt.' },
    ],
    proof: [
        {
            value: '6',
            label: 'practice rooms'
        },
        {
            value: '38',
            label: 'audience characters'
        },
        {
            value: 'Local',
            label: 'rehearsal recordings'
        }
    ],
    controlNote: 'Rehearsal recordings are saved locally. Desktop access is currently by invitation.',
    category: 'Education software',
    platforms: 'Desktop',
    flagship: false,
  Demo: PodiumIllustration,
    HeroScene: PodiumIllustration,
  },
{
    name: 'Literature Decoded',
    slug: 'literature-decoded',
    url: 'https://literature-decoded.rqai.co.uk',
    tagline: 'Read open-access orthopaedic research.',
    description: 'Browse orthopaedic studies by subject. Read reformatted articles and follow the links to the original publications.',
    recognition: 'Research papers',
    storyHeadline: 'Read papers in a simpler layout.',
    promise: 'Browse orthopaedic studies by subject. Read reformatted articles and follow the links to the original publications.',
    featureMoments: [
      { title: 'Browse by subject', body: 'Find papers on upper limb, hip, knee, trauma, spine, sports and perioperative care.' },
      { title: 'Read the full paper', body: 'Articles are reformatted for reading, rather than rewritten.' },
      { title: 'Check the source', body: 'Each article includes attribution and a link to its journal version.' },
    ],
    proof: [
        {
            value: 'Open',
            label: 'access research'
        },
        {
            value: 'Linked',
            label: 'journal originals'
        },
        {
            value: 'Readable',
            label: 'article layouts'
        }
    ],
    controlNote: 'The collection uses open-access articles under CC BY or CC BY-SA licences. Attribution stays with each paper.',
    category: 'Education software',
    platforms: 'Web',
    flagship: false,
  Demo: LiteratureIllustration,
    HeroScene: LiteratureIllustration,
  },
{
    name: 'The Street Signal',
    slug: 'thestreetsignal',
    url: 'https://thestreetsignal.rqai.co.uk',
    tagline: 'Read market analysis and track its results.',
    description: 'Read the morning market report, explore charts and check how previous calls performed, including the misses.',
    recognition: 'Market research',
    storyHeadline: 'Follow market calls and their outcomes.',
    promise: 'Read the morning market report, explore charts and check how previous calls performed, including the misses.',
    featureMoments: [
      { title: 'Read the daily report', body: 'Review market movements, sector changes and new listings.' },
      { title: 'Check past calls', body: 'Compare results over five and ten trading sessions against SPY.' },
      { title: 'Explore the charts', body: 'See sector views and how well the reported probabilities match outcomes.' },
    ],
    proof: [
        {
            value: '5 / 10',
            label: 'session outcome windows'
        },
        {
            value: 'SPY',
            label: 'relative benchmark'
        },
        {
            value: 'Public',
            label: 'record of hits and misses'
        }
    ],
    controlNote: 'Market analysis, not investment advice. The project website explains licences and reader access.',
    category: 'Finance software',
    platforms: 'Web, macOS, Windows',
    flagship: false,
  Demo: SignalIllustration,
    HeroScene: SignalIllustration,
  },
{
    name: 'Universal Shoulder Model',
    slug: 'universal-shoulder-model',
    url: '',
    status: 'development',
    tagline: 'Study shoulder anatomy and movement.',
    description: 'Explore anatomy, compare saved scenarios and examine prescribed movement. This research software is still in development.',
    recognition: 'In development',
    storyHeadline: 'Compare shoulder models and movement.',
    promise: 'Explore anatomy, compare saved scenarios and examine prescribed movement. This research software is still in development.',
    featureMoments: [
      { title: 'View anatomy', body: 'Inspect shoulder geometry while retaining the original scan position.' },
      { title: 'Compare scenarios', body: 'Save and revisit patient and implant configurations.' },
      { title: 'Study movement', body: 'Run prescribed movement tasks and inspect geometric measurements.' },
    ],
    proof: [
        {
            value: 'Local',
            label: 'research workbench'
        },
        {
            value: 'Saved',
            label: 'reproducible study scenarios'
        },
        {
            value: 'In progress',
            label: 'model development'
        }
    ],
    controlNote: 'In development for research. Predictions about muscle forces, implant fit and joint stability remain incomplete. It has not been clinically validated.',
    category: 'Research software',
    platforms: 'macOS',
    flagship: false,
  Demo: ShoulderIllustration,
    HeroScene: ShoulderIllustration,
  }
]

type LivenessEntry = { url: string; ok: boolean; checkedAt: string }
const livenessMap = liveness as Record<string, LivenessEntry>

/**
 * Whether a project's URL answered at the last ship-time link check
 * (scripts/check-links.mjs). Reads the committed liveness.json; an unknown or
 * unreachable slug is treated as not live so the UI shows "coming soon".
 */
export function isLive(slug: Slug): boolean {
  return PRODUCTS.find(p => p.slug === slug)?.status !== 'development' && livenessMap[slug]?.ok === true
}
