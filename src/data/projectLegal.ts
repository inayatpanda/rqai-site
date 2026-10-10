import type { Slug } from './products'

// Public routes observed on 10 October 2026. App notices remain separate
// because accounts, uploads, optional AI and payment arrangements differ.
export type PolicyLink = { label: string; url: string }
export const PROJECT_LEGAL: Partial<Record<Slug, PolicyLink[]>> = {
  orthoportfolio: [
    { label: 'Privacy', url: 'https://orthoportfolio.rqai.co.uk/#/legal/privacy' },
    { label: 'Terms', url: 'https://orthoportfolio.rqai.co.uk/#/legal/terms' },
  ],
  researchassistant: [
    { label: 'Privacy', url: 'https://researchassistant.rqai.co.uk/privacy/' },
    { label: 'Terms', url: 'https://researchassistant.rqai.co.uk/terms/' },
  ],
  clinicalproms: [
    { label: 'Privacy', url: 'https://clinicalproms.rqai.co.uk/privacy/' },
    { label: 'Terms', url: 'https://clinicalproms.rqai.co.uk/terms/' },
    { label: 'Cookies', url: 'https://clinicalproms.rqai.co.uk/cookies/' },
  ],
  chapbook: [
    { label: 'Privacy', url: 'https://chapbook.rqai.co.uk/privacy' },
    { label: 'Terms', url: 'https://chapbook.rqai.co.uk/terms' },
  ],
  ortholog: [
    { label: 'Privacy', url: 'https://ortholog.rqai.co.uk/privacy' },
    { label: 'Terms', url: 'https://ortholog.rqai.co.uk/terms' },
  ],
  audioquill: [{ label: 'Privacy & terms', url: 'https://audioquill.rqai.co.uk/legal' }],
  scribble: [
    { label: 'Privacy', url: 'https://scribble.rqai.co.uk/legal/privacy.html' },
    { label: 'Terms', url: 'https://scribble.rqai.co.uk/legal/terms.html' },
  ],
  podium: [
    { label: 'Privacy', url: 'https://podium.rqai.co.uk/privacy/' },
    { label: 'Terms', url: 'https://podium.rqai.co.uk/terms/' },
    { label: 'Cookies', url: 'https://podium.rqai.co.uk/cookies/' },
  ],
  'literature-decoded': [{ label: 'Privacy', url: 'https://literature-decoded.rqai.co.uk/privacy/' }],
}
