import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion'

/**
 * OrthoPortfolio: a logged-cases tally counts up (tabular-nums) while small bars
 * grow, when scrolled into view (surgical logbook). Abstract counts, no data.
 */
const TARGET = 248
const BARS = ['45%', '70%', '55%', '90%', '65%']

export function OrthoPortfolioDemo() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [count, setCount] = useState(reduce ? TARGET : 0)

  useEffect(() => {
    if (reduce || !inView) return
    const controls = animate(0, TARGET, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduce])

  const bars: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
  }
  const bar: Variants = reduce
    ? { hidden: { scaleY: 1 }, show: { scaleY: 1 } }
    : {
        hidden: { scaleY: 0 },
        show: { scaleY: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      }

  return (
    <div ref={ref} className="flex items-end gap-3" aria-hidden="true">
      <div className="leading-tight">
        <div className="text-lg font-bold tabular-nums text-inkStrong">{count}</div>
        <div className="text-[0.6875rem] text-inkMuted">cases logged</div>
      </div>
      <motion.div
        variants={bars}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="flex h-9 flex-1 items-end justify-end gap-[5px]"
      >
        {BARS.map((h, i) => (
          <motion.span
            key={i}
            variants={bar}
            className="w-2 rounded-sm bg-accent"
            style={{ height: h, transformOrigin: 'bottom' }}
          />
        ))}
      </motion.div>
    </div>
  )
}
