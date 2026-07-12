import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { PRODUCTS } from '../data/products'

type Fragment = { x: string; y: string; rotate: number; delay: number }

const FRAGMENTS: Fragment[] = [
  { x: '-34vw', y: '-19vh', rotate: -10, delay: 0.18 },
  { x: '-10vw', y: '-29vh', rotate: -4, delay: 0.24 },
  { x: '17vw', y: '-20vh', rotate: 8, delay: 0.3 },
  { x: '34vw', y: '-4vh', rotate: 12, delay: 0.36 },
  { x: '25vw', y: '20vh', rotate: 7, delay: 0.42 },
  { x: '-3vw', y: '28vh', rotate: -3, delay: 0.48 },
  { x: '-31vw', y: '17vh', rotate: -10, delay: 0.54 },
]

/**
 * The hub's long-form opening: one signal becomes a field of seven tools as
 * scrolling progresses. Cards are links throughout; the canvas is decorative.
 */
export function ProductOrbit() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion() === true
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const titleY = useTransform(scrollYProgress, [0, 0.26, 0.55], reduce ? [0, 0, 0] : [0, -24, -78])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.38, 0.58], [1, 1, 0])
  const gridY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [46, -76])
  const coreScale = useTransform(scrollYProgress, [0, 0.22, 0.58], reduce ? [1, 1, 1] : [0.32, 1, 0.55])
  const coreOpacity = useTransform(scrollYProgress, [0, 0.12, 0.68], [0.25, 1, 0])
  const promptOpacity = useTransform(scrollYProgress, [0.38, 0.6, 1], [0, 1, 1])

  return (
    <section ref={ref} className="orbit-scroll relative h-[220vh] overflow-clip" aria-labelledby="orbit-heading">
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

        <motion.div className="container-edge relative z-10 pt-20 md:pt-28" style={{ y: titleY, opacity: titleOpacity }}>
          <p className="eyebrow">RQAI / connected tools</p>
          <h1 id="orbit-heading" className="mt-5 max-w-4xl text-[clamp(2.8rem,7.6vw,6.3rem)] leading-[0.91] tracking-[-0.055em]">
            Work, in motion.<br />
            <span className="text-accent">Hours, returned.</span>
          </h1>
          <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-ink md:text-xl">
            Seven focused tools for research, clinical work and writing. Scroll through the system, then choose the surface that fits the job.
          </p>
          <span className="orbit-scroll-label mt-10 inline-flex items-center gap-3 text-sm text-inkMuted"><i /> Scroll to unfold</span>
        </motion.div>

        <div className="orbit-fragments" aria-label="RQAI projects">
          {PRODUCTS.map((product, index) => {
            const fragment = FRAGMENTS[index]
            const x = useTransform(scrollYProgress, [0, 0.22, 0.62, 1], reduce ? [fragment.x, fragment.x, fragment.x, fragment.x] : ['0vw', '0vw', fragment.x, fragment.x])
            const y = useTransform(scrollYProgress, [0, 0.22, 0.62, 1], reduce ? [fragment.y, fragment.y, fragment.y, fragment.y] : ['0vh', '0vh', fragment.y, fragment.y])
            const scale = useTransform(scrollYProgress, [0, 0.26, 0.6], reduce ? [1, 1, 1] : [0.12, 0.5, 1])
            const opacity = useTransform(scrollYProgress, [0, fragment.delay, 0.48], [0, 0, 1])
            const rotate = useTransform(scrollYProgress, [0, 0.46, 0.7], reduce ? [fragment.rotate, fragment.rotate, fragment.rotate] : [0, 0, fragment.rotate])
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
