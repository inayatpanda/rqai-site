import { useEffect, useRef, useState } from 'react'
import type { Product } from '../data/products'
import { PROJECT_PREVIEWS } from '../data/projectPreviews'

/** One silent, locally hosted preview. Load it only when this figure is visible. */
export function ProjectPreview({ product }: { product: Product }) {
  const video = useRef<HTMLVideoElement>(null)
  const figure = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(true)
  const [intent, setIntent] = useState<boolean | null>(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const preview = PROJECT_PREVIEWS[product.slug]
  const base = `/previews/${product.slug}`

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(preference.matches)
    const updateVisibility = () => setHidden(document.hidden)
    updatePreference()
    updateVisibility()
    preference.addEventListener('change', updatePreference)
    document.addEventListener('visibilitychange', updateVisibility)
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
      if (entry.isIntersecting) setLoaded(true)
    }, { threshold: 0.15 })
    if (figure.current) observer.observe(figure.current)
    return () => {
      observer.disconnect()
      preference.removeEventListener('change', updatePreference)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    const element = video.current
    if (!element) return
    if (loaded && visible && !hidden && !failed && (intent ?? !reducedMotion)) {
      void element.play().catch(() => setPlaying(false))
    } else element.pause()
  }, [loaded, visible, hidden, reducedMotion, intent, failed])

  return (
    <figure ref={figure} className="overflow-hidden rounded-2xl border border-hairline bg-card">
      {failed ? <img src={`${base}.jpg`} alt={`${product.name}: ${preview.titles[0]}`} width="960" height="600" className="block aspect-[8/5] w-full object-contain" /> : <video
        ref={video}
        src={loaded ? `${base}.mp4` : undefined}
        poster={`${base}.jpg`}
        width="960"
        height="600"
        className="block aspect-[8/5] w-full bg-[#07142f] object-contain"
        muted loop playsInline preload="none"
        aria-label={`${product.name} preview: ${preview.titles.join(', ')}. No audio.`}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => { setFailed(true); setPlaying(false) }}
      />}
      <figcaption className="border-t border-hairline px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-inkMuted">{preview.kind}</p>
          {!failed && <button
            type="button"
            className="min-h-11 shrink-0 rounded-lg border border-hairline px-3 text-sm text-ink transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            onClick={() => { setLoaded(true); setIntent(!playing) }}
            aria-label={`${playing ? 'Pause' : 'Play'} ${product.name} preview`}
          >{playing ? 'Pause' : 'Play'} preview</button>}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink">{preview.titles.join(' · ')}</p>
        {product.slug === 'clinicalproms' && <p className="mt-2 text-xs leading-relaxed text-inkMuted">Earlier Ortho Outcomes interface, shown with demonstration data.</p>}
        {product.slug === 'universal-shoulder-model' && <p className="mt-2 text-xs leading-relaxed text-inkMuted">
          Research in development. Geometry: University of Utah / Henninger Lab,{' '}
          <a className="underline" href="https://doi.org/10.5281/zenodo.19077748">v1.11</a>,{' '}
          <a className="underline" href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
          {' '}Also includes synthetic engineering examples.
        </p>}
      </figcaption>
    </figure>
  )
}
