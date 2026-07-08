import { Head } from 'vite-react-ssg'
import { Constellation } from '../components/Constellation'

const ABOUT_TITLE = 'About RQAI: small, careful software'
const ABOUT_DESCRIPTION =
  'RQAI is one small independent UK studio building focused, local-first tools: one job done well, your data kept on your device, no accounts and no tracking.'

/*
 * About — the page that carries RQAI's voice: principles over persona.
 *
 * Five commitments, told with conviction and plain language, then a direct line
 * to the studio. No founder bio, no specialty references, no hype. The
 * Constellation is used as punctuation between movements, exactly as on the home
 * and project pages, so the page reads as one system.
 *
 * No-JS legibility: every string uses the pure-CSS `.reveal` class, whose hidden
 * start state lives only inside a prefers-reduced-motion:no-preference query (see
 * index.css). Nothing renders an inline opacity:0, so the prerendered HTML is
 * fully readable with JavaScript disabled and reduced-motion users see it at once.
 */

const COMMITMENTS: Array<{ title: string; body: string }> = [
  {
    title: 'One job, done well.',
    body: 'Each project sets out to do one thing and do it properly, then stay out of your way. Nothing here grows into a suite you have to manage or a platform you never finish learning. A tool you understand in an afternoon is worth more than one you never master.',
  },
  {
    title: 'Local-first. Your data stays with you.',
    body: 'Your work lives on your own device by default. Nothing is uploaded, synced or stored on a server unless you ask for it, and where a project does sync, it uses storage you own and control. The surest way to keep data private is never to collect it in the first place.',
  },
  {
    title: 'No accounts, no tracking.',
    body: 'There is no sign-up, no login wall and no analytics trailing you from page to page. You never make an account to begin, and nothing you do is measured, profiled or sold. A project should be useful the moment you open it, and mind its own business while you use it.',
  },
  {
    title: 'One small, independent UK studio.',
    body: 'RQAI is a single studio in the United Kingdom, not a company chasing scale. That keeps the range deliberately small and the decisions honest: every project is built and maintained in-house, answerable to the people who use it rather than to investors or an advertising market.',
  },
  {
    title: 'Buy once, or subscribe. Plainly.',
    body: 'Pricing is one clear line. Some projects are a single purchase, others a straightforward subscription, and where a project is for sale, its page shows the price up front. No per-seat fees, no add-on tiers, and no upsell once you have paid.',
  },
]

export function About() {
  return (
    <>
      <Head>
        <title>{ABOUT_TITLE}</title>
        <meta name="description" content={ABOUT_DESCRIPTION} />
        <meta property="og:title" content={ABOUT_TITLE} />
        <meta property="og:description" content={ABOUT_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rqai.co.uk/about" />
        <meta property="og:site_name" content="RQAI" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={ABOUT_TITLE} />
        <meta name="twitter:description" content={ABOUT_DESCRIPTION} />
      </Head>

      {/* Hero — the thesis in three words, then the studio in one line. */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_30rem_at_78%_-14%,rgba(69,213,242,0.09),transparent_62%)]"
        />
        <div className="container-edge relative pb-10 pt-16 md:pb-14 md:pt-24">
          <h1 className="reveal max-w-4xl text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.03]">
            Small on purpose.
          </h1>
          <p
            className="reveal mt-6 max-w-[52ch] text-lg leading-relaxed text-ink md:text-xl"
            style={{ ['--reveal-delay' as string]: '0.1s' }}
          >
            RQAI is one small, independent UK studio. It keeps a short list of
            commitments, and they shape every project the same way, whatever it
            does.
          </p>

          <div
            className="reveal relative mt-12 md:mt-16"
            style={{ ['--reveal-delay' as string]: '0.2s' }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-36 -translate-y-1/2 bg-[radial-gradient(60%_80%_at_38%_50%,rgba(69,213,242,0.09),transparent_70%)]"
            />
            <Constellation tone="accent" className="h-20 w-full max-w-3xl md:h-24" />
          </div>
        </div>
      </section>

      {/* Lead — one paragraph that sets up the commitments. */}
      <section className="container-edge py-10 md:py-14">
        <p className="reveal max-w-[60ch] text-xl leading-relaxed text-inkStrong md:text-2xl md:leading-relaxed">
          RQAI makes a small number of focused tools, each built the same way.
          They answer to one idea: software should be simple to understand,
          honest about what it does, and careful with your time and your data.
          Here is what that means in practice.
        </p>
        <Constellation
          tone="ink"
          className="reveal mt-10 h-12 w-full max-w-2xl md:h-14"
        />
      </section>

      {/* The commitments — a hairline-set editorial sequence. */}
      <section className="container-edge py-6 md:py-8">
        <div className="border-t border-hairline">
          {COMMITMENTS.map((c, i) => (
            <div
              key={c.title}
              className="reveal grid gap-3 border-b border-hairline py-8 md:grid-cols-[minmax(0,17rem)_1fr] md:gap-12 md:py-11"
              style={{ ['--reveal-delay' as string]: `${0.05 * i}s` }}
            >
              <h2 className="font-display text-2xl font-semibold leading-tight text-inkStrong md:text-[1.7rem]">
                {c.title}
              </h2>
              <p className="max-w-[60ch] text-lg leading-relaxed text-ink">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact — straight to the studio. */}
      <section className="container-edge py-12 md:py-16">
        <div className="relative overflow-hidden rounded-2xl border border-hairline bg-card p-8 md:p-10">
          <Constellation
            tone="ink"
            className="pointer-events-none absolute -right-10 -top-8 h-28 w-[30rem] opacity-[0.07]"
          />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl">Say hello.</h2>
            <p className="mt-3 max-w-prose leading-relaxed text-ink">
              Questions, feedback, or a licence query go straight to the studio.
              There is no ticketing system and no bot in between.
            </p>
            <a
              href="mailto:hello@rqai.co.uk"
              className="mt-6 inline-block font-mono text-lg text-accent transition-colors hover:text-inkStrong"
            >
              hello@rqai.co.uk
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
