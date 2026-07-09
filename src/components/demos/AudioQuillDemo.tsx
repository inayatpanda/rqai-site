import { motion, useReducedMotion } from 'framer-motion'

/**
 * AudioQuill: a burst of speech (waveform bars) becomes structured writing,
 * a heading then tidy body prose, the clean-and-structure step that plain
 * dictation lacks.
 */
const WAVE = [10, 22, 14, 26, 12, 18]

export function AudioQuillDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      {/* Spoken waveform */}
      <div className="flex h-8 flex-none items-center gap-[3px]">
        {WAVE.map((h, i) => (
          <motion.span
            key={i}
            className="block w-[3px] rounded-full bg-accent/70"
            style={{ height: h }}
            initial={reduce ? false : { scaleY: 0.2, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce ? undefined : { duration: 0.3, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </div>

      <span className="flex-none text-accent/60">&rarr;</span>

      {/* Structured writing: heading, then body. Illustrative mock content. */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <motion.span
          className="block text-[0.5rem] font-semibold leading-tight text-inkStrong"
          initial={reduce ? false : { opacity: 0, y: 3 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 0.4, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          Chapter one
        </motion.span>
        <motion.span
          className="block text-[0.45rem] leading-tight text-inkMuted"
          initial={reduce ? false : { opacity: 0, y: 3 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 0.45, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          I grew up where the sea kept the time, and every story started with weather.
        </motion.span>
      </div>
    </div>
  )
}
