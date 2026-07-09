import { motion, useReducedMotion } from 'framer-motion'

/**
 * ResearchAssistant: scattered evidence (a loose cluster of source dots)
 * condenses into a single grounded finding, finished by an inline citation
 * chip. Evidence in, cited draft out.
 */
const DOTS = [
  { x: 0, y: -10 },
  { x: 12, y: 4 },
  { x: 2, y: 12 },
  { x: -10, y: 2 },
  { x: -4, y: -2 },
]

export function ResearchAssistantDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      {/* Evidence cluster */}
      <div className="relative h-9 w-9 flex-none">
        {DOTS.map((d, i) => (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-accent/80"
            style={{ marginLeft: d.x, marginTop: d.y }}
            initial={reduce ? false : { opacity: 0, scale: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce ? undefined : { duration: 0.35, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </div>

      <span className="flex-none text-accent/60">&rarr;</span>

      {/* The grounded finding, written and cited. Illustrative mock content. */}
      <motion.div
        className="min-w-0 max-w-[9rem] rounded-md border border-hairline bg-canvas/60 p-1.5"
        initial={reduce ? false : { opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? undefined : { duration: 0.45, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-[0.5rem] leading-tight text-ink">
          Early mobilisation reduced pain at 24 hours
          {/* Citation chip: the claim is grounded */}
          <motion.span
            className="ml-1 inline-block rounded-md border border-accent/40 bg-accent/10 px-1 align-baseline font-mono text-[0.5rem] font-medium text-accent"
            initial={reduce ? false : { opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce ? undefined : { duration: 0.4, delay: 1.15, ease: [0.16, 1, 0.3, 1] }
            }
          >
            [1]
          </motion.span>
        </p>
      </motion.div>
    </div>
  )
}
