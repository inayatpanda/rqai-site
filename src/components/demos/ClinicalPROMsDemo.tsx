import { motion, useReducedMotion } from 'framer-motion'

/**
 * ClinicalPROMs: a recovery trajectory draws itself across follow-up
 * timepoints and crosses a dashed reference line (the MCID), the moment a
 * score change becomes clinically meaningful. Abstract, no real data.
 */
const POINTS = [
  { x: 8, y: 44 },
  { x: 42, y: 38 },
  { x: 78, y: 24 },
  { x: 112, y: 10 },
]

export function ClinicalPROMsDemo() {
  const reduce = useReducedMotion()
  const path = `M ${POINTS.map((p) => `${p.x} ${p.y}`).join(' L ')}`

  return (
    <div className="w-full max-w-[10rem]" aria-hidden="true">
      <svg viewBox="0 0 120 52" fill="none" className="block w-full">
        {/* Dashed MCID reference line */}
        <motion.line
          x1="4"
          y1="20"
          x2="116"
          y2="20"
          stroke="#f4b05a"
          strokeOpacity="0.55"
          strokeWidth="1.4"
          strokeDasharray="4 4"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 0.4 }}
        />
        {/* Trajectory */}
        <motion.path
          d={path}
          stroke="#45d5f2"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={reduce ? undefined : { duration: 1.1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
        {/* Follow-up timepoints */}
        {POINTS.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="2.6"
            fill="#45d5f2"
            initial={reduce ? false : { opacity: 0, scale: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={
              reduce ? undefined : { duration: 0.3, delay: 0.3 + i * 0.26, ease: [0.16, 1, 0.3, 1] }
            }
          />
        ))}
      </svg>
    </div>
  )
}
