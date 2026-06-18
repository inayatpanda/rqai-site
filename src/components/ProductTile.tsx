import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { Product } from '../data/products'

interface ProductTileProps {
  product: Product
  index: number
}

export function ProductTile({ product, index }: ProductTileProps) {
  const reduce = useReducedMotion()
  const { name, subdomain, description, Demo, feature, live } = product

  const variants: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
            // Stagger by position for a calm cascade as the grid scrolls in.
            delay: Math.min(index * 0.04, 0.2),
          },
        },
      }

  // Shared inner content — identical whether the tile is a link or a div.
  const inner = (
    <>
      <div className="flex items-start justify-between gap-2">
        <h3 className="m-0 min-w-0 break-words text-[0.875rem] font-semibold leading-tight tracking-[-0.015em] text-fg">
          {name}
        </h3>
        {live ? (
          // Gradient "Live" pill — black text on the house gradient for contrast.
          <span className="flex-none rounded-full bg-accent-grad px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-[0.04em] text-bg">
            Live
          </span>
        ) : (
          <span className="flex-none rounded-full border border-hairline px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-[0.04em] text-muted">
            Soon
          </span>
        )}
      </div>

      <p className="m-0 text-[0.8125rem] leading-snug text-muted">{description}</p>

      {/* Subdomain in accent colour */}
      <span className="font-mono text-[0.6875rem] tabular-nums text-accent-cyan">{subdomain}</span>

      {/* Animated micro-demo (decorative — hinted at by the product). */}
      <div className="mt-auto pt-2.5" aria-hidden="true">
        <Demo />
      </div>
    </>
  )

  // Tile shell: a card with hover lift + scale, hairline border, accent border on hover.
  const shellClass = [
    'group flex h-full flex-col gap-1.5 rounded-xl border border-hairline bg-surface p-3.5',
    'transition-[transform,border-color,background-color] duration-200 ease-out-soft',
    'motion-safe:hover:scale-[1.02] hover:border-accent-cyan/50 hover:bg-surface-2',
    feature ? 'lg:col-span-2' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.li
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={feature ? 'lg:col-span-2' : ''}
    >
      {/*
        TO TAKE A PRODUCT LIVE: set `live: true` on the product in src/data/products.ts.
        This block then renders an <a> wrapping the whole tile (linking to the subdomain)
        and ProductTile swaps the "Coming soon" pill for the gradient "Live" pill above.
        No other edits required.
      */}
      {live ? (
        <a
          href={`https://${subdomain}`}
          className={`${shellClass} cursor-pointer no-underline active:scale-[0.98]`}
          aria-label={`${name} — open ${subdomain}`}
        >
          {inner}
        </a>
      ) : (
        <div className={shellClass}>{inner}</div>
      )}
    </motion.li>
  )
}
