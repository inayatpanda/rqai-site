import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { HeroFrame } from './HeroFrame'
import type { HeroSceneProps, ProductTheme } from '../../data/products'

/*
 * ResearchAssistantHero: an animated project-page hero. A PubMed search
 * strategy builds itself. PICO chips pop in, MeSH rows slide in with counts
 * that tick up, a combined query runs, and a screening result settles. Beats
 * advance on setTimeout and loop; the final beat is the complete strategy, so
 * with reduced motion (and in the prerendered HTML) that whole frame shows
 * statically with no timers.
 *
 * The scene panel adopts the ResearchAssistant spoke-site palette (a light
 * workspace with a blue primary and slate ink) so the hand-off to the external
 * site reads as one continuous surface. Colours arrive as a `theme` prop from
 * products.ts, with a matching fallback so the component is safe to render bare.
 *
 * Illustrative mock content.
 */

const RA_THEME: ProductTheme = {
  accent: '#2563eb',
  accentInk: '#ffffff',
  accentBright: '#3b82f6',
  panelBg: '#fafafa',
  panelInk: '#1e293b',
  panelMuted: '#475569',
  panelLine: '#e2e8f0',
  panelTint: '#eff6ff',
}

const BEATS = 4
const LAST = BEATS - 1
const DURATIONS = [1900, 2600, 2400, 1700] // ms per beat; final beat is the hold

/** Group digits with thin commas, deterministically across server and client. */
const groupDigits = (value: number) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const MESH_ROWS = [
  { term: 'Tranexamic Acid [MeSH]', count: 12431, delay: 0 },
  { term: 'Arthroplasty, Replacement, Knee [MeSH]', count: 28904, delay: 130 },
  { term: 'blood transfusion [tiab]', count: 41268, delay: 260 },
]

/** One MeSH row whose count animates up from zero when it mounts (each cycle). */
function MeshRow({
  term,
  count,
  delay,
  animate,
  t,
}: {
  term: string
  count: number
  delay: number
  animate: boolean
  t: ProductTheme
}) {
  const [shown, setShown] = useState(count)

  useEffect(() => {
    if (!animate) return
    let raf = 0
    let started = 0
    const duration = 680
    setShown(0)
    const frame = (time: number) => {
      if (!started) started = time
      const k = Math.min(1, (time - started) / duration)
      const eased = 1 - Math.pow(1 - k, 3)
      setShown(Math.round(count * eased))
      if (k < 1) raf = requestAnimationFrame(frame)
      else setShown(count)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [count, animate])

  return (
    <div
      className="ra-mesh flex items-center justify-between gap-3 rounded-md border px-3 py-1"
      style={{ ['--d' as string]: `${delay}ms`, backgroundColor: '#ffffff', borderColor: t.panelLine }}
    >
      <span className="min-w-0 truncate font-mono text-xs" style={{ color: t.panelInk }}>
        {term}
      </span>
      <span
        className="flex-none font-mono text-xs font-semibold tabular-nums"
        style={{ color: t.accent }}
      >
        {groupDigits(shown)}
      </span>
    </div>
  )
}

export function ResearchAssistantHero({ theme = RA_THEME }: HeroSceneProps = {}) {
  const t = theme
  const reduce = useReducedMotion() === true
  const [step, setStep] = useState(LAST) // prerender + first paint show the complete final beat

  useEffect(() => {
    if (reduce) return
    const timer = window.setTimeout(() => setStep((s) => s + 1), DURATIONS[step % BEATS])
    return () => window.clearTimeout(timer)
  }, [step, reduce])

  const beat = step % BEATS
  const cycle = Math.floor(step / BEATS)

  return (
    <HeroFrame frame="browser" host="researchassistant.rqai.co.uk" tone="accent">
      <div
        aria-hidden="true"
        className={`ra-root relative h-[19rem] overflow-hidden p-4 md:h-[21rem] md:p-5 ${reduce ? '' : 'ra-play'}`}
        style={{ backgroundColor: t.panelBg }}
      >
        <style>{raCss(t.accent)}</style>

        <div key={cycle} className="flex h-full flex-col gap-2 md:gap-2.5">
          <div className="ra-eyebrow font-mono text-[0.65rem] uppercase tracking-label" style={{ color: t.panelMuted }}>
            Term Workbench
          </div>

          <div className="flex flex-col gap-1.5">
            <div
              className="ra-chip flex items-baseline gap-2 rounded-md border px-3 py-1"
              style={{ ['--d' as string]: '80ms', backgroundColor: '#ffffff', borderColor: t.panelLine }}
            >
              <span className="flex-none text-xs font-semibold" style={{ color: t.accent }}>Population:</span>
              <span className="text-xs" style={{ color: t.panelInk }}>adults undergoing knee replacement</span>
            </div>
            <div
              className="ra-chip flex items-baseline gap-2 rounded-md border px-3 py-1"
              style={{ ['--d' as string]: '220ms', backgroundColor: '#ffffff', borderColor: t.panelLine }}
            >
              <span className="flex-none text-xs font-semibold" style={{ color: t.accent }}>Intervention:</span>
              <span className="text-xs" style={{ color: t.panelInk }}>tranexamic acid</span>
            </div>
          </div>

          {beat >= 1 && (
            <div className="flex flex-col gap-1">
              {MESH_ROWS.map((row) => (
                <MeshRow key={row.term} term={row.term} count={row.count} delay={row.delay} animate={!reduce} t={t} />
              ))}
            </div>
          )}

          {beat >= 2 && (
            <div className="flex flex-col gap-1.5">
              <div
                className="ra-query flex items-center justify-between gap-2 rounded-md border px-3 py-1"
                style={{ backgroundColor: '#ffffff', borderColor: t.panelLine }}
              >
                <span className="font-mono text-sm" style={{ color: t.panelInk }}>#1 AND #2 AND #3</span>
                <span
                  className="ra-run flex-none rounded-full px-2.5 py-1 text-xs font-semibold"
                  style={{ backgroundColor: t.accent, color: t.accentInk }}
                >
                  Run on PubMed
                </span>
              </div>
              <div className="font-mono text-xs" style={{ color: t.panelMuted }}>
                <span className="ra-type">428 records retrieved</span>
              </div>
            </div>
          )}

          {beat >= 3 && (
            <div
              className="ra-strip mt-auto flex items-center gap-2 rounded-md border px-3 py-1.5"
              style={{ backgroundColor: t.panelTint, borderColor: t.accent }}
            >
              <svg viewBox="0 0 16 16" className="ra-tick h-4 w-4 flex-none" fill="none" aria-hidden="true">
                <path d="M3 8.5 6.3 12 13 5" stroke={t.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs" style={{ color: t.panelInk }}>Screened 428 &middot; Included 12 &middot; Cohen&apos;s kappa 0.82</span>
            </div>
          )}
        </div>
      </div>
    </HeroFrame>
  )
}

const raCss = (accent: string) => `
.ra-play .ra-eyebrow{animation:raIn .5s ease both}
.ra-play .ra-chip{animation:raSlide .5s cubic-bezier(.16,1,.3,1) both;animation-delay:var(--d,0ms)}
.ra-play .ra-mesh{animation:raSlide .5s cubic-bezier(.16,1,.3,1) both;animation-delay:var(--d,0ms)}
.ra-play .ra-query{animation:raIn .5s ease both}
.ra-play .ra-run{animation:raPulse 1.1s ease .35s 1 both}
.ra-play .ra-strip{animation:raPop .5s cubic-bezier(.16,1,.3,1) both}
.ra-play .ra-tick{animation:raPop .45s cubic-bezier(.16,1,.3,1) .1s both}
.ra-type{display:inline-block;overflow:hidden;white-space:nowrap;width:21ch;vertical-align:bottom;
  border-right:2px solid transparent}
.ra-play .ra-type{animation:raType .9s steps(21,end) both,raCaret .7s step-end 4 both}
@keyframes raIn{from{opacity:0;transform:translateY(8px)}}
@keyframes raSlide{from{opacity:0;transform:translateY(10px)}}
@keyframes raPop{from{opacity:0;transform:scale(.9)}}
@keyframes raType{from{width:0}}
@keyframes raCaret{0%,100%{border-color:transparent}50%{border-color:${accent}}}
@keyframes raPulse{0%,100%{transform:scale(1)}45%{transform:scale(1.07)}}
`
