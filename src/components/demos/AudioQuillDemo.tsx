import { motion, useReducedMotion } from 'framer-motion'

/**
 * AudioQuill: animated waveform bars that resolve into two tidy text lines
 * (speech -> text). Bars pulse subtly on a loop; on hover they settle, hinting
 * at the transcription "resolving".
 */
const BARS = [0.35, 0.7, 0.5, 0.95, 0.55, 0.8, 0.4, 0.9, 0.6, 0.45, 0.75, 0.5]

export function AudioQuillDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3">
      {/* Waveform */}
      <div className="flex h-9 flex-none items-center gap-[3px]" aria-hidden="true">
        {BARS.map((h, i) => (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-accent"
            style={{ height: `${Math.round(h * 100)}%`, transformOrigin: 'center' }}
            initial={reduce ? false : { scaleY: 0.3 }}
            animate={
              reduce
                ? { scaleY: 1 }
                : { scaleY: [0.3, 1, 0.45] }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration: 1.4,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                    delay: i * 0.06,
                  }
            }
          />
        ))}
      </div>

      {/* Resolved text lines */}
      <div className="flex flex-1 flex-col gap-1.5" aria-hidden="true">
        <motion.span
          className="block h-1.5 rounded-full bg-ink/30"
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={reduce ? undefined : { duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />
        <motion.span
          className="block h-1.5 w-3/5 rounded-full bg-ink/20"
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={reduce ? undefined : { duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </div>
  )
}
