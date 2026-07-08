import { Link, useParams } from 'react-router-dom'
import { Constellation } from '../components/Constellation'
import { PROJECTS } from '../App'
import { NotFound } from './NotFound'

/*
 * AppPage — placeholder for a single project page (Task 3/4 replaces this with
 * the factual pitch, feature bullets, enlarged micro-demo and the
 * "Open <project>" CTA). Renders per-slug and resolves the display name from
 * the route index.
 */
export function AppPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = PROJECTS.find((p) => p.slug === slug)

  if (!project) return <NotFound />

  return (
    <section className="container-edge pb-16 pt-16 md:pt-24">
      <p className="eyebrow">RQAI project</p>
      <h1 className="mt-3 text-4xl leading-[1.05] md:text-6xl">{project.name}</h1>
      <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink">
        A focused, local-first tool from RQAI. Full details are on the way.
      </p>
      <Constellation tone="accent" className="mt-10 h-16 md:h-20" />
      <div className="mt-10">
        <Link to="/" className="text-sm text-accent transition-colors hover:text-inkStrong">
          Back to all projects
        </Link>
      </div>
    </section>
  )
}
