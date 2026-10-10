import type { Slug } from '../data/products'
export function ProductLogo({ slug, className = '' }: { slug: Slug; className?: string }) {
  return <img className={`product-logo ${className}`} src={`/brand/${slug}.${slug === 'ortholog' ? 'png' : 'svg'}`} width="72" height="72" alt="" />
}
