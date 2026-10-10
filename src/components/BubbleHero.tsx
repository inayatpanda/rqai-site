import { projectPath } from '../data/projectPaths'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import type { Slug } from '../data/products'
import { ProductLogo } from './ProductLogo'

// Fixed positions keep the prerendered and hydrated scenes identical. Each app
// has its own cycle, with negative delays so the field is populated on arrival.
const bubbles: { slug: Slug; x: number; y: number; size: number; mx: number; my: number; ms: number; life: number; delay: number; tint: string }[] = [
  { slug: 'researchassistant', x: 7, y: 23, size: 128, mx: 8, my: 13, ms: 78, life: 11, delay: -2.4, tint: '#96bfff' },
  { slug: 'chapbook', x: 24, y: 13, size: 92, mx: 40, my: 8, ms: 62, life: 9.7, delay: -4, tint: '#91e4de' },
  { slug: 'scribble', x: 47, y: 9, size: 76, mx: 77, my: 13, ms: 76, life: 10.4, delay: -1.7, tint: '#9bebdf' },
  { slug: 'clinicalproms', x: 73, y: 16, size: 110, mx: 97, my: 30, ms: 68, life: 12.1, delay: -6.8, tint: '#a2e8ca' },
  { slug: 'universal-shoulder-model', x: 91, y: 29, size: 142, mx: 92, my: 68, ms: 88, life: 11.6, delay: -3.5, tint: '#89d8f2' },
  { slug: 'ortholog', x: 17, y: 48, size: 99, mx: 2, my: 45, ms: 62, life: 10.8, delay: -5.2, tint: '#ffc18e' },
  { slug: 'podium', x: 31, y: 33, size: 65, mx: 23, my: 26, ms: 48, life: 8.9, delay: -7.2, tint: '#9adefa' },
  { slug: 'literature-decoded', x: 78, y: 49, size: 81, mx: 79, my: 38, ms: 54, life: 9.4, delay: -2.9, tint: '#ffb9aa' },
  { slug: 'thestreetsignal', x: 5, y: 79, size: 91, mx: 10, my: 77, ms: 70, life: 12.6, delay: -7.4, tint: '#f3d895' },
  { slug: 'orthoportfolio', x: 27, y: 84, size: 120, mx: 36, my: 89, ms: 82, life: 10.2, delay: -3.1, tint: '#b9b2fa' },
  { slug: 'consultantprep', x: 55, y: 88, size: 78, mx: 65, my: 80, ms: 62, life: 9.1, delay: -5.1, tint: '#f3d4a5' },
  { slug: 'audioquill', x: 84, y: 79, size: 126, mx: 91, my: 94, ms: 76, life: 11.9, delay: -1.2, tint: '#d9b6fa' },
]

function Burst() {
  return <svg className="bubble-burst" viewBox="-60 -60 120 120" fill="none" aria-hidden="true">
    <circle className="bubble-burst-ring" r="39" />
    <path d="M0-46v-7M33-33l5-5M46 0h7M33 33l5 5M0 46v7M-33 33l-5 5M-46 0h-7M-33-33l-5-5" />
    <g fill="currentColor" stroke="none"><circle cx="18" cy="-45" r="2" /><circle cx="44" cy="18" r="2" /><circle cx="-18" cy="45" r="2" /><circle cx="-44" cy="-18" r="2" /></g>
  </svg>
}

export function BubbleHero({ children }: { children: ReactNode }) {
  const hero = useRef<HTMLElement>(null)
  const [paused, setPaused] = useState(false)
  const [onScreen, setOnScreen] = useState(true)
  const [tabVisible, setTabVisible] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting))
    if (hero.current) observer.observe(hero.current)
    const visibility = () => setTabVisible(!document.hidden)
    visibility()
    document.addEventListener('visibilitychange', visibility)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility) }
  }, [])

  return <section ref={hero} className="home-intro bubble-hero relative overflow-hidden" data-paused={paused || !onScreen || !tabVisible}>
    <div className="bubble-field">
      {bubbles.map((bubble, index) => <Link to={projectPath(bubble.slug)} className={`app-bubble app-bubble--link ${bubble.x < 20 ? 'bubble-left' : bubble.x > 80 ? 'bubble-right' : ''} ${bubble.y < 25 ? 'bubble-top' : ''}`} key={bubble.slug} aria-label={`${PRODUCTS.find(product => product.slug === bubble.slug)!.name}: ${PRODUCTS.find(product => product.slug === bubble.slug)!.tagline}`} style={{
        '--x': `${bubble.x}%`, '--y': `${bubble.y}%`, '--size': `${bubble.size}px`,
        '--mx': `${bubble.mx}%`, '--my': `${bubble.my}%`, '--ms': `${bubble.ms}px`,
        '--life': `${bubble.life}s`, '--delay': `${bubble.delay}s`, '--tint': bubble.tint,
        '--drift': `${index % 2 ? 14 : -18}px`, '--tilt': `${index % 2 ? 7 : -7}deg`,
      } as CSSProperties}>
        <div className="bubble-surface"><span className="bubble-glint" /><ProductLogo slug={bubble.slug} /></div>
        <Burst />
        <span className="bubble-tooltip" aria-hidden="true"><strong>{PRODUCTS.find(product => product.slug === bubble.slug)!.name}</strong><span>{PRODUCTS.find(product => product.slug === bubble.slug)!.tagline}</span><span className="bubble-tooltip-link">Explore app ↗</span></span>
      </Link>)}
      <div className="bubble-copy-shade" />
      <div className="bubble-ambient" aria-hidden="true">
        {['researchassistant', 'scribble', 'universal-shoulder-model', 'chapbook'].map((slug, index) => <div className={`app-bubble ambient-bubble ambient-bubble--${index}`} key={slug} style={{ '--life': `${12 + index}s`, '--delay': `${-2 - index * 2.1}s`, '--drift': `${index % 2 ? 18 : -24}px`, '--tilt': '-5deg', '--tint': '#b6e6ee' } as CSSProperties}>
          <div className="bubble-surface"><span className="bubble-glint" /><ProductLogo slug={slug as Slug} /></div><Burst />
        </div>)}
      </div>
    </div>
    {children}
    <button className="bubble-motion-toggle" type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? 'Play background animation' : 'Pause background animation'}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
        {paused ? <path d="m3 1 8 5-8 5Z" /> : <path d="M2 1h3v10H2zM7 1h3v10H7z" />}
      </svg>
      {paused ? 'Play motion' : 'Pause motion'}
    </button>
  </section>
}
