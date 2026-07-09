import { motion, useReducedMotion } from 'framer-motion'

/**
 * ResearchAssistant: scattered evidence (a loose cluster of source dots)
 * condenses into manuscript lines that write themselves, finished by a tiny
 * citation chip. Evidence in, cited draft out. Abstract, no real text.
 */
const DOTS = [
  { x: 0, y: -10 },
  { x: 12, y: 4 },
  { x: 2, y: 12 },
  { x: -10, y: 2 },
  { x: -4, y: -2 },
]
const LINES = ['100%', '92%', '58%']

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

      {/* Manuscript lines writing themselves */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {LINES.map((w, i) => (
          <motion.span
            key={i}
            className="block h-1.5 rounded-full bg-ink/25"
            style={{ width: w, transformOrigin: 'left' }}
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce
                ? undefined
                : { duration: 0.45, delay: 0.5 + i * 0.16, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </div>

      {/* Citation chip: the claim is grounded */}
      <motion.span
        className="flex-none rounded-md border border-accent/40 bg-accent/10 px-1.5 py-0.5 font-mono text-[0.55rem] font-medium text-accent"
        initial={reduce ? false : { opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? undefined : { duration: 0.4, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
      >
        [1]
      </motion.span>
    </div>
  )
}
