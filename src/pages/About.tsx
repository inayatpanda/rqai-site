import { Head } from 'vite-react-ssg'
import { Constellation } from '../components/Constellation'

const ABOUT_TITLE = 'About RQAI: how these projects are built'
const ABOUT_DESCRIPTION =
  'The principles behind every RQAI project: real, shipping features, your data kept on your own device, no tracking, and nothing claimed that is not built.'

/*
 * About — the page that carries RQAI's voice: principles over persona.
 *
 * Five commitments, told with conviction and plain language, then a direct line
 * to the maker. No founder bio, no specialty references, no hype. The
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
    title: 'Real tools, not demos.',
    body: 'Each project is a complete tool for the work in front of you, with the range its users actually need. Every feature described on these pages is built and shipping, not a mock-up or a promise. A tool you understand in an afternoon and still grow into is worth more than a suite you never finish learning.',
  },
  {
    title: 'Local-first. Your data stays with you.',
    body: 'Your work lives on your own device by default. Nothing is uploaded, synced or stored on a server unless you ask for it, and where a project does sync, it uses storage you own and control. The surest way to keep data private is never to collect it in the first place.',
  },
  {
    title: 'No tracking. Nothing collected.',
    body: 'There is no analytics script trailing you from page to page, and none of these projects reports home. Where a project needs a licence key, or a sign-in that lives on your own server, that is all it is: nothing you do inside is measured, profiled or sold. A project should be useful the moment you open it, and mind its own business while you use it.',
  },
  {
    title: 'Nothing claimed that is not built.',
    body: 'Every feature described on these pages exists in the shipping project, and the write-ups are checked against the code before they are published. Where something is still in progress, the page says so. If a claim here cannot be verified, it comes down.',
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
        <meta property="og:url" content="https://rqai.co.uk/about/" />
        <meta property="og:site_name" content="RQAI" />
        <meta name="twitter:title" content={ABOUT_TITLE} />
        <meta name="twitter:description" content={ABOUT_DESCRIPTION} />
        <link rel="canonical" href="https://rqai.co.uk/about/" />
        <meta property="og:image" content="https://rqai.co.uk/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://rqai.co.uk/og.png" />
      </Head>

      {/* Hero — the thesis in two words, then the principles in one line. */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_30rem_at_78%_-14%,rgba(69,213,242,0.09),transparent_62%)]"
        />
        <div className="container-edge relative pb-10 pt-16 md:pb-14 md:pt-24">
          <h1 className="reveal max-w-4xl text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.03]">
            Made thoughtfully.
          </h1>
          <p
            className="reveal mt-6 max-w-[52ch] text-lg leading-relaxed text-ink md:text-xl"
            style={{ ['--reveal-delay' as string]: '0.1s' }}
          >
            Seven projects, one set of principles. Whatever the job, every RQAI
            project is built the same way. Here is what that means in practice.
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
          Each project is made for one audience and one job: a surgeon collecting
          outcomes, a researcher writing a paper, a writer publishing a blog. They
          share no platform and no login. What they share is a way of being built.
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

      {/* Contact — straight to the maker. */}
      <section className="container-edge py-12 md:py-16">
        <div className="relative overflow-hidden rounded-2xl border border-hairline bg-card p-8 md:p-10">
          <Constellation
            tone="ink"
            className="pointer-events-none absolute -right-10 -top-8 h-28 w-[30rem] opacity-[0.07]"
          />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl">Say hello.</h2>
            <p className="mt-3 max-w-prose leading-relaxed text-ink">
              Questions, feedback, or a licence query go straight to the maker.
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
