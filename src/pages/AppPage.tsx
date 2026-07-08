import { Link, useParams } from 'react-router-dom'
import { EcgTrace } from '../components/EcgTrace'
import { APPS } from '../App'
import { NotFound } from './NotFound'

/*
 * AppPage — placeholder for a single app page (Task 3/4 replaces this with the
 * factual pitch, feature bullets, enlarged micro-demo and the "Open <app>" CTA).
 * Renders per-slug and resolves the display name from the route index.
 */
export function AppPage() {
  const { slug } = useParams<{ slug: string }>()
  const app = APPS.find((a) => a.slug === slug)

  if (!app) return <NotFound />

  return (
    <section className="container-edge pb-16 pt-16 md:pt-24">
      <p className="eyebrow">RQAI app</p>
      <h1 className="mt-3 text-4xl leading-[1.05] md:text-6xl">{app.name}</h1>
      <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink">
        A focused, local-first tool from RQAI. Full details are on the way.
      </p>
      <EcgTrace tone="teal" className="mt-10 h-16 md:h-20" />
      <div className="mt-10">
        <Link to="/" className="text-sm text-teal transition-colors hover:text-inkStrong">
          Back to all apps
        </Link>
      </div>
    </section>
  )
}
