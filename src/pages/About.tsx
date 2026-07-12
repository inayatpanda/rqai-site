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
    body: 'Every feature described here exists in the project you can use. Each tool begins focused, goes deep where its audience needs it, and leaves the sprawling software suite behind.',
  },
  {
    title: 'Local-first. Your data stays with you.',
    body: 'Your work stays on your device by default. When a project syncs or publishes, it uses storage you choose and control. Privacy begins by collecting less.',
  },
  {
    title: 'No tracking. Nothing collected.',
    body: 'No behavioural profile follows you between projects. Your writing, research and clinical work are not measured, mined or sold. The software does its job and minds its own business.',
  },
  {
    title: 'Nothing claimed that is not built.',
    body: 'The write-ups are checked against the software. Work in progress is labelled; unverifiable claims come down. Trust is more useful than a dramatic feature list.',
  },
  {
    title: 'Buy once, or subscribe. Plainly.',
    body: 'One price, shown before you leave the page. Some projects are bought once and others renew simply—without hidden tiers, per-seat surprises or an upsell maze.',
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
            Seven different jobs, one way of building: useful depth, honest claims
            and control that remains with the person doing the work.
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
          These projects do not force unrelated work into one platform. Each is
          shaped around its own audience; the principles are what connect them.
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
