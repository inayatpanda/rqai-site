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
import { PRODUCTS, type Product } from '../data/products'

/*
 * PerspectiveShowcase — the seven RQAI projects as a perspective-grid of cards
 * (the design's second house signature, styled for the dark-blue canvas).
 *
 * Legibility first: every card is a flat, fully readable, tappable <Link> to its
 * internal project page in the base state. The perspective is an ENHANCEMENT —
 * on a fine-pointer device the card tilts a few degrees toward the cursor with a
 * soft cyan spotlight (Motion values, never React state, so it never re-renders
 * the tree). Touch, reduced-motion and no-JS all get the still, flat card.
 *
 * Odd count handled deliberately: on the widest breakpoint the seven cards sit
 * on a six-column grid in a 3-3 · 4-2 · 2-2-2 rhythm (flagships lead) so every
 * row fills exactly, no orphan tile. On tablet the trailing card spans the full
 * width to close the 2-column grid cleanly.
 */

// Column spans on the lg six-column grid, in PRODUCTS order. Flagships lead:
// ResearchAssistant + ClinicalPROMs share row one, Chapbook anchors row two
// at width 4, and the remaining projects close the grid in balanced rows.
const LG_SPAN = [
  'lg:col-span-3',
  'lg:col-span-3',
  'lg:col-span-4',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
] as const

const MAX_TILT = 6 // degrees — small, so text never becomes hard to read

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="text-inkMuted transition-all duration-300 ease-out-soft group-hover:translate-x-1 group-hover:text-accent"
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
  const { name, slug, tagline, hook, flagship, Demo } = product

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
  const spotlight = useMotionTemplate`radial-gradient(20rem 20rem at ${gx} ${gy}, rgba(69,213,242,0.14), transparent 60%)`

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
      className={`reveal ${LG_SPAN[index]} ${
        index === PRODUCTS.length - 1 ? 'md:col-span-2' : ''
      }`}
      style={{ perspective: 900, ['--reveal-delay' as string]: `${index * 0.06}s` }}
    >
      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        <Link
          to={`/${slug}`}
          aria-label={`${name}: ${tagline}`}
          className={`pgrid-card group relative flex h-full ${flagship ? 'min-h-[15.5rem]' : 'min-h-[13.5rem]'} flex-col overflow-hidden rounded-2xl border border-hairline bg-card p-6 shadow-soft`}
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
            {/* Micro-demo, given a settled frame so cards align. */}
            <div className="flex h-14 min-w-0 flex-1 items-center">
              <Demo />
            </div>
          </div>

          <h3 className="relative mt-6 font-display text-xl font-semibold text-inkStrong">
            {name}
          </h3>
          <p className="relative mt-2 text-sm leading-relaxed text-inkMuted">{tagline}</p>
          {flagship && hook && (
            <p className="relative mt-3 text-sm leading-relaxed text-ink">{hook}</p>
          )}

          <div className="relative mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-ink">
            <span className="transition-colors duration-300 group-hover:text-accent">
              Open project
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
    if (reduce) return
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
        <p className="eyebrow reveal" aria-hidden="true"><span>01</span><span>Projects</span></p>
        <h2 id={headingId} className="reveal mt-4 max-w-2xl text-3xl leading-tight md:text-4xl">
          Seven projects, each built to do real work.
        </h2>
        <p
          className="reveal mt-4 max-w-[52ch] text-base leading-relaxed text-ink"
          style={{ ['--reveal-delay' as string]: '0.06s' }}
        >
          Each one is its own tool, made for a specific person and moment. Open a
          project to see what it does, how it works and where to get it.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {PRODUCTS.map((product, i) => (
            <ProjectCard
              key={product.slug}
              product={product}
              index={i}
              interactive={interactive}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
