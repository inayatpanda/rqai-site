import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Constellation } from './Constellation'

/**
 * Decorative three-plane field for the hub hero. Content always sits outside
 * this component: the field may create depth but can never obscure or capture
 * the page's reading and navigation surfaces.
 */
export function ParallaxField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const gridY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [12, -18])
  const constellationY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [20, -34])
  const bloomY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -52])

  return (
    <div ref={ref} aria-hidden="true" className={`parallax-field pointer-events-none ${className}`}>
      <motion.div className="parallax-field__grid" style={{ y: gridY }} />
      <motion.div className="parallax-field__constellation" style={{ y: constellationY }}>
        <Constellation tone="accent" className="h-full w-full" />
      </motion.div>
      <motion.div className="parallax-field__bloom" style={{ y: bloomY }} />
    </div>
  )
}
