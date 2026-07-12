import type { CSSProperties } from 'react'
import type { Slug } from './products'

export type ProductIdentity = {
  from: string
  to: string
  ink: string
  muted: string
  highlight: string
  border: string
  warm?: string
}

export const PRODUCT_IDENTITIES: Record<Slug, ProductIdentity> = {
  researchassistant: { from: '#315FB5', to: '#1C3568', ink: '#F1F6FF', muted: '#CBD8EF', highlight: '#9BC5EC', border: '#789EC9' },
  clinicalproms: { from: '#237C87', to: '#176F62', ink: '#F0FFFF', muted: '#C9E7E3', highlight: '#82D5CB', border: '#70B9B3' },
  chapbook: { from: '#2A9C98', to: '#155964', ink: '#F2FFFF', muted: '#CBE7E5', highlight: '#E7A58F', border: '#76C3BC', warm: '#E7A58F' },
  orthoportfolio: { from: '#5147A6', to: '#302A64', ink: '#F5F3FF', muted: '#D8D4ED', highlight: '#88CFD8', border: '#928DC4' },
  consultantprep: { from: '#BE8233', to: '#80501F', ink: '#111C32', muted: '#2B3142', highlight: '#F1D995', border: '#D9AE69', warm: '#F1D995' },
  audioquill: { from: '#6D4BC3', to: '#382460', ink: '#FAF7FF', muted: '#DDD5F0', highlight: '#CBBEFF', border: '#A796D8', warm: '#D8C7F3' },
  scribble: { from: '#2A9A95', to: '#42669A', ink: '#F2FFFF', muted: '#D0E4E8', highlight: '#9DDDD7', border: '#80B9C5' },
}

export function identityStyle(slug: Slug): CSSProperties {
  const identity = PRODUCT_IDENTITIES[slug]
  return {
    '--card-from': identity.from,
    '--card-to': identity.to,
    '--card-ink': identity.ink,
    '--card-muted': identity.muted,
    '--card-highlight': identity.highlight,
    '--card-border': identity.border,
    '--card-warm': identity.warm ?? identity.highlight,
    '--product-from': identity.from,
    '--product-to': identity.to,
    '--product-ink': identity.ink,
    '--product-muted': identity.muted,
    '--product-highlight': identity.highlight,
    '--product-border': identity.border,
    '--product-warm': identity.warm ?? identity.highlight,
  } as CSSProperties
}
