import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { HeroFrame } from './HeroFrame'

/*
 * AudioQuillHero: an animated project-page hero. A live transcript captures messy
 * speech, a clean pass rewrites it into a tidy sentence, and a structured view
 * files it under a heading while the original transcript stays preserved. The
 * final beat is that structured view, so with reduced motion (and in the
 * prerendered HTML) it shows statically with no timers. Beats advance on
 * setTimeout and loop.
 *
 * Illustrative mock content.
 */

const BEATS = 3
const LAST = BEATS - 1
const DURATIONS = [2700, 2600, 2000] // ms per beat; final beat is the hold

const WAVE = [10, 18, 13, 24, 16, 28, 12, 22, 26, 15, 30, 19, 11, 21] // bar heights in px
const TABS = ['Raw', 'Clean', 'Struct', 'Pro']

export function AudioQuillHero() {
  const reduce = useReducedMotion() === true
  const [step, setStep] = useState(LAST) // prerender + first paint show the complete final beat

  useEffect(() => {
    if (reduce) return
    const t = window.setTimeout(() => setStep((s) => s + 1), DURATIONS[step % BEATS])
    return () => window.clearTimeout(t)
  }, [step, reduce])

  const beat = step % BEATS
  const cycle = Math.floor(step / BEATS)
  const structured = beat >= 2

  return (
    <HeroFrame frame="browser" host="audioquill.rqai.co.uk" tone="ink">
      <div
        aria-hidden="true"
        className={`aq-root relative h-[19rem] overflow-hidden bg-canvas p-4 md:h-[21rem] md:p-5 ${reduce ? '' : 'aq-play'}`}
      >
        <style>{AQ_CSS}</style>

        <div key={cycle} className="flex h-full flex-col gap-3">
          {!structured ? (
            <>
              <div className="flex items-center justify-between">
                <span className="aq-eyebrow font-mono text-[0.65rem] uppercase tracking-label text-inkMuted">
                  Live transcript
                </span>
                {beat >= 1 && (
                  <span className="aq-pill rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[0.66rem] font-semibold text-accent">
                    Clean
                  </span>
                )}
              </div>

              <div className="aq-wave flex h-10 items-end gap-[3px]">
                {WAVE.map((h, i) => (
                  <span
                    key={i}
                    className="aq-bar w-[3px] flex-none rounded-full bg-accent/70"
                    style={{ height: `${h}px`, ['--i' as string]: i }}
                  />
                ))}
              </div>

              <div className="relative flex-1">
                {beat === 0 ? (
                  <p className="aq-messy text-[0.86rem] leading-relaxed text-inkMuted">
                    um so the the patient is a fifty four year old er keen runner with with right knee pain
                  </p>
                ) : (
                  <p className="aq-clean text-[0.9rem] leading-relaxed text-ink">
                    The patient is a 54 year old keen runner presenting with right knee pain.
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="aq-tabs flex gap-1.5">
                {TABS.map((tab) => (
                  <span
                    key={tab}
                    className={`rounded-md px-2.5 py-1 text-[0.72rem] font-medium ${
                      tab === 'Clean' ? 'bg-accent text-canvas' : 'border border-hairline text-inkMuted'
                    }`}
                  >
                    {tab}
                  </span>
                ))}
              </div>

              <div className="aq-body">
                <div className="font-mono text-[0.62rem] uppercase tracking-label text-accent">
                  Presenting complaint
                </div>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-ink">
                  The patient is a 54 year old keen runner presenting with right knee pain.
                </p>
              </div>

              <div className="aq-foot mt-auto flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-3 py-2">
                <svg viewBox="0 0 16 16" className="h-4 w-4 flex-none" fill="none" aria-hidden="true">
                  <path d="M3 8.5 6.3 12 13 5" stroke="#45d5f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs text-ink">Original transcript preserved &#10003;</span>
              </div>
            </>
          )}
        </div>
      </div>
    </HeroFrame>
  )
}

const AQ_CSS = `
.aq-play .aq-eyebrow{animation:aqIn .5s ease both}
.aq-play .aq-pill{animation:aqPulse 1s ease .1s 2 both}
.aq-play .aq-bar{animation:aqWave 1s ease-in-out infinite;transform-origin:bottom;animation-delay:calc(var(--i,0)*70ms)}
.aq-play .aq-messy{animation:aqIn .5s ease both}
.aq-play .aq-clean{animation:aqIn .5s ease both}
.aq-play .aq-tabs{animation:aqIn .5s ease both}
.aq-play .aq-body{animation:aqIn .5s ease .08s both}
.aq-play .aq-foot{animation:aqPop .5s cubic-bezier(.16,1,.3,1) .16s both}
@keyframes aqIn{from{opacity:0;transform:translateY(8px)}}
@keyframes aqPop{from{opacity:0;transform:scale(.92)}}
@keyframes aqPulse{0%,100%{transform:scale(1)}45%{transform:scale(1.07)}}
@keyframes aqWave{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}
`
