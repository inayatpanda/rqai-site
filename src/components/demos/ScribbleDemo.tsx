import { motion, useReducedMotion } from 'framer-motion'

/**
 * Scribble: a hand-drawn underline/pen stroke draws itself, then two short note
 * lines appear (a quick captured note). Abstract, no real text.
 */
export function ScribbleDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex flex-col gap-2" aria-hidden="true">
      <svg viewBox="0 0 120 24" className="h-6 w-full" fill="none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="scribble-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#45d5f2" />
            <stop offset="0.7" stopColor="#45d5f2" />
            <stop offset="1" stopColor="#f4b05a" />
          </linearGradient>
        </defs>
        {/* A loose, scribbled pen stroke that draws itself */}
        <motion.path
          d="M3 14 C 20 4, 34 22, 52 12 S 86 4, 104 14 S 116 18, 117 12"
          stroke="url(#scribble-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="flex flex-col gap-1.5">
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="block h-1.5 rounded-full bg-ink/25"
            style={{ width: i === 0 ? '100%' : '55%', transformOrigin: 'left' }}
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={reduce ? undefined : { duration: 0.4, delay: 0.9 + i * 0.12 }}
          />
        ))}
      </div>
    </div>
  )
}
