import { PRODUCTS } from './products'

export const ORTHOPAEDIC_SLUGS = ['ortholog', 'consultantprep', 'orthoportfolio', 'universal-shoulder-model'] as const
export const ORTHOPAEDIC_PROJECTS = ORTHOPAEDIC_SLUGS.map(slug => PRODUCTS.find(product => product.slug === slug)!)
export const MAIN_PROJECTS = PRODUCTS.filter(product => !ORTHOPAEDIC_SLUGS.some(slug => slug === product.slug))
export const LEGAL_LINKS = [
  { slug: 'legal', name: 'Legal information' },
  { slug: 'terms', name: 'Terms & conditions' },
  { slug: 'privacy', name: 'Privacy' },
  { slug: 'cookies', name: 'Cookies' },
  { slug: 'disclaimers', name: 'Research & professional use' },
]
