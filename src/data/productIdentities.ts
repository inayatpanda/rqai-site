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
  ortholog: { from: '#C65A22', to: '#6F301B', ink: '#FFF8EC', muted: '#F1D3BD', highlight: '#F4B05A', border: '#D68C64', warm: '#F4B05A' },
  chapbook: { from: '#287D91', to: '#183F5A', ink: '#F2FBFF', muted: '#C8DFE8', highlight: '#E7A58F', border: '#769FB0', warm: '#E7A58F' },
  orthoportfolio: { from: '#5147A6', to: '#302A64', ink: '#F5F3FF', muted: '#D8D4ED', highlight: '#88CFD8', border: '#928DC4' },
  consultantprep: { from: '#8A643A', to: '#4E3525', ink: '#FAF3E8', muted: '#DDD0BF', highlight: '#D8BE96', border: '#A98A64', warm: '#D8BE96' },
  audioquill: { from: '#6D4BC3', to: '#382460', ink: '#FAF7FF', muted: '#DDD5F0', highlight: '#CBBEFF', border: '#A796D8', warm: '#D8C7F3' },
  scribble: { from: '#2A9A95', to: '#42669A', ink: '#F2FFFF', muted: '#D0E4E8', highlight: '#9DDDD7', border: '#80B9C5' },
  podium: { from: '#975852', to: '#51303d', ink: '#fff5f1', muted: '#f0d3ce', highlight: '#ffb0a3', border: '#bb827c' },
  'literature-decoded': { from: '#82693f', to: '#423522', ink: '#fff8e8', muted: '#e6d6b8', highlight: '#f1ca7b', border: '#b99a65' },
  thestreetsignal: { from: '#4e704b', to: '#263e34', ink: '#f4ffec', muted: '#d0e1c6', highlight: '#b9db85', border: '#83a078' },
  'universal-shoulder-model': { from: '#3e7491', to: '#25384f', ink: '#f0faff', muted: '#c7dfe9', highlight: '#89d8f2', border: '#7aa3b9' },
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
