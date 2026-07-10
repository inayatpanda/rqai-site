import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { HeroFrame } from './HeroFrame'
import type { HeroSceneProps, ProductTheme } from '../../data/products'

/*
 * ClinicalPROMsHero: an animated project-page hero laid out as a landscape
 * two-pane. On the left a patient answers a validated questionnaire: an option
 * fills, the next question slides in and the progress bar advances. On the right
 * an instrument summary sits, and on the final beat an encryption card confirms
 * the answers stay encrypted on the device. Beats advance on setTimeout and loop;
 * the final beat is that encryption card, so with reduced motion (and in the
 * prerendered HTML) the whole frame shows statically with no timers.
 *
 * The scene panel adopts the ClinicalPROMs (Ortho Outcomes) spoke-site palette
 * (a white clinical canvas, cyan primary, deep-teal ink and an emerald outcome
 * cue) so the hand-off to the external site reads as one continuous surface.
 * Colours arrive as a `theme` prop from products.ts, with a matching fallback so
 * the component is safe to render bare.
 *
 * Illustrative mock content.
 */

const PROMS_THEME: ProductTheme = {
  accent: '#0e7490',
  accentInk: '#ffffff',
  accentBright: '#22d3ee',
  panelBg: '#ffffff',
  panelInk: '#0c3a47',
  panelMuted: '#3f5b65',
  panelLine: '#d6eef5',
  panelTint: '#ecfeff',
}

/** Emerald "outcome / improvement" cue, drawn from the spoke's accent colour. */
const OUTCOME = '#047857'

const BEATS = 3
const LAST = BEATS - 1
const DURATIONS = [2600, 2600, 2100] // ms per beat; final beat is the hold

const QUESTIONS = [
  {
    prompt: 'Could you walk down a flight of stairs?',
    options: ['Without any trouble', 'With little difficulty', 'With moderate difficulty', 'Unable to do'],
    selected: 1,
    progress: { pct: 33, label: '4 of 12' },
  },
  {
    prompt: 'How would you describe the pain you usually have?',
    options: ['None', 'Mild', 'Moderate', 'Severe'],
    selected: 1,
    progress: { pct: 42, label: '5 of 12' },
  },
]

export function ClinicalPROMsHero({ theme = PROMS_THEME }: HeroSceneProps = {}) {
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
  const complete = beat >= 2
  const q = QUESTIONS[Math.min(beat, 1)]

  return (
    <HeroFrame frame="browser" host="clinicalproms.rqai.co.uk" tone="ink">
      <div
        aria-hidden="true"
        className={`pm-root relative h-[19rem] overflow-hidden p-4 md:h-[21rem] md:p-5 ${reduce ? '' : 'pm-play'}`}
        style={{ backgroundColor: t.panelBg }}
      >
        <style>{pmCss(t.panelLine, t.panelMuted)}</style>

        <div key={cycle} className="flex h-full min-h-0 gap-4 md:gap-5">
          {/* Left pane: the questionnaire */}
          <div className="flex min-h-0 min-w-0 flex-col overflow-hidden flex-[58_1_0%]">
            <div className="text-sm font-semibold" style={{ color: t.panelInk }}>Oxford Knee Score</div>

            <div className="mt-2 flex items-center justify-between font-mono text-[0.62rem]" style={{ color: t.panelMuted }}>
              <span className="uppercase tracking-label">Progress</span>
              <span>{q.progress.label}</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: t.panelLine }}>
              <span className="pm-bar block h-full rounded-full" style={{ width: `${q.progress.pct}%`, backgroundColor: t.accent }} />
            </div>

            <div
              key={`q-${beat}`}
              className="pm-card mt-3 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border p-3"
              style={{ backgroundColor: '#ffffff', borderColor: t.panelLine }}
            >
              <p className="text-[0.82rem] font-medium leading-snug" style={{ color: t.panelInk }}>{q.prompt}</p>
              <div className="mt-3 flex flex-col gap-1.5">
                {q.options.map((option, i) => {
                  const chosen = i === q.selected
                  return (
                    <div
                      key={option}
                      className={`pm-opt flex items-center gap-2 rounded-lg border px-3 py-1.5 ${chosen ? 'pm-chosen' : ''}`}
                      style={{
                        borderColor: chosen ? t.accent : t.panelLine,
                        backgroundColor: chosen ? t.panelTint : 'transparent',
                      }}
                    >
                      <span
                        className="pm-radio flex h-3.5 w-3.5 flex-none items-center justify-center rounded-full border-2"
                        style={{ borderColor: chosen ? t.accent : t.panelMuted }}
                      >
                        {chosen && <span className="pm-dot h-1.5 w-1.5 rounded-full" style={{ backgroundColor: t.accent }} />}
                      </span>
                      <span className="text-[0.76rem]" style={{ color: t.panelInk }}>{option}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right pane: instrument summary + encryption */}
          <div
            className="flex min-h-0 min-w-0 flex-col gap-3 overflow-hidden border-l pl-4 flex-[42_1_0%] md:pl-5"
            style={{ borderColor: t.panelLine }}
          >
            <div className="pm-sum rounded-xl border p-3" style={{ backgroundColor: '#ffffff', borderColor: t.panelLine }}>
              <span
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[0.62rem] font-medium"
                style={{ borderColor: t.accent, backgroundColor: t.panelTint, color: t.accent }}
              >
                Validated instrument
              </span>
              <p className="mt-2 text-[0.74rem] leading-snug" style={{ color: t.panelMuted }}>Scored exactly as published</p>
            </div>

            {complete && (
              <div
                className="pm-enc flex min-h-0 flex-1 flex-col items-center justify-center gap-2 rounded-xl border p-4 text-center"
                style={{ backgroundColor: t.panelTint, borderColor: t.accent }}
              >
                <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" aria-hidden="true">
                  <circle
                    className="pm-seal"
                    cx="24"
                    cy="24"
                    r="20"
                    stroke={t.accent}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    pathLength={100}
                  />
                  <path
                    className="pm-check"
                    d="M15 24.5 21.5 31 33 18"
                    stroke={t.accent}
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={100}
                  />
                </svg>
                <p className="text-[0.8rem] font-semibold" style={{ color: t.panelInk }}>Answers encrypted on this phone</p>
                <p className="text-[0.68rem] leading-snug" style={{ color: t.panelMuted }}>The key never leaves your device.</p>
                <span
                  className="pm-badge rounded-full px-3 py-1 text-[0.7rem] font-medium"
                  style={{ backgroundColor: OUTCOME, color: '#ffffff' }}
                >
                  Submitted &#10003;
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </HeroFrame>
  )
}

const pmCss = (line: string, muted: string) => `
.pm-play .pm-bar{transition:width .6s cubic-bezier(.16,1,.3,1)}
.pm-play .pm-card{animation:pmCard .5s cubic-bezier(.16,1,.3,1) both}
.pm-play .pm-sum{animation:pmCard .5s cubic-bezier(.16,1,.3,1) both}
.pm-play .pm-enc{animation:pmCard .5s cubic-bezier(.16,1,.3,1) both}
.pm-play .pm-chosen{animation:pmRow .4s ease .62s both}
.pm-play .pm-chosen .pm-radio{animation:pmRing .4s ease .62s both}
.pm-dot{transform-origin:center}
.pm-play .pm-dot{animation:pmDot .34s cubic-bezier(.16,1,.3,1) .64s both}
.pm-seal{stroke-dasharray:100;stroke-dashoffset:0}
.pm-play .pm-seal{animation:pmDraw .6s ease both}
.pm-check{stroke-dasharray:100;stroke-dashoffset:0}
.pm-play .pm-check{animation:pmDraw .4s ease .5s both}
.pm-play .pm-badge{animation:pmPop .4s cubic-bezier(.16,1,.3,1) .95s both}
@keyframes pmCard{from{opacity:0;transform:translateY(14px)}}
@keyframes pmRow{from{background-color:transparent;border-color:${line}}}
@keyframes pmRing{from{border-color:${muted}}}
@keyframes pmDot{from{transform:scale(0)}}
@keyframes pmDraw{from{stroke-dashoffset:100}}
@keyframes pmPop{from{opacity:0;transform:scale(.85)}}
`
