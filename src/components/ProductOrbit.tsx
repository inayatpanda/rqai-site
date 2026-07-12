import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { PRODUCTS } from '../data/products'

type Fragment = { x: string; y: string; rotate: number; delay: number }

const FRAGMENTS: Fragment[] = [
  { x: '-42vw', y: '-19vh', rotate: -10, delay: 0.16 },
  { x: '-17vw', y: '-31vh', rotate: -4, delay: 0.21 },
  { x: '15vw', y: '-23vh', rotate: 8, delay: 0.26 },
  { x: '42vw', y: '-5vh', rotate: 12, delay: 0.31 },
  { x: '31vw', y: '22vh', rotate: 7, delay: 0.36 },
  { x: '-2vw', y: '30vh', rotate: -3, delay: 0.41 },
  { x: '-32vw', y: '20vh', rotate: -10, delay: 0.46 },
]

/**
 * The hub's long-form opening: one signal becomes a field of seven tools as
 * scrolling progresses. Cards are links throughout; the canvas is decorative.
 */
export function ProductOrbit() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion() === true
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 72, damping: 24, mass: 0.65 })
  const gridY = useTransform(smoothProgress, [0, 0.2, 0.85, 1], reduce ? [0, 0, 0, 0] : [70, 42, -82, -104])
  const coreScale = useTransform(smoothProgress, [0, 0.18, 0.5, 0.82], reduce ? [1, 1, 1, 1] : [0.25, 0.7, 1.12, 0.5])
  const coreOpacity = useTransform(smoothProgress, [0, 0.12, 0.7, 0.9], reduce ? [1, 1, 1, 1] : [0.2, 1, 0.9, 0])
  const promptOpacity = useTransform(smoothProgress, [0, 0.62, 0.82, 1], reduce ? [1, 1, 1, 1] : [0, 0, 1, 1])

  return (
    <section ref={ref} className="orbit-scroll relative h-[220vh] overflow-clip" aria-label="RQAI system unfolding">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div aria-hidden="true" className="orbit-grid" style={{ y: gridY }} />
        <div aria-hidden="true" className="orbit-vignette" />
        <motion.div aria-hidden="true" className="orbit-core" style={{ scale: coreScale, opacity: coreOpacity }}>
          <span className="orbit-core__ring orbit-core__ring--one" />
          <span className="orbit-core__ring orbit-core__ring--two" />
          <span className="orbit-core__point" />
          <svg viewBox="0 0 200 200" className="orbit-core__paths">
            <path d="M18 124 71 70 112 106 181 40" />
            <path d="m24 151 62-20 36 38 57-55" />
            <path d="m58 28 43 42 35-28 42 28" />
          </svg>
        </motion.div>

        <div aria-hidden="true" className="container-edge relative z-10 pt-9 md:pt-12">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow">RQAI / system unfolding</p>
            <span className="orbit-scroll-label inline-flex items-center gap-3 text-xs text-inkMuted"><i /> Scroll</span>
          </div>
        </div>

        <div className="orbit-fragments" aria-label="RQAI projects">
          {PRODUCTS.map((product, index) => {
            const fragment = FRAGMENTS[index]
            const x = useTransform(smoothProgress, [0, 0.24, 0.72, 1], reduce ? [fragment.x, fragment.x, fragment.x, fragment.x] : ['0vw', '0vw', fragment.x, fragment.x])
            const y = useTransform(smoothProgress, [0, 0.24, 0.72, 1], reduce ? [fragment.y, fragment.y, fragment.y, fragment.y] : ['0vh', '0vh', fragment.y, fragment.y])
            const scale = useTransform(smoothProgress, [0, 0.22, 0.54, 0.78], reduce ? [1, 1, 1, 1] : [0.08, 0.24, 0.72, 1])
            const opacity = useTransform(smoothProgress, [0, fragment.delay, fragment.delay + 0.24, 1], reduce ? [1, 1, 1, 1] : [0, 0, 1, 1])
            const rotate = useTransform(smoothProgress, [0, 0.38, 0.76, 1], reduce ? [fragment.rotate, fragment.rotate, fragment.rotate, fragment.rotate] : [0, 0, fragment.rotate, fragment.rotate])
            return (
              <motion.a
                key={product.slug}
                href={`/${product.slug}`}
                className="orbit-fragment group"
                style={{ x, y, scale, opacity, rotate }}
              >
                <span className="orbit-fragment__number">0{index + 1}</span>
                <span className="orbit-fragment__pulse" />
                <span className="orbit-fragment__name">{product.name}</span>
                <span className="orbit-fragment__tag">{product.tagline}</span>
                <span className="orbit-fragment__arrow">↗</span>
              </motion.a>
            )
          })}
        </div>

        <motion.div className="absolute inset-x-0 bottom-9 z-10 text-center" style={{ opacity: promptOpacity }}>
          <a href="#projects" className="orbit-enter inline-flex items-center gap-3 rounded-full border border-accent/50 bg-canvas/70 px-5 py-3 text-sm font-medium text-inkStrong backdrop-blur transition-colors hover:bg-accent hover:text-canvas">
            Enter the project field <span aria-hidden="true">↓</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
