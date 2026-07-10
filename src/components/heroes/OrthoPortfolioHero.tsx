import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { HeroFrame } from './HeroFrame'

/*
 * OrthoPortfolioHero: an animated project-page hero. Raw evidence documents land
 * in an inbox, patient details are redacted and verified, each document is filed
 * against the right requirement, and a readiness dashboard settles. The final
 * beat is the readiness bar at 78 per cent, so with reduced motion (and in the
 * prerendered HTML) that whole frame shows statically with no timers. Beats
 * advance on setTimeout and loop.
 *
 * Illustrative mock content.
 */

const BEATS = 4
const LAST = BEATS - 1
const DURATIONS = [2200, 2500, 2400, 1900] // ms per beat; final beat is the hold

const TILES = [
  { label: 'PBA', target: 12, suffix: ' of 13' },
  { label: 'CBD', target: 14, suffix: ' of 14' },
  { label: 'CPD', target: 41, suffix: ' credits' },
]

/** A tile counter that ticks up from zero when it mounts (each cycle). */
function CountUp({ target, animate }: { target: number; animate: boolean }) {
  const [n, setN] = useState(target)

  useEffect(() => {
    if (!animate) return
    let raf = 0
    let started = 0
    const duration = 700
    setN(0)
    const frame = (t: number) => {
      if (!started) started = t
      const k = Math.min(1, (t - started) / duration)
      setN(Math.round(target * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(frame)
      else setN(target)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [target, animate])

  return <>{n}</>
}

function FileGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 flex-none" fill="none" aria-hidden="true">
      <path d="M4 2h5l3 3v9H4z" stroke="#93a2c8" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M9 2v3h3" stroke="#93a2c8" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

function ShieldTick() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 flex-none" fill="none" aria-hidden="true">
      <path d="M8 1.5 13 3.5v4c0 3-2.2 5.3-5 6.5-2.8-1.2-5-3.5-5-6.5v-4z" stroke="#45d5f2" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5.6 7.9 7.4 9.7 10.6 6" stroke="#45d5f2" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function OrthoPortfolioHero() {
  const reduce = useReducedMotion() === true
  const [step, setStep] = useState(LAST) // prerender + first paint show the complete final beat

  useEffect(() => {
    if (reduce) return
    const t = window.setTimeout(() => setStep((s) => s + 1), DURATIONS[step % BEATS])
    return () => window.clearTimeout(t)
  }, [step, reduce])

  const beat = step % BEATS
  const cycle = Math.floor(step / BEATS)
  const filed = beat >= 2

  return (
    <HeroFrame frame="browser" host="orthoportfolio.rqai.co.uk" tone="accent">
      <div
        aria-hidden="true"
        className={`op-root relative h-[19rem] overflow-hidden bg-canvas p-4 md:h-[21rem] md:p-5 ${reduce ? '' : 'op-play'}`}
      >
        <style>{OP_CSS}</style>

        <div key={cycle} className="flex h-full flex-col gap-2.5 md:gap-3">
          <div className="op-eyebrow font-mono text-[0.65rem] uppercase tracking-label text-inkMuted">
            Evidence inbox
          </div>

          {!filed ? (
            <div className="flex flex-col gap-2">
              <div
                className="op-row flex items-center gap-2 rounded-lg border border-hairline bg-card px-3 py-2"
                style={{ ['--d' as string]: '60ms' }}
              >
                <FileGlyph />
                <span className="truncate text-[0.78rem] text-ink">PBA - Dynamic hip screw, Level 4.pdf</span>
              </div>

              <div
                className="op-row flex flex-col gap-1.5 rounded-lg border border-hairline bg-card px-3 py-2"
                style={{ ['--d' as string]: '180ms' }}
              >
                <div className="flex items-center gap-2">
                  <FileGlyph />
                  <span className="truncate text-[0.78rem] text-ink">Clinic letter - Mr E. Whitfield.pdf</span>
                </div>
                <div className="relative flex items-center gap-1.5 pl-6">
                  <span className="h-2 w-16 rounded-full bg-inkMuted/25" />
                  <span className="h-2 w-10 rounded-full bg-inkMuted/25" />
                  <span className="h-2 w-14 rounded-full bg-inkMuted/25" />
                  {beat >= 1 && (
                    <>
                      <span className="op-redact op-redact-a absolute left-6 top-1/2 h-2.5 w-[4.5rem] -translate-y-1/2 rounded-[3px] bg-[#04060c]" />
                      <span className="op-redact op-redact-b absolute left-[7.75rem] top-1/2 h-2.5 w-14 -translate-y-1/2 rounded-[3px] bg-[#04060c]" />
                    </>
                  )}
                </div>
              </div>

              {beat >= 1 && (
                <div className="op-chip flex w-max items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[0.66rem] font-medium text-accent">
                  <ShieldTick />
                  PII redacted and verified
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2">
                {TILES.map((tile, i) => (
                  <div
                    key={tile.label}
                    className="op-tile rounded-lg border border-hairline bg-card px-3 py-2"
                    style={{ ['--d' as string]: `${i * 90}ms` }}
                  >
                    <div className="font-mono text-[0.6rem] uppercase tracking-label text-inkMuted">{tile.label}</div>
                    <div className="mt-0.5 text-[0.86rem] font-semibold text-inkStrong">
                      <CountUp target={tile.target} animate={!reduce} />
                      {tile.suffix}
                    </div>
                  </div>
                ))}
                <div className="op-tile rounded-lg border border-hairline bg-card px-3 py-2" style={{ ['--d' as string]: '270ms' }}>
                  <div className="font-mono text-[0.6rem] uppercase tracking-label text-inkMuted">MSF</div>
                  <div className="mt-0.5 text-[0.86rem] font-semibold text-inkStrong">complete</div>
                </div>
              </div>

              {beat >= 3 && (
                <div className="op-ready mt-auto flex flex-col gap-2 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[0.76rem] text-ink">Submission readiness 78%</span>
                    <span className="op-compile flex-none rounded-full bg-accent px-2.5 py-0.5 text-[0.64rem] font-semibold text-canvas">
                      Compile section PDF &#10003;
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-hairline/60">
                    <span className="op-fill block h-full rounded-full bg-accent" style={{ width: '78%' }} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </HeroFrame>
  )
}

const OP_CSS = `
.op-play .op-eyebrow{animation:opIn .5s ease both}
.op-play .op-row{animation:opSlide .5s cubic-bezier(.16,1,.3,1) both;animation-delay:var(--d,0ms)}
.op-play .op-redact-a{animation:opWipe .45s cubic-bezier(.16,1,.3,1) .1s both}
.op-play .op-redact-b{animation:opWipe .45s cubic-bezier(.16,1,.3,1) .26s both}
.op-play .op-chip{animation:opPop .5s cubic-bezier(.16,1,.3,1) .5s both}
.op-play .op-tile{animation:opSlide .5s cubic-bezier(.16,1,.3,1) both;animation-delay:var(--d,0ms)}
.op-play .op-ready{animation:opPop .5s cubic-bezier(.16,1,.3,1) both}
.op-play .op-fill{animation:opFill .8s cubic-bezier(.16,1,.3,1) .15s both}
.op-play .op-compile{animation:opPop .45s cubic-bezier(.16,1,.3,1) .5s both}
@keyframes opIn{from{opacity:0;transform:translateY(6px)}}
@keyframes opSlide{from{opacity:0;transform:translateX(-14px)}}
@keyframes opPop{from{opacity:0;transform:scale(.92)}}
@keyframes opWipe{from{transform:translateX(-108%) translateY(-50%)}}
@keyframes opFill{from{width:0}}
`
