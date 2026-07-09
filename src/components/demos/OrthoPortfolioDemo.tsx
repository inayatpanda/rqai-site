import { motion, useReducedMotion } from 'framer-motion'

/**
 * OrthoPortfolio: a scatter of loose documents files itself into a neat
 * grid of section slots, and a readiness tick lands. Evidence in,
 * submission-ready sections out. Abstract, no real data.
 */
const DOCS = [-8, 0, 8]

export function OrthoPortfolioDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      {/* Loose documents, slightly fanned */}
      <div className="relative h-10 w-9 flex-none">
        {DOCS.map((r, i) => (
          <motion.span
            key={i}
            className="absolute inset-x-1 top-1 block h-8 rounded-[3px] border border-hairline bg-ink/15"
            style={{ rotate: r }}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce ? undefined : { duration: 0.35, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </div>

      <span className="flex-none text-accent/60">&rarr;</span>

      {/* Section slots filling */}
      <div className="grid flex-1 grid-cols-2 gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="block h-4 rounded-[4px] border border-accent/30 bg-accent/15"
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce
                ? undefined
                : { duration: 0.3, delay: 0.45 + i * 0.12, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </div>

      {/* Readiness tick */}
      <motion.svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="flex-none"
        initial={reduce ? false : { opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? undefined : { duration: 0.35, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <path
          d="m3 8.5 3.2 3L13 5"
          stroke="#f4b05a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  )
}
