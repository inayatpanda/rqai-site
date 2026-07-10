import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { HeroFrame } from './HeroFrame'

/*
 * AudioQuillHero: an animated project-page hero for a general-purpose dictation
 * studio. A live transcript captures messy speech, a clean pass rewrites it into
 * a tidy sentence, recordings are filed into folders by date, and a set of notes
 * compiles into one shareable document while the original transcript stays
 * preserved. The final beat is that compile strip, so with reduced motion (and in
 * the prerendered HTML) the whole frame shows statically with no timers. Beats
 * advance on setTimeout and loop.
 *
 * Illustrative mock content.
 */

const BEATS = 4
const LAST = BEATS - 1
const DURATIONS = [2700, 2600, 2400, 2200] // ms per beat; final beat is the hold

const WAVE = [10, 18, 13, 24, 16, 28, 12, 22, 26, 15, 30, 19, 11, 21] // bar heights in px
const TABS = ['Raw', 'Clean', 'Struct', 'Pro']

const MESSY = 'um so we got to the lake just after sunrise and and the mist was still on the water'
const CLEAN = 'We reached the lake just after sunrise, with the mist still on the water.'

/** Reveals a string character by character on mount; full string with no JS. */
function TypeOn({ text }: { text: string }) {
  const [n, setN] = useState(text.length)

  useEffect(() => {
    let raf = 0
    let started = 0
    const total = text.length * 30 // ms per character
    setN(0)
    const frame = (t: number) => {
      if (!started) started = t
      const k = Math.min(1, (t - started) / total)
      setN(Math.round(text.length * k))
      if (k < 1) raf = requestAnimationFrame(frame)
      else setN(text.length)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [text])

  return <>{text.slice(0, n)}</>
}

function FolderGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3 flex-none text-inkMuted" fill="none" aria-hidden="true">
      <path d="M2 4.2h4.2l1.1 1.3H14v7.3H2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

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

  return (
    <HeroFrame frame="browser" host="audioquill.rqai.co.uk" tone="ink">
      <div
        aria-hidden="true"
        className={`aq-root relative h-[19rem] overflow-hidden bg-canvas p-4 md:h-[21rem] md:p-5 ${reduce ? '' : 'aq-play'}`}
      >
        <style>{AQ_CSS}</style>

        <div key={cycle} className="flex h-full flex-col gap-2.5">
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

          <div className="aq-panel flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden rounded-lg border border-hairline bg-card/50 p-3">
            <div className="aq-wave flex h-8 items-end gap-[3px]">
              {WAVE.map((h, i) => (
                <span
                  key={i}
                  className="aq-bar w-[3px] flex-none rounded-full bg-accent/70"
                  style={{ height: `${h}px`, ['--i' as string]: i }}
                />
              ))}
            </div>
            <div className="min-h-0 flex-1 overflow-hidden">
              {beat === 0 ? (
                <p className="aq-messy text-[0.86rem] leading-relaxed text-inkMuted">
                  <TypeOn text={MESSY} />
                  <span className="aq-caret" />
                </p>
              ) : (
                <p className="aq-clean text-[0.9rem] leading-relaxed text-ink">{CLEAN}</p>
              )}
            </div>
          </div>

          {beat >= 1 && (
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
          )}

          {beat >= 2 && (
            <div className="aq-org flex flex-wrap items-center gap-1.5">
              <span className="flex items-center gap-1.5 rounded-full border border-hairline bg-card px-2.5 py-1 text-[0.68rem] text-ink">
                <FolderGlyph />
                Journal · 12 notes
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-hairline bg-card px-2.5 py-1 text-[0.68rem] text-ink">
                <FolderGlyph />
                Travel · 4 notes
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[0.68rem] font-medium text-accent">
                <svg viewBox="0 0 16 16" className="h-3 w-3 flex-none" fill="none" aria-hidden="true">
                  <rect x="2.5" y="3.5" width="11" height="10" rx="1.3" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M2.5 6.2h11M5.5 2.3v2.4M10.5 2.3v2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                10 July
              </span>
            </div>
          )}

          {beat >= 3 && (
            <>
              <div className="aq-compile flex flex-wrap items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5">
                <span className="text-xs font-semibold text-inkStrong">3 notes</span>
                <span className="aq-run flex-none rounded-full bg-accent px-2.5 py-0.5 text-[0.64rem] font-semibold text-canvas">
                  Compile
                </span>
                <span className="text-xs text-ink">One document · exported to DOCX</span>
              </div>
              <div className="aq-foot flex items-center gap-1.5 text-[0.7rem] text-inkMuted">
                <span>Original transcript preserved &#10003; · Share</span>
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
.aq-play .aq-panel{animation:aqIn .5s ease both}
.aq-play .aq-bar{animation:aqWave 1s ease-in-out infinite;transform-origin:bottom;animation-delay:calc(var(--i,0)*70ms)}
.aq-play .aq-messy{animation:aqIn .5s ease both}
.aq-play .aq-clean{animation:aqIn .5s ease both}
.aq-caret{display:inline-block;width:2px;height:.95em;margin-left:1px;vertical-align:text-bottom;background:#45d5f2}
.aq-play .aq-caret{animation:aqBlink .7s step-end infinite}
.aq-play .aq-tabs{animation:aqIn .5s ease both}
.aq-play .aq-org{animation:aqSlide .5s cubic-bezier(.16,1,.3,1) both}
.aq-play .aq-compile{animation:aqPop .5s cubic-bezier(.16,1,.3,1) both}
.aq-play .aq-run{animation:aqPulse 1.1s ease .35s 1 both}
.aq-play .aq-foot{animation:aqIn .5s ease .1s both}
@keyframes aqIn{from{opacity:0;transform:translateY(8px)}}
@keyframes aqSlide{from{opacity:0;transform:translateX(-12px)}}
@keyframes aqPop{from{opacity:0;transform:scale(.94)}}
@keyframes aqPulse{0%,100%{transform:scale(1)}45%{transform:scale(1.07)}}
@keyframes aqWave{0%,100%{transform:scaleY(.4)}50%{transform:scaleY(1)}}
@keyframes aqBlink{0%,100%{opacity:1}50%{opacity:0}}
`
