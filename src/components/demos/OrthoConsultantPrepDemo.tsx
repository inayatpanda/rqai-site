import { motion, useReducedMotion } from 'framer-motion'

/**
 * OrthoConsultantPrep: a question line sits on a live interview clock; the
 * ring runs down and shifts to the urgency colour, the way the real timed
 * mock does.
 */
export function OrthoConsultantPrepDemo() {
  const reduce = useReducedMotion()

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      {/* Interview clock */}
      <div className="relative h-10 w-10 flex-none">
        <svg viewBox="0 0 40 40" fill="none" className="h-full w-full -rotate-90">
          <circle cx="20" cy="20" r="16" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" />
          <motion.circle
            cx="20"
            cy="20"
            r="16"
            strokeWidth="3"
            strokeLinecap="round"
            initial={reduce ? { pathLength: 0.3, stroke: '#f4b05a' } : { pathLength: 1, stroke: '#45d5f2' }}
            whileInView={
              reduce ? {} : { pathLength: 0.3, stroke: ['#45d5f2', '#45d5f2', '#f4b05a'] }
            }
            viewport={{ once: true, amount: 0.6 }}
            transition={reduce ? undefined : { duration: 2.2, delay: 0.3, ease: 'linear' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.5rem] font-medium text-ink">
          3:00
        </span>
      </div>

      {/* Question card */}
      <motion.div
        className="min-w-0 flex-1 rounded-lg border border-hairline bg-ink/10 p-2"
        initial={reduce ? false : { opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? undefined : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Illustrative mock content. */}
        <span className="block text-[0.5rem] font-medium leading-tight text-ink">
          Your unit keeps missing the 4-hour target.
        </span>
        <span className="mt-1 block text-[0.45rem] leading-tight text-inkMuted">
          As the new consultant, what do you do?
        </span>
      </motion.div>
    </div>
  )
}
