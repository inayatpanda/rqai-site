import { Link } from 'react-router-dom'
import { Constellation } from '../components/Constellation'

/* NotFound — on-brand 404. Prerendered to /404 and used as the client fallback. */
export function NotFound() {
  return (
    <section className="container-edge flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl md:text-5xl">Page not found.</h1>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink">
        The link may be out of date. Let us get you back on track.
      </p>
      <Constellation tone="ink" className="mt-10 h-14 w-full max-w-md" />
      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-canvas transition-transform duration-300 ease-out-soft hover:-translate-y-0.5"
      >
        Back to home
      </Link>
    </section>
  )
}
