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
  researchassistant: { from: '#2563EB', to: '#172E72', ink: '#F1F6FF', muted: '#C7D9FF', highlight: '#8CC8FF', border: '#77B7FF' },
  clinicalproms: { from: '#0E7490', to: '#087F68', ink: '#F0FFFF', muted: '#C4F1EC', highlight: '#67F1E0', border: '#7DE9E2' },
  chapbook: { from: '#13B8B2', to: '#075B67', ink: '#F2FFFF', muted: '#C8F2F0', highlight: '#FFAC8F', border: '#76E5DC', warm: '#FFAC8F' },
  orthoportfolio: { from: '#4338CA', to: '#28205F', ink: '#F5F3FF', muted: '#D7D2FF', highlight: '#67E8F9', border: '#9B95FF' },
  consultantprep: { from: '#D58A22', to: '#8A4E13', ink: '#111C32', muted: '#2B3142', highlight: '#FFF0A6', border: '#FFD278', warm: '#FFF0A6' },
  audioquill: { from: '#E95F78', to: '#733FA8', ink: '#FFF5FA', muted: '#F7D4E5', highlight: '#FFD0B8', border: '#FFA8C2', warm: '#FFD0B8' },
  scribble: { from: '#16B8B0', to: '#355DAD', ink: '#F2FFFF', muted: '#CDECF4', highlight: '#8CF8EF', border: '#86DDEB' },
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
