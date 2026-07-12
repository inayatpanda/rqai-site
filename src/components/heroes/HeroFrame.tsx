import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Constellation } from '../Constellation'

/*
 * HeroFrame: the browser-window chrome that frames an animated hero scene on a
 * project page. The chrome is shared by every project hero so the set reads as
 * one system, only now the body holds a live product simulation rather than a
 * static screenshot.
 *
 * A decorative radial glow and a faint constellation sit behind, aria-hidden,
 * matching DemoStage. Scene bodies fill the frame body and paint their own
 * bg-canvas surface at a fixed height, so the layout never shifts as beats play.
 *
 * Contract: <HeroFrame frame='browser' host? tone? className?>{scene}</HeroFrame>
 *   browser: a rounded window with three dots and a host pill; children fill the body.
 */
export function HeroFrame({
  host,
  tone = 'accent',
  className = '',
  children,
}: {
  /** kept for call-site symmetry; only the browser window is rendered. */
  frame?: 'browser'
  /** faux address shown in the window bar. */
  host?: string
  tone?: 'accent' | 'ink'
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const backgroundY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [9, -9])
  const frameY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [5, -11])

  return (
    <div ref={ref} className={`relative flex items-center justify-center ${className}`}>
      <motion.div
        aria-hidden="true"
        className="hero-frame-glow pointer-events-none absolute inset-0"
        style={{ y: backgroundY }}
      />
      <Constellation
        tone={tone}
        className="pointer-events-none absolute -bottom-6 left-1/2 h-24 w-[130%] -translate-x-1/2 opacity-[0.10]"
      />
      <motion.div style={{ y: frameY }} className="hero-frame-window relative w-full overflow-hidden rounded-2xl border bg-card shadow-lift">
        <div className="hero-frame-chrome flex items-center gap-2 border-b px-4 py-2.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-inkMuted/40" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-inkMuted/40" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-inkMuted/40" />
          {host && (
            <span className="ml-3 truncate rounded-md bg-inkStrong/10 px-2.5 py-0.5 font-mono text-[0.65rem] text-inkMuted">
              {host}
            </span>
          )}
        </div>
        {children}
      </motion.div>
    </div>
  )
}
