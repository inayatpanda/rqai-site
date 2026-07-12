import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { Constellation } from '../components/Constellation'
import { PerspectiveShowcase } from '../components/PerspectiveShowcase'
import { ProductOrbit } from '../components/ProductOrbit'

const HOME_TITLE = 'RQAI: focused software for clinicians, researchers and writers'
const HOME_DESCRIPTION =
  'Streamline the work. Keep the hours. A clinical research workbench, clean dictation, a blog you run from your phone and a feature-rich note taker.'

/*
 * Home — the front door of the site.
 *
 * Three movements: a hero (RQAI wordmark, the truthful tagline and the animated
 * Constellation as the house signature), the perspective-grid project showcase,
 * and a principles note into /about.
 *
 * No-JS legibility: the hero entrance is pure CSS (the `.reveal` class in
 * index.css), whose hidden start state lives only inside a
 * prefers-reduced-motion:no-preference query. Nothing here renders an inline
 * opacity:0, so the prerendered HTML is fully readable with JavaScript disabled,
 * and reduced-motion users see the copy immediately.
 */
export function Home() {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'RQAI',
    url: 'https://rqai.co.uk/',
    email: 'hello@rqai.co.uk',
    description:
      'Streamline the work and keep the hours: organised, clutter-free tools for clinicians, researchers and writers, with AI only where it genuinely helps.',
  }

  return (
    <>
      <Head>
        <title>{HOME_TITLE}</title>
        <meta name="description" content={HOME_DESCRIPTION} />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rqai.co.uk/" />
        <meta property="og:site_name" content="RQAI" />
        <meta name="twitter:title" content={HOME_TITLE} />
        <meta name="twitter:description" content={HOME_DESCRIPTION} />
        <link rel="canonical" href="https://rqai.co.uk/" />
        <meta property="og:image" content="https://rqai.co.uk/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://rqai.co.uk/og.png" />
        {/* react-helmet-async emits script content only from string children; dangerouslySetInnerHTML is silently dropped. */}
        <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
      </Head>

      <ProductOrbit />

      <div id="projects">
        <PerspectiveShowcase />
      </div>

      {/* Principles note — two sentences into the About page. */}
      <section className="container-edge pb-20 md:pb-28">
        <div className="relative overflow-hidden rounded-2xl border border-hairline bg-card p-8 md:p-10">
          <Constellation
            tone="ink"
            className="pointer-events-none absolute -right-16 -top-10 h-32 w-[36rem] opacity-[0.08]"
          />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <p className="max-w-2xl text-lg leading-relaxed text-ink">
              Every project here is built the same way: real features, honest about
              what they do, kept on your own device and careful with your data.
              Nothing is claimed on these pages that is not already in the software.
            </p>
            <Link
              to="/about"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-hairline bg-canvas px-5 py-3 text-sm font-semibold text-inkStrong transition-colors duration-300 ease-out-soft hover:border-accent hover:text-accent"
            >
              How these projects are built
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
