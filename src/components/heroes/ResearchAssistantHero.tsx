import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { HeroFrame } from './HeroFrame'

/*
 * ResearchAssistantHero: an animated project-page hero. A PubMed search
 * strategy builds itself. PICO chips pop in, MeSH rows slide in with counts
 * that tick up, a combined query runs, and a screening result settles. Beats
 * advance on setTimeout and loop; the final beat is the complete strategy, so
 * with reduced motion (and in the prerendered HTML) that whole frame shows
 * statically with no timers.
 *
 * Illustrative mock content.
 */

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
function MeshRow({ term, count, delay, animate }: { term: string; count: number; delay: number; animate: boolean }) {
  const [shown, setShown] = useState(count)

  useEffect(() => {
    if (!animate) return
    let raf = 0
    let started = 0
    const duration = 680
    setShown(0)
    const frame = (t: number) => {
      if (!started) started = t
      const k = Math.min(1, (t - started) / duration)
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
      className="ra-mesh flex items-center justify-between gap-3 rounded-md border border-hairline bg-card/60 px-3 py-1"
      style={{ ['--d' as string]: `${delay}ms` }}
    >
      <span className="min-w-0 truncate font-mono text-xs text-ink">{term}</span>
      <span className="flex-none font-mono text-xs font-semibold tabular-nums text-accent">
        {groupDigits(shown)}
      </span>
    </div>
  )
}

export function ResearchAssistantHero() {
  const reduce = useReducedMotion() === true
  const [step, setStep] = useState(LAST) // prerender + first paint show the complete final beat

  useEffect(() => {
    if (reduce) return
    const t = window.setTimeout(() => setStep((s) => s + 1), DURATIONS[step % BEATS])
    return () => window.clearTimeout(t)
  }, [step, reduce])

  const beat = step % BEATS
  const cycle = Math.floor(step / BEATS)

  return (
    <HeroFrame frame="browser" host="researchassistant.rqai.co.uk" tone="accent">
      <div
        aria-hidden="true"
        className={`ra-root relative h-[19rem] overflow-hidden bg-canvas p-4 md:h-[21rem] md:p-5 ${reduce ? '' : 'ra-play'}`}
      >
        <style>{RA_CSS}</style>

        <div key={cycle} className="flex h-full flex-col gap-2 md:gap-2.5">
          <div className="ra-eyebrow font-mono text-[0.65rem] uppercase tracking-label text-inkMuted">
            Term Workbench
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="ra-chip flex items-baseline gap-2 rounded-md border border-hairline bg-card px-3 py-1" style={{ ['--d' as string]: '80ms' }}>
              <span className="flex-none text-xs font-semibold text-accent">Population:</span>
              <span className="text-xs text-ink">adults undergoing knee replacement</span>
            </div>
            <div className="ra-chip flex items-baseline gap-2 rounded-md border border-hairline bg-card px-3 py-1" style={{ ['--d' as string]: '220ms' }}>
              <span className="flex-none text-xs font-semibold text-accent">Intervention:</span>
              <span className="text-xs text-ink">tranexamic acid</span>
            </div>
          </div>

          {beat >= 1 && (
            <div className="flex flex-col gap-1">
              {MESH_ROWS.map((row) => (
                <MeshRow key={row.term} term={row.term} count={row.count} delay={row.delay} animate={!reduce} />
              ))}
            </div>
          )}

          {beat >= 2 && (
            <div className="flex flex-col gap-1.5">
              <div className="ra-query flex items-center justify-between gap-2 rounded-md border border-hairline bg-card px-3 py-1">
                <span className="font-mono text-sm text-ink">#1 AND #2 AND #3</span>
                <span className="ra-run flex-none rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-canvas">
                  Run on PubMed
                </span>
              </div>
              <div className="font-mono text-xs text-inkMuted">
                <span className="ra-type">428 records retrieved</span>
              </div>
            </div>
          )}

          {beat >= 3 && (
            <div className="ra-strip mt-auto flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5">
              <svg viewBox="0 0 16 16" className="ra-tick h-4 w-4 flex-none" fill="none" aria-hidden="true">
                <path d="M3 8.5 6.3 12 13 5" stroke="#45d5f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs text-ink">Screened 428 &middot; Included 12 &middot; Cohen&apos;s kappa 0.82</span>
            </div>
          )}
        </div>
      </div>
    </HeroFrame>
  )
}

const RA_CSS = `
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
@keyframes raCaret{0%,100%{border-color:transparent}50%{border-color:#45d5f2}}
@keyframes raPulse{0%,100%{transform:scale(1)}45%{transform:scale(1.07)}}
`
