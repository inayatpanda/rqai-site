import { motion, useReducedMotion } from 'framer-motion'

/**
 * Chapbook: a captured idea (a single accent node) drafts into a short post —
 * three lines write themselves in sequence — then a warm "published" mark
 * appears (idea -> draft -> publish). Abstract, no real text; matches the
 * left -> arrow -> right rhythm of the other micro-demos.
 */
const LINES = ['100%', '85%', '60%']

export function ChapbookDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      {/* Captured idea */}
      <motion.span
        className="h-2.5 w-2.5 flex-none rounded-full bg-accent"
        initial={reduce ? false : { scale: 0.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? undefined : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />

      <span className="flex-none text-accent/60">&rarr;</span>

      {/* Drafting lines */}
      <div className="flex flex-1 flex-col gap-1.5">
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
                : { duration: 0.45, delay: 0.25 + i * 0.16, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </div>

      {/* Published mark (warm counterpoint) */}
      <motion.span
        className="h-2.5 w-2.5 flex-none rounded-full bg-accentWarm"
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? undefined : { duration: 0.4, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
