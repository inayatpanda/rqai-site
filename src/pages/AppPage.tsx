import { Head } from 'vite-react-ssg'
import { Link, useParams } from 'react-router-dom'
import { Constellation } from '../components/Constellation'
import { AppCta } from '../components/AppCta'
import { PRODUCTS, isLive, type Product } from '../data/products'
import { NotFound } from './NotFound'

/*
 * AppPage — one data-driven template for all seven project pages.
 *
 * Per product it renders: a factual pitch paragraph (description), 3–5 feature
 * bullets, the micro-demo ENLARGED as the visual centrepiece, a price line when
 * a price is verified, the AppCta ("Open <name>" when live, an on-brand
 * "coming soon" state otherwise), a back-link home and a strip cross-linking the
 * other six projects.
 *
 * One coherent system, varied rhythm: the demo alternates between a hero-side
 * stage (even index) and a full-width band (odd index), and the constellation
 * punctuation alternates tone, so no two consecutive pages read identically.
 *
 * No-JS legibility: every piece of page COPY uses the pure-CSS `.reveal` class
 * (its hidden start state lives only inside a prefers-reduced-motion:no-preference
 * query — see index.css), so the prerendered HTML is fully readable with
 * JavaScript disabled and reduced-motion users see it immediately. Only the
 * decorative micro-demo needs JS; it sits in a fixed-height stage so the layout
 * never shifts.
 *
 * Meta (title, description, OG) is emitted through vite-react-ssg's <Head> and
 * prerendered into each dist/<slug>/index.html.
 */

/** Everything before the first full stop, e.g. a clean one-line meta summary. */
function firstSentence(text: string): string {
  const match = text.match(/^[^.]*\./)
  return match ? match[0] : text
}

/** Normalise em/en dashes to commas for machine-read meta strings only. */
function tidyForMeta(text: string): string {
  return text.replace(/\s*[—–]\s*/g, ', ')
}

/* Coming-soon status, shown once in the hero (the page's only eyebrow). All
   seven projects are live, so a "Live" pill would be decorative noise; only
   the meaningful "coming soon" state renders. */
function StatusPill({ live }: { live: boolean }) {
  if (live) {
    return null
  }
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-accentWarm/40 bg-accentWarm/10 px-3 py-1.5 font-mono text-[0.65rem] font-medium uppercase tracking-label text-accentWarm">
      <span className="h-1.5 w-1.5 rounded-full bg-accentWarm shadow-[0_0_6px_currentColor]" />
      Coming soon
    </span>
  )
}

/* Back to the project showcase on the home page. */
function BackLink() {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2 text-sm text-inkMuted transition-colors hover:text-accent"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-300 ease-out-soft group-hover:-translate-x-0.5"
      >
        <path
          d="M14 8H3M7 4 3 8l4 4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      All projects
    </Link>
  )
}

/*
 * DemoStage — the micro-demo given real room as the page's centrepiece.
 * A framed, atmospheric panel of fixed height (so the layout holds even before
 * the demo's JS runs) with the demo scaled up and centred. Decorative, so the
 * glow and faint constellation behind it are aria-hidden.
 */
function DemoStage({
  product,
  tone,
  wide = false,
  className = '',
}: {
  product: Product
  tone: 'accent' | 'ink'
  /** Full-width band variant: the demo gets a larger stage presence. */
  wide?: boolean
  className?: string
}) {
  const { Demo } = product
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-hairline bg-card shadow-soft ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,rgba(69,213,242,0.10),transparent_70%)]"
      />
      <Constellation
        tone={tone}
        className="pointer-events-none absolute -bottom-6 left-1/2 h-24 w-[130%] -translate-x-1/2 opacity-[0.10]"
      />
      {/* Scaled up from its natural size; the wrapper width x scale is kept
          within the smallest stage so nothing is clipped. */}
      <div
        className={
          wide
            ? 'relative w-44 scale-[1.3] sm:w-64 sm:scale-[1.7] lg:w-80 lg:scale-[1.9]'
            : 'relative w-44 scale-[1.3] sm:w-52 sm:scale-[1.55] lg:w-56 lg:scale-[1.7]'
        }
      >
        <Demo />
      </div>
    </div>
  )
}

export function AppPage() {
  const { slug } = useParams<{ slug: string }>()
  const index = PRODUCTS.findIndex((p) => p.slug === slug)
  const product = index >= 0 ? PRODUCTS[index] : undefined

  if (!product) return <NotFound />

  const { name, tagline, description, features, price, url, whereLine, Showcase } =
    product
  const live = isLive(product.slug)
  const host = (() => {
    try {
      return new URL(url).host
    } catch {
      return url
    }
  })()

  // One system, alternating rhythm.
  const demoInBand = index % 2 === 1
  const puncTone: 'accent' | 'ink' = index % 2 === 0 ? 'ink' : 'accent'

  const metaTitle = `${name}: ${tidyForMeta(tagline)}`
  const metaDescription = tidyForMeta(firstSentence(description))

  const others = PRODUCTS.filter((p) => p.slug !== product.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    url,
    description: metaDescription,
    applicationCategory: product.category,
    operatingSystem: product.platforms,
    ...(product.offer
      ? {
          offers: {
            '@type': 'Offer',
            price: product.offer.price,
            priceCurrency: product.offer.currency,
          },
        }
      : {}),
    publisher: { '@type': 'Organization', name: 'RQAI', url: 'https://rqai.co.uk/' },
  }

  const heroText = (
    <div className={demoInBand ? 'max-w-3xl' : ''}>
      <h1
        className="reveal text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.04]"
        style={{ ['--reveal-delay' as string]: '0.04s' }}
      >
        {name}
      </h1>
      <p
        className="reveal mt-4 max-w-[42ch] text-xl leading-snug text-ink"
        style={{ ['--reveal-delay' as string]: '0.11s' }}
      >
        {tagline}
      </p>
      <div
        className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
        style={{ ['--reveal-delay' as string]: '0.18s' }}
      >
        <AppCta product={product} />
        {price && (
          <p className="font-display text-lg font-semibold text-inkStrong">{price}</p>
        )}
      </div>
    </div>
  )

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://rqai.co.uk/${product.slug}/`} />
        <meta property="og:site_name" content="RQAI" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <link rel="canonical" href={`https://rqai.co.uk/${product.slug}/`} />
        <meta property="og:image" content="https://rqai.co.uk/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://rqai.co.uk/og.png" />
        {/* react-helmet-async emits script content only from string children; dangerouslySetInnerHTML is silently dropped. */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      {/* Hero */}
      <section className="container-edge pb-4 pt-10 md:pb-8 md:pt-14">
        <div className="flex items-center justify-between gap-4">
          <BackLink />
          <StatusPill live={live} />
        </div>

        {demoInBand ? (
          <div className="mt-9 md:mt-12">{heroText}</div>
        ) : (
          <div className="mt-9 grid items-center gap-10 md:mt-12 lg:grid-cols-2 lg:gap-14">
            {heroText}
            <div
              className="reveal"
              style={{ ['--reveal-delay' as string]: '0.24s' }}
            >
              <DemoStage
                product={product}
                tone={puncTone}
                className="min-h-[17rem] sm:min-h-[19rem] lg:min-h-[24rem]"
              />
            </div>
          </div>
        )}
      </section>

      {/* Full-width demo band (alternating rhythm) */}
      {demoInBand && (
        <section className="container-edge py-8 md:py-10">
          <DemoStage
            product={product}
            tone={puncTone}
            wide
            className="min-h-[19rem] md:min-h-[23rem]"
          />
        </section>
      )}

      {/* Pitch — the factual one-paragraph description */}
      <section className="container-edge py-10 md:py-14">
        <p className="reveal max-w-[60ch] text-lg leading-relaxed text-ink md:text-xl md:leading-relaxed">
          {description}
        </p>
        <Constellation
          tone={puncTone}
          className="reveal mt-10 h-12 w-full max-w-2xl md:h-14"
        />
      </section>

      {/* Features */}
      <section className="container-edge py-8 md:py-12">
        <h2 className="reveal text-2xl leading-tight md:text-3xl">What it does</h2>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
          {features.map((feature, i) => (
            <li
              key={i}
              className={`reveal flex gap-4 bg-card p-6 md:p-7 ${
                i === features.length - 1 && features.length % 2 === 1
                  ? 'sm:col-span-2'
                  : ''
              }`}
              style={{ ['--reveal-delay' as string]: `${0.05 * i}s` }}
            >
              <span
                aria-hidden="true"
                className="mt-2 h-2 w-2 flex-none rounded-full bg-accent shadow-[0_0_8px_#45d5f2]"
              />
              <p className="leading-relaxed text-ink">{feature}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Showcase band (only where a product defines one, e.g. ResearchAssistant) */}
      {Showcase && (
        <section className="container-edge py-8 md:py-12">
          <Showcase />
        </section>
      )}

      {/* Where to find it */}
      <section className="container-edge py-8 md:py-12">
        <div className="relative overflow-hidden rounded-2xl border border-hairline bg-card p-8 md:p-10">
          <Constellation
            tone="ink"
            className="pointer-events-none absolute -right-10 -top-8 h-28 w-[30rem] opacity-[0.07]"
          />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl">Where to find it</h2>
            {live ? (
              <>
                <p className="mt-3 max-w-prose leading-relaxed text-ink">
                  {/* whereLine overrides the default where the web-app framing
                      would be untrue (e.g. self-hosted desktop software). */}
                  {whereLine ??
                    `${name} runs in your browser at ${host}. It is local-first: your data stays on your device.`}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <AppCta product={product} />
                  {price && (
                    <p className="font-display text-lg font-semibold text-inkStrong">
                      {price}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <p className="mt-3 max-w-prose leading-relaxed text-ink">
                  {name} is not yet reachable at {host}. This page will link
                  straight to it as soon as it is live.
                </p>
                {price && (
                  <p className="mt-6 font-display text-lg font-semibold text-inkStrong">
                    {price}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Cross-links to the other projects */}
      <section className="container-edge py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl">More from RQAI</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                to={`/${other.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-hairline bg-card p-5 transition-colors duration-300 ease-out-soft hover:border-accent/50"
              >
                <h3 className="font-display text-lg font-semibold text-inkStrong">
                  {other.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-inkMuted">
                  {other.tagline}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-300 group-hover:text-accent">
                  Open project
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5"
                  >
                    <path
                      d="M2 8h11M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
