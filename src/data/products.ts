import type { ComponentType } from 'react'
import { AudioQuillDemo } from '../components/demos/AudioQuillDemo'
import { ClinicalPROMsDemo } from '../components/demos/ClinicalPROMsDemo'
import { ResearchAssistantDemo } from '../components/demos/ResearchAssistantDemo'
import { OrthoConsultantPrepDemo } from '../components/demos/OrthoConsultantPrepDemo'
import { OrthoPortfolioDemo } from '../components/demos/OrthoPortfolioDemo'
import { ScribbleDemo } from '../components/demos/ScribbleDemo'

export interface Product {
  /** Product display name (also used as the subdomain slug, lower-cased). */
  name: string
  subdomain: string
  description: string
  /** The animated micro-demo that sits inside the tile. */
  Demo: ComponentType
  /** Larger feature tile on desktop (AudioQuill — the flagship). */
  feature?: boolean
  /**
   * When the product launches, set `live: true` and ProductTile will:
   *   - render an <a href="https://{subdomain}"> wrapper (the whole tile becomes a link), and
   *   - swap the "Coming soon" pill for a gradient "Live" pill.
   * No other change is needed.
   */
  live?: boolean
}

export const products: Product[] = [
  {
    name: 'AudioQuill',
    subdomain: 'audioquill.rqai.co.uk',
    description:
      'Speak; it writes. Voice notes cleaned and structured by AI — private and on your device.',
    Demo: AudioQuillDemo,
    feature: true,
  },
  {
    name: 'ClinicalPROMs',
    subdomain: 'clinicalproms.rqai.co.uk',
    description: 'Collect and track patient-reported outcome measures.',
    Demo: ClinicalPROMsDemo,
  },
  {
    name: 'ResearchAssistant',
    subdomain: 'researchassistant.rqai.co.uk',
    description: 'Search, summarise and organise the clinical literature.',
    Demo: ResearchAssistantDemo,
  },
  {
    name: 'OrthoConsultantPrep',
    subdomain: 'orthoconsultantprep.rqai.co.uk',
    description: 'Structured preparation for the orthopaedic consultant interview.',
    Demo: OrthoConsultantPrepDemo,
  },
  {
    name: 'OrthoPortfolio',
    subdomain: 'orthoportfolio.rqai.co.uk',
    description: 'Your surgical logbook and portfolio, kept in order.',
    Demo: OrthoPortfolioDemo,
  },
  {
    name: 'Scribble',
    subdomain: 'scribble.rqai.co.uk',
    description: 'Quick notes and ideas, captured the moment they arrive.',
    Demo: ScribbleDemo,
  },
]
