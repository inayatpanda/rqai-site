import { projectPath } from '../data/projectPaths'
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { type Product } from '../data/products'
import { MAIN_PROJECTS, ORTHOPAEDIC_PROJECTS } from '../data/navigation'
import { PRODUCT_IDENTITIES, identityStyle } from '../data/productIdentities'
import { ProductLogo } from './ProductLogo'
import { ProductGlyph } from './ProductGlyph'

/*
 * PerspectiveShowcase — the RQAI projects as a perspective-grid of cards
 * (the design's second house signature, styled for the dark-blue canvas).
 *
 * Legibility first: every card is a flat, fully readable, tappable <Link> to its
 * internal project page in the base state. The perspective is an ENHANCEMENT —
 * on a fine-pointer device the card tilts a few degrees toward the cursor with a
 * soft cyan spotlight (Motion values, never React state, so it never re-renders
 * the tree). Touch, reduced-motion and no-JS all get the still, flat card.
 *
 * On the widest breakpoint the eight cards sit on a six-column grid in a
 * 3-3 · 4-2 · 2-2-2 · 3-3 rhythm so every row closes without an orphan.
 */

// Column spans on the lg six-column grid, in PRODUCTS order. Flagships lead:
// ResearchAssistant + ClinicalPROMs share row one, Chapbook anchors row two
// at width 4, and the remaining projects close the grid in balanced rows.
const LG_SPAN = [
  'lg:col-span-3', 'lg:col-span-3',
  'lg:col-span-3', 'lg:col-span-3',
  'lg:col-span-3', 'lg:col-span-3',
  'lg:col-span-3', 'lg:col-span-3',
] as const

const CARD_ART: Record<string, string> = { researchassistant: 'research', chapbook: 'writing', podium: 'podium', 'literature-decoded': 'literature', thestreetsignal: 'signal', 'universal-shoulder-model': 'shoulder' }

const MAX_TILT = 6 // degrees — small, so text never becomes hard to read

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="project-card__arrow transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
    >
      <path
        d="M2 8h11M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectCard({
  product,
  index,
  interactive,
}: {
  product: Product
  index: number
  interactive: boolean
}) {
  const { name, slug, tagline, hook, flagship } = product
  const theme = PRODUCT_IDENTITIES[slug]

  // Pointer position within the card, normalised to -0.5..0.5.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), {
    stiffness: 150,
    damping: 18,
  })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), {
    stiffness: 150,
    damping: 18,
  })
  // Spotlight follows the cursor (raw percentages, no spring needed).
  const gx = useTransform(px, [-0.5, 0.5], ['0%', '100%'])
  const gy = useTransform(py, [-0.5, 0.5], ['0%', '100%'])
  const spotlight = useMotionTemplate`radial-gradient(22rem 22rem at ${gx} ${gy}, color-mix(in srgb, ${theme.highlight} 30%, transparent), transparent 62%)`
  const cardStyle = identityStyle(slug)

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (!interactive) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }

  function handleLeave() {
    px.set(0)
    py.set(0)
  }

  return (
    <li
      className={`reveal ${LG_SPAN[index] ?? 'lg:col-span-3'}`}
      style={{ perspective: 900, ['--reveal-delay' as string]: `${index * 0.06}s` }}
    >
      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        <Link
          to={projectPath(slug)}
          aria-label={`${name}: ${tagline}`}
          data-slug={slug}
          style={cardStyle}
          className={`project-card pgrid-card group relative flex h-full ${flagship ? 'min-h-[15.5rem]' : 'min-h-[13.5rem]'} flex-col overflow-hidden rounded-2xl border p-6`}
        >
          {/* Cursor spotlight — enhancement only, hidden until hover. */}
          {interactive && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: spotlight }}
            />
          )}

          <div className="relative flex items-start justify-between gap-4">
            {/* Product-specific workflow glyph, given a settled frame so cards align. */}
            <div className="flex h-14 min-w-0 flex-1 items-center">
              <ProductLogo slug={slug} />{CARD_ART[slug] ? <img src={`/illustrations/${CARD_ART[slug]}.svg`} className="project-card-drawing" width="480" height="370" alt="" loading="lazy" /> : <ProductGlyph slug={slug} className="ml-auto opacity-70" />}
            </div>
          </div>

          <h3 className="relative mt-6 font-display text-xl font-semibold">
            {name}
          </h3>
          <p className="project-card__tagline relative mt-2 text-sm leading-relaxed">{tagline}</p>
          {flagship && hook && (
            <p className="project-card__hook relative mt-3 text-sm leading-relaxed">{hook}</p>
          )}

          <div className="project-card__cta relative mt-auto flex items-center gap-2 pt-6 text-sm font-medium">
            <span>
              {product.status === 'development' ? 'In development' : 'View details'}
            </span>
            <Arrow />
          </div>
        </Link>
      </motion.div>
    </li>
  )
}

export function PerspectiveShowcase() {
  const reduce = useReducedMotion()
  const [interactive, setInteractive] = useState(false)
  const headingId = useRef('showcase-heading').current
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const planeY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [18, -24])
  const bloomY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [28, -42])

  // Enable the 3D tilt only on fine-pointer, motion-friendly devices, and only
  // after mount — so SSR / first paint / touch / reduced-motion stay flat and
  // there is never a hydration mismatch.
  useEffect(() => {
    if (reduce) { setInteractive(false); return }
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const apply = () => setInteractive(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [reduce])

  return (
    <section ref={sectionRef} aria-labelledby={headingId} className="relative overflow-hidden py-16 md:py-24">
      {/* Perspective-grid horizon behind the showcase (decorative). */}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[26rem]" style={{ y: planeY }}>
        <div className="pgrid-plane" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(48rem_24rem_at_50%_-8%,rgba(69,213,242,0.08),transparent_60%)]"
        style={{ y: bloomY }}
      />

      <div className="container-edge relative">
        <p className="eyebrow reveal" aria-hidden="true"><span>01</span><span>The collection</span></p>
        <h2 id={headingId} className="reveal mt-4 max-w-2xl text-3xl leading-tight md:text-4xl">
          Apps, experiments and research.
        </h2>
        <p
          className="reveal mt-4 max-w-[52ch] text-base leading-relaxed text-ink"
          style={{ ['--reveal-delay' as string]: '0.06s' }}
        >
          See what each project does, how to use it and what is still being built.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {MAIN_PROJECTS.map((product, i) => (
            <ProjectCard
              key={product.slug}
              product={product}
              index={i}
              interactive={interactive}
            />
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-6 rounded-2xl border border-hairline bg-card p-6 lg:flex-row lg:items-center lg:justify-between">
          <div><h3 className="text-xl">Orthopaedic tools & research</h3><p className="mt-2 text-sm text-ink">Log cases, prepare for interviews, organise your portfolio and explore shoulder research.</p></div>
          <Link to="/orthopaedics" className="flex flex-wrap items-center gap-3 text-sm font-medium text-accent">
            <span className="flex">{ORTHOPAEDIC_PROJECTS.map(project => <ProductLogo key={project.slug} slug={project.slug} className="!h-9 !w-9" />)}</span>
            Explore the projects →
          </Link>
        </div>
      </div>
    </section>
  )
}
