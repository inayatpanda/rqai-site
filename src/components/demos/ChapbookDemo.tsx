import { motion, useReducedMotion } from 'framer-motion'

/**
 * Chapbook: two chat bubbles are typed and sent, then resolve into a post
 * card with a warm "live on your own site" mark (chat in, post live).
 */

/* Illustrative mock content. */
const BUBBLES = ['the towpath at dawn, mist over the water', "add this morning's photo"] as const

export function ChapbookDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      {/* Chat bubbles */}
      <div className="flex w-24 flex-none flex-col items-end gap-1.5">
        {BUBBLES.map((text, i) => (
          <motion.span
            key={i}
            className="block max-w-full rounded-lg rounded-br-sm border border-accent/20 bg-accent/20 px-1.5 py-0.5 text-[0.45rem] leading-tight text-ink"
            style={{ transformOrigin: 'right' }}
            initial={reduce ? false : { scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce ? undefined : { duration: 0.4, delay: i * 0.22, ease: [0.16, 1, 0.3, 1] }
            }
          >
            {text}
          </motion.span>
        ))}
      </div>

      <span className="flex-none text-accent/60">&rarr;</span>

      {/* The published post card. Illustrative mock content. */}
      <motion.div
        className="min-w-0 flex-1 rounded-lg border border-hairline bg-ink/10 p-2"
        initial={reduce ? false : { opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? undefined : { duration: 0.45, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="block text-[0.5rem] font-semibold leading-tight text-inkStrong">
          The towpath at dawn
        </span>
        <span className="mt-1 block text-[0.45rem] leading-tight text-inkMuted">
          Mist, a kingfisher, and the quiet before the city wakes.
        </span>
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
