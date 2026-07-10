import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { HeroFrame } from './HeroFrame'

/*
 * OrthoConsultantPrepHero: an animated project-page hero. A timed mock
 * consultant interview. A question sits under a depleting clock, a model answer
 * slides up, then a run summary settles. Beats advance on setTimeout and loop;
 * the final beat is the complete run, so with reduced motion (and in the
 * prerendered HTML) that whole frame shows statically with no timers.
 *
 * Illustrative mock content.
 */

const BEATS = 3
const LAST = BEATS - 1
const DURATIONS = [2600, 2400, 1700] // ms per beat; final beat is the hold

const CLOCK = ['3:00', '2:59', '2:58', '2:57']

/** The interview clock counting down its first few seconds each cycle. */
function ClockTicker({ animate }: { animate: boolean }) {
  const [i, setI] = useState(CLOCK.length - 1) // final tick by default

  useEffect(() => {
    if (!animate) return
    setI(0)
    const timers: number[] = []
    for (let k = 1; k < CLOCK.length; k += 1) {
      timers.push(window.setTimeout(() => setI(k), k * 520))
    }
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [animate])

  return <>{CLOCK[i]}</>
}

const ANSWER = [
  'Quantify the problem: breach patterns, staffing, flow data.',
  'Fix the system, not the individual: escalation, streaming, senior review.',
]

export function OrthoConsultantPrepHero() {
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
    <HeroFrame frame="browser" host="consultantprep.rqai.co.uk" tone="accent">
      <div
        aria-hidden="true"
        className={`ci-root relative h-[19rem] overflow-hidden bg-canvas p-4 md:h-[21rem] md:p-5 ${reduce ? '' : 'ci-play'}`}
      >
        <style>{CI_CSS}</style>

        <div key={cycle} className="flex h-full flex-col gap-2 md:gap-2.5">
          <div className="ci-eyebrow font-mono text-[0.65rem] uppercase tracking-label text-inkMuted">
            Mock interview &middot; Question 3 of 10
          </div>

          <div className="flex items-start gap-3">
            <div className="ci-q flex-1 rounded-lg border border-hairline bg-card px-3 py-2">
              <p className="text-[0.8rem] leading-snug text-ink">
                Your unit keeps missing the 4-hour target. As the new consultant, what do you do?
              </p>
            </div>
            <div className="ci-clock relative flex-none">
              <svg viewBox="0 0 44 44" className="h-14 w-14" fill="none" aria-hidden="true">
                <circle cx="22" cy="22" r="18" stroke="#2e4374" strokeWidth="3" />
                <circle
                  className="ci-ring"
                  cx="22"
                  cy="22"
                  r="18"
                  stroke="#f4b05a"
                  strokeWidth="3"
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray="100"
                  strokeDashoffset="26"
                  transform="rotate(-90 22 22)"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-semibold text-inkStrong">
                <ClockTicker animate={!reduce} />
              </span>
            </div>
          </div>

          {beat >= 1 && (
            <div className="ci-panel rounded-lg border border-hairline bg-card px-3 py-2">
              <div className="font-mono text-[0.65rem] uppercase tracking-label text-accent">Model answer</div>
              <ul className="mt-1.5 flex flex-col gap-1">
                {ANSWER.map((point, i) => (
                  <li
                    key={point}
                    className="ci-point flex gap-2 text-[0.8rem] leading-snug text-ink"
                    style={{ ['--d' as string]: `${i * 130}ms` }}
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {beat >= 2 && (
            <div className="ci-foot mt-auto flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5">
              <svg viewBox="0 0 16 16" className="ci-tick h-4 w-4 flex-none" fill="none" aria-hidden="true">
                <path d="M3 8.5 6.3 12 13 5" stroke="#45d5f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-xs text-ink">Answered 3 &middot; Skipped 0 &middot; Streak 4 days</span>
            </div>
          )}
        </div>
      </div>
    </HeroFrame>
  )
}

const CI_CSS = `
.ci-play .ci-eyebrow{animation:ciIn .5s ease both}
.ci-play .ci-q{animation:ciIn .5s ease .08s both}
.ci-play .ci-clock{animation:ciIn .5s ease .16s both}
.ci-play .ci-ring{animation:ciRing 2s ease both}
.ci-play .ci-panel{animation:ciSlide .5s cubic-bezier(.16,1,.3,1) both}
.ci-play .ci-point{animation:ciIn .45s ease both;animation-delay:var(--d,0ms)}
.ci-play .ci-foot{animation:ciPop .5s cubic-bezier(.16,1,.3,1) both}
.ci-play .ci-tick{animation:ciPop .45s cubic-bezier(.16,1,.3,1) .1s both}
@keyframes ciIn{from{opacity:0;transform:translateY(8px)}}
@keyframes ciSlide{from{opacity:0;transform:translateY(12px)}}
@keyframes ciPop{from{opacity:0;transform:scale(.9)}}
@keyframes ciRing{from{stroke:#45d5f2;stroke-dashoffset:0}}
`
