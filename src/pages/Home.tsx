import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { EcgTrace } from '../components/EcgTrace'
import { APPS } from '../App'

/*
 * Home — placeholder for the full landing (Task 2 replaces this with the
 * perspective-grid product showcase). It already does the site's core job:
 * a truthful hero, the ECG signature, and working links to every app.
 */
export function Home() {
  const reduce = useReducedMotion()

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-chart-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(120%_90%_at_50%_0%,#000_35%,transparent_85%)]"
        />
        <div className="container-edge relative pb-16 pt-16 md:pb-24 md:pt-24">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl text-4xl leading-[1.05] md:text-6xl"
          >
            Software that does one thing well.
          </motion.h1>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink"
          >
            RQAI is a small independent UK studio building focused, local-first
            tools. No accounts, no tracking.
          </motion.p>
          <EcgTrace tone="teal" className="mt-12 h-20 md:h-28" />
        </div>
      </section>

      <section className="container-edge py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl">The apps</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {APPS.map((app) => (
            <li key={app.slug}>
              <Link
                to={`/${app.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-hairline bg-card p-5 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-teal hover:shadow-lift"
              >
                <span className="font-display text-lg font-semibold text-inkStrong">
                  {app.name}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="text-inkMuted transition-all duration-300 group-hover:translate-x-1 group-hover:text-teal"
                >
                  <path
                    d="M2 8h11M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-edge py-12 md:py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-hairline bg-paper p-8 sm:flex-row sm:items-center">
          <p className="max-w-xl text-lg leading-relaxed text-ink">
            Built and maintained by one small independent UK studio. Buy once or
            subscribe simply.
          </p>
          <Link
            to="/about"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-medium text-card transition-transform duration-300 ease-out-soft hover:-translate-y-0.5"
          >
            Read our approach
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M2 8h11M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
