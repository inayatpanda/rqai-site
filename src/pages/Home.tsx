import { Head } from 'vite-react-ssg'
import { FounderNote } from '../components/FounderNote'
import { PerspectiveShowcase } from '../components/PerspectiveShowcase'
import { BubbleHero } from '../components/BubbleHero'
import { ProductOrbit } from '../components/ProductOrbit'
import { RQAI_IDENTITY } from '../data/identity'
import '../bubble-hero.css'

const HOME_TITLE = `RQAI — ${RQAI_IDENTITY.brandLine}`
const HOME_DESCRIPTION = RQAI_IDENTITY.description

/*
 * Home — the front door of the site.
 *
 * A bubble hero with the existing app marks, the project sketchbook and cards,
 * and a short founder note. Copy stays above the decorative animation.
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
    founder: { '@type': 'Person', name: RQAI_IDENTITY.founder },
    url: 'https://rqai.co.uk/',
    email: RQAI_IDENTITY.email,
    logo: 'https://rqai.co.uk/brand/rqai-mark.svg',
    slogan: RQAI_IDENTITY.brandLine,
    description: RQAI_IDENTITY.description,
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

      <BubbleHero>
        <div className="container-edge home-hero-layout"
        ><div className="home-hero-copy">
          <div className="hero-brand reveal" aria-label="RQAI"><img src="/brand/rqai-mark.svg" alt="" width="112" height="88" /><span>RQAI</span></div>
          <h1
            className="reveal mt-6 max-w-4xl text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.03]"
            style={{ ['--reveal-delay' as string]: '0.07s' }}
          ><span>Radical Questions.</span><span>Applied Intelligence.</span></h1>
          <p
            className="reveal mt-6 max-w-[54ch] text-lg leading-relaxed text-ink"
            style={{ ['--reveal-delay' as string]: '0.15s' }}
          >
            {RQAI_IDENTITY.description}
          </p>
          <a href="#projects" className="home-explore">Explore the projects <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </BubbleHero>

      <ProductOrbit />

      <div id="projects">
        <PerspectiveShowcase />
      </div>

      <FounderNote />
    </>
  )
}
