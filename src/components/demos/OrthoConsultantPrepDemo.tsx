import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { Check } from 'lucide-react'

/**
 * OrthoConsultantPrep: a short checklist that ticks its items in sequence as it
 * scrolls into view (structured preparation). Abstract bars + tick icons.
 */
const ITEMS = ['90%', '75%', '85%']

export function OrthoConsultantPrepDemo() {
  const reduce = useReducedMotion()

  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.22 } },
  }
  const item: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0.35 },
        show: { opacity: 1, transition: { duration: 0.3 } },
      }

  return (
    <motion.ul
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      className="flex flex-col gap-2"
      aria-hidden="true"
    >
      {ITEMS.map((w, i) => (
        <motion.li key={i} variants={item} className="flex items-center gap-2">
          <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-accent-grad text-bg">
            <Check size={11} strokeWidth={3} />
          </span>
          <span className="block h-1.5 rounded-full bg-fg/20" style={{ width: w }} />
        </motion.li>
      ))}
    </motion.ul>
  )
}
