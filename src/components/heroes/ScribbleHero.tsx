import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { HeroFrame } from './HeroFrame'

/*
 * ScribbleHero: an animated project-page hero framed on a phone. A couple of
 * quick notes are typed into an inbox and a sticker is dropped beside one, then a
 * footer confirms everything is saved on this device with no account and nothing
 * collected. The final beat is that footer, so with reduced motion (and in the
 * prerendered HTML) the frame shows statically with no timers. Beats advance on
 * setTimeout and loop.
 *
 * Illustrative mock content.
 */

const BEATS = 3
const LAST = BEATS - 1
const DURATIONS = [2400, 2600, 2000] // ms per beat; final beat is the hold

export function ScribbleHero() {
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
    <HeroFrame frame="phone" tone="ink">
      <div
        aria-hidden="true"
        className={`sc-root absolute inset-0 flex flex-col bg-canvas px-3.5 pb-4 pt-7 ${reduce ? '' : 'sc-play'}`}
      >
        <style>{SC_CSS}</style>

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-inkStrong">Ideas</span>
          <span className="inline-flex items-center gap-1 rounded-md border border-hairline bg-card px-2 py-0.5 font-mono text-[0.56rem] uppercase tracking-label text-inkMuted">
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
              <rect x="2.5" y="1.5" width="7" height="9" rx="1" stroke="currentColor" strokeWidth="1" />
              <path d="M2.5 4.2h7" stroke="currentColor" strokeWidth="1" />
            </svg>
            Inbox
          </span>
        </div>

        <div key={cycle} className="mt-3 flex flex-1 flex-col">
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <div className="sc-b1 flex-1 rounded-lg border border-hairline bg-card px-3 py-2 text-[0.78rem] leading-snug text-ink">
                Paint the hallway green?
              </div>
              {beat >= 1 && (
                <div className="sc-sticker flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-accentWarm/40 bg-accentWarm/15">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d="M8 2.5 13.5 8 8 13.5 2.5 8z" fill="#f4b05a" opacity="0.45" />
                    <path d="M8 2.5 13.5 8 8 13.5 2.5 8z" stroke="#f4b05a" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
            {beat >= 1 && (
              <div className="sc-b2 rounded-lg border border-hairline bg-card px-3 py-2 text-[0.78rem] leading-snug text-ink">
                Call the framers on Tuesday.
              </div>
            )}
          </div>

          {beat >= 2 && (
            <div className="sc-foot mt-auto flex items-center gap-2.5 rounded-xl border border-accent/30 bg-accent/10 px-3 py-2.5">
              <svg viewBox="0 0 20 20" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
                <rect x="4.5" y="9" width="11" height="8" rx="1.5" fill="#45d5f2" fillOpacity="0.22" stroke="#45d5f2" strokeWidth="1.3" />
                <path d="M7 9V7a3 3 0 0 1 6 0v2" stroke="#45d5f2" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="10" cy="12.6" r="1.3" fill="#45d5f2" />
              </svg>
              <div>
                <p className="text-[0.78rem] font-semibold text-accent">Saved on this device</p>
                <p className="mt-0.5 text-[0.64rem] leading-snug text-inkMuted">
                  No account. No server. Nothing collected.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </HeroFrame>
  )
}

const SC_CSS = `
.sc-play .sc-b1{animation:scRise .5s cubic-bezier(.16,1,.3,1) both}
.sc-play .sc-b2{animation:scRise .5s cubic-bezier(.16,1,.3,1) both}
.sc-play .sc-sticker{animation:scPop .5s cubic-bezier(.16,1,.3,1) .12s both}
.sc-play .sc-foot{animation:scRise .5s cubic-bezier(.16,1,.3,1) both}
@keyframes scRise{from{opacity:0;transform:translateY(10px)}}
@keyframes scPop{from{opacity:0;transform:scale(0) rotate(-12deg)}}
`
