import { motion, useReducedMotion } from 'framer-motion'

/** A source image becomes a reviewed case and a reflection. Illustrative only. */
export function OrthoLogDemo() {
  const reduce = useReducedMotion()
  return (
    <div className="flex items-center justify-center gap-2" aria-hidden="true">
      <motion.span className="grid h-10 w-10 place-items-center rounded-lg border border-hairline bg-ink/15" initial={reduce ? false : { opacity: 0, y: 5 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none"><path d="M6 7h3l1.2-2h3.6L15 7h3v11H6z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12.5" r="3" stroke="#f4b05a" strokeWidth="1.5"/></svg>
      </motion.span>
      <span className="text-accent/60">→</span>
      <motion.span className="flex h-10 w-16 flex-col justify-center gap-1 rounded-lg border border-accent/30 bg-accent/10 px-2" initial={reduce ? false : { opacity: 0, scale: .82 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={reduce ? undefined : { delay: .35 }}>
        <span className="h-1 w-10 rounded bg-accent/70"/><span className="h-1 w-7 rounded bg-accent/40"/><span className="h-1 w-9 rounded bg-accent/40"/>
      </motion.span>
      <span className="text-accent/60">→</span>
      <motion.span className="grid h-10 w-10 place-items-center rounded-full border border-[#f4b05a]/50 bg-[#f4b05a]/15 text-[#f4b05a]" initial={reduce ? false : { opacity: 0, scale: .5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={reduce ? undefined : { delay: .7 }}>✓</motion.span>
    </div>
  )
}
