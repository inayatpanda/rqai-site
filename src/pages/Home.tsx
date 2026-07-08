import { Link } from 'react-router-dom'
import { Constellation } from '../components/Constellation'
import { PerspectiveShowcase } from '../components/PerspectiveShowcase'

/*
 * Home — the front door of the RQAI studio.
 *
 * Three movements: a hero (RQAI wordmark, the truthful tagline and the animated
 * Constellation as the house signature), the perspective-grid project showcase,
 * and a short studio note into /about.
 *
 * No-JS legibility: the hero entrance is pure CSS (the `.reveal` class in
 * index.css), whose hidden start state lives only inside a
 * prefers-reduced-motion:no-preference query. Nothing here renders an inline
 * opacity:0, so the prerendered HTML is fully readable with JavaScript disabled,
 * and reduced-motion users see the copy immediately.
 */
export function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        {/* Restrained luminous wash behind the hero. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(54rem_32rem_at_72%_-12%,rgba(69,213,242,0.10),transparent_62%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_26rem_at_8%_0%,rgba(244,176,90,0.05),transparent_60%)]"
        />

        <div className="container-edge relative pb-14 pt-16 md:pb-20 md:pt-24">
          <p className="reveal font-display text-lg font-semibold tracking-[0.12em] text-inkStrong">
            RQAI
          </p>

          <h1
            className="reveal mt-6 max-w-4xl text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.03]"
            style={{ ['--reveal-delay' as string]: '0.07s' }}
          >
            Focused software for clinical work.
          </h1>

          <p
            className="reveal mt-6 max-w-[54ch] text-lg leading-relaxed text-ink"
            style={{ ['--reveal-delay' as string]: '0.15s' }}
          >
            A small independent UK studio. Every project is local-first, with no
            accounts and no tracking.
          </p>

          {/* The Constellation is the hero signature: ideas linking into insight. */}
          <div
            className="reveal relative mt-14 md:mt-16"
            style={{ ['--reveal-delay' as string]: '0.24s' }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-40 -translate-y-1/2 bg-[radial-gradient(60%_80%_at_50%_50%,rgba(69,213,242,0.10),transparent_70%)]"
            />
            <Constellation tone="accent" className="h-24 md:h-32" />
          </div>
        </div>
      </section>

      <PerspectiveShowcase />

      {/* Studio note — two neutral sentences into the About page. */}
      <section className="container-edge pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-2xl border border-hairline bg-card p-8 md:p-10">
          <Constellation
            tone="ink"
            className="pointer-events-none absolute -right-16 -top-10 h-32 w-[36rem] opacity-[0.08]"
          />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <p className="max-w-2xl text-lg leading-relaxed text-ink">
              RQAI is one small, independent UK studio. Each project does a single
              job well, runs locally and keeps your data on your device.
            </p>
            <Link
              to="/about"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-hairline bg-canvas px-5 py-3 text-sm font-semibold text-inkStrong transition-colors duration-300 ease-out-soft hover:border-accent hover:text-accent"
            >
              About the studio
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
        </div>
      </section>
    </>
  )
}
