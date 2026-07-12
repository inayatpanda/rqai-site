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
  clinicalproms: { from: '#2B7668', to: '#164A43', ink: '#F2FFF9', muted: '#C9E2D8', highlight: '#91C9B7', border: '#78A99A' },
  chapbook: { from: '#287D91', to: '#183F5A', ink: '#F2FBFF', muted: '#C8DFE8', highlight: '#E7A58F', border: '#769FB0', warm: '#E7A58F' },
  orthoportfolio: { from: '#5147A6', to: '#302A64', ink: '#F5F3FF', muted: '#D8D4ED', highlight: '#88CFD8', border: '#928DC4' },
  consultantprep: { from: '#8A643A', to: '#4E3525', ink: '#FAF3E8', muted: '#DDD0BF', highlight: '#D8BE96', border: '#A98A64', warm: '#D8BE96' },
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
