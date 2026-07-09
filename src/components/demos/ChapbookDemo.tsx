import { motion, useReducedMotion } from 'framer-motion'

/**
 * Chapbook: two chat bubbles are typed and sent, then resolve into a post
 * card with a warm "live on your own site" mark (chat in, post live).
 * Abstract, no real text.
 */
export function ChapbookDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      {/* Chat bubbles */}
      <div className="flex w-16 flex-none flex-col items-end gap-1.5">
        {(['100%', '70%'] as const).map((w, i) => (
          <motion.span
            key={i}
            className="block h-3 rounded-lg rounded-br-sm bg-accent/25"
            style={{ width: w, transformOrigin: 'right' }}
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce
                ? undefined
                : { duration: 0.4, delay: i * 0.22, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </div>

      <span className="flex-none text-accent/60">&rarr;</span>

      {/* The published post card */}
      <motion.div
        className="min-w-0 flex-1 rounded-lg border border-hairline bg-ink/10 p-2"
        initial={reduce ? false : { opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? undefined : { duration: 0.45, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="block h-1.5 w-3/4 rounded-full bg-ink/40" />
        <span className="mt-1.5 block h-1 w-full rounded-full bg-ink/25" />
        <span className="mt-1 block h-1 w-2/3 rounded-full bg-ink/25" />
      </motion.div>

      {/* Live on your own site */}
      <motion.span
        className="h-2.5 w-2.5 flex-none rounded-full bg-accentWarm"
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? undefined : { duration: 0.4, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
