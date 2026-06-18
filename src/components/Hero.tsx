import { motion, useReducedMotion, type Variants } from 'framer-motion'

export function Hero() {
  const reduce = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.05 },
    },
  }

  const item: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }

  return (
    <header className="relative overflow-hidden">
      {/* Decorative accent radial glow behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 80% at 50% -10%, rgba(34,211,238,0.16), transparent 70%), radial-gradient(50% 70% at 80% 0%, rgba(129,140,248,0.14), transparent 70%)',
        }}
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-5xl px-5 pb-6 pt-12 text-center sm:pt-14"
      >
        <motion.h1
          variants={item}
          className="text-gradient m-0 text-[clamp(2.5rem,9vw,4.25rem)] font-extrabold leading-none tracking-[-0.04em]"
        >
          RQAI
        </motion.h1>
        <motion.p
          variants={item}
          className="mx-auto mt-3 max-w-[34ch] text-[clamp(1rem,2.4vw,1.25rem)] font-semibold text-fg"
        >
          Focused software for clinical work, built by a clinician.
        </motion.p>
        <motion.p variants={item} className="mx-auto mt-1.5 max-w-[48ch] text-[0.8125rem] text-muted">
          A small studio making a handful of tools that each do one job well.
        </motion.p>
      </motion.div>
    </header>
  )
}
