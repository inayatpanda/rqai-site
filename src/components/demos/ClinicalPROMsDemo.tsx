import { motion, useReducedMotion } from 'framer-motion'

/**
 * ClinicalPROMs: a circular score gauge that fills to a value as it scrolls
 * into view (Oxford-style score out of 48). Abstract — no real data.
 */
const SCORE = 42
const MAX = 48
const R = 16
const CIRC = 2 * Math.PI * R
const fraction = SCORE / MAX

export function ClinicalPROMsDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <svg viewBox="0 0 40 40" className="h-12 w-12 flex-none -rotate-90">
        <defs>
          <linearGradient id="proms-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#45d5f2" />
            <stop offset="0.7" stopColor="#45d5f2" />
            <stop offset="1" stopColor="#f4b05a" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r={R} fill="none" stroke="#2e4374" strokeWidth="4" />
        <motion.circle
          cx="20"
          cy="20"
          r={R}
          fill="none"
          stroke="url(#proms-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          initial={reduce ? false : { strokeDashoffset: CIRC }}
          whileInView={{ strokeDashoffset: CIRC * (1 - fraction) }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="leading-tight">
        <div className="text-base font-bold tabular-nums text-inkStrong">
          {SCORE}
          <span className="text-xs font-medium text-inkMuted"> / {MAX}</span>
        </div>
        <div className="text-[0.6875rem] text-inkMuted">Oxford score</div>
      </div>
    </div>
  )
}
