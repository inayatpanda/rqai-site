import { motion, useReducedMotion, type Variants } from 'framer-motion'

/**
 * ResearchAssistant: several "search result" lines stagger in, then condense to
 * two short summary bullet lines (search -> summary). Abstract bars, no data.
 */
const RESULTS = ['85%', '70%', '92%', '60%']

export function ResearchAssistantDemo() {
  const reduce = useReducedMotion()

  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
  }
  const row: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: -8 },
        show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
      }

  return (
    <div className="flex items-stretch gap-3" aria-hidden="true">
      {/* Search results condensing */}
      <motion.div
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="flex flex-1 flex-col justify-center gap-1.5"
      >
        {RESULTS.map((w, i) => (
          <motion.span
            key={i}
            variants={row}
            className="block h-1.5 rounded-full bg-ink/20"
            style={{ width: w }}
          />
        ))}
      </motion.div>

      <span className="flex-none self-center text-accent/60">&rarr;</span>

      {/* Summary: two accent bullet lines */}
      <div className="flex flex-1 flex-col justify-center gap-1.5">
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="flex items-center gap-1.5"
            initial={reduce ? false : { opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={reduce ? undefined : { duration: 0.4, delay: 0.5 + i * 0.12 }}
          >
            <span className="h-1 w-1 flex-none rounded-full bg-accent" />
            <span
              className="block h-1.5 rounded-full bg-accent/70"
              style={{ width: i === 0 ? '100%' : '70%' }}
            />
          </motion.span>
        ))}
      </div>
    </div>
  )
}
