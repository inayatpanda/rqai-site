import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export function About() {
  const reduce = useReducedMotion()

  return (
    <section aria-labelledby="about-title" className="py-4 sm:py-5">
      <h2
        id="about-title"
        className="mb-2.5 text-xs font-bold uppercase tracking-[0.08em] text-accent-cyan"
      >
        About
      </h2>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-xl border border-hairline bg-surface p-4"
      >
        <p className="m-0 text-base font-bold text-fg">Inayat Panda</p>
        <p className="m-0 mt-0.5 text-[0.8125rem] text-muted">
          Trauma and Orthopaedic surgeon &middot; Gloucester, United Kingdom
        </p>
        <a
          href="https://inayatpanda.com"
          rel="noopener"
          className="mt-2.5 inline-flex items-center gap-1 text-[0.8125rem] text-accent-cyan no-underline transition-colors duration-200 hover:text-accent-teal"
        >
          inayatpanda.com
          <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.75} />
        </a>
      </motion.div>
    </section>
  )
}
