import { motion, useReducedMotion } from 'framer-motion'

/**
 * Scribble: a note assembles from typed blocks (heading, text, a sticker
 * tile) and an on-device pulse settles beside it: block editor, nothing
 * leaving the device. Replaces the old pen-stroke squiggle, which wrongly
 * implied handwriting. Abstract, no real text.
 */
export function ScribbleDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      {/* The note, block by block */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <motion.span
          className="block h-2 w-2/3 rounded-full bg-ink/40"
          style={{ transformOrigin: 'left' }}
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="flex items-center gap-1.5">
          <motion.span
            className="block h-1.5 flex-1 rounded-full bg-ink/25"
            style={{ transformOrigin: 'left' }}
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={reduce ? undefined : { duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Sticker tile */}
          <motion.span
            className="block h-4 w-4 flex-none rounded-[4px] border border-accentWarm/50 bg-accentWarm/25"
            initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: -12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={reduce ? undefined : { duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <motion.span
          className="block h-1.5 w-1/2 rounded-full bg-ink/25"
          style={{ transformOrigin: 'left' }}
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 0.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* On-device pulse: a dot held inside its ring */}
      <div className="relative h-6 w-6 flex-none">
        <motion.span
          className="absolute inset-0 rounded-full border border-accent/40"
          initial={reduce ? false : { opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 0.45, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.span
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          initial={reduce ? false : { opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 0.35, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}
