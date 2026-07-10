import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { HeroFrame } from './HeroFrame'

/*
 * ScribbleHero: an animated project-page hero framed on a phone that shows the
 * whole Scribble interface. Persistent chrome (a "Scribble" top bar and a
 * five-tab bottom bar) frames three screens that cycle: a home screen with
 * quick actions and recent notes; a block editor where two notes type on and a
 * sticker pops beside one; and a clean preview that rests on the privacy footer.
 * The three screens are all present in the DOM and crossfade, so the prerendered
 * HTML and reduced-motion users see the complete final screen (that footer)
 * statically with no timers. Beats advance on setTimeout and loop.
 *
 * Illustrative mock content.
 */

const BEATS = 3
const LAST = BEATS - 1
const DURATIONS = [2600, 3000, 2400] // ms per beat; final beat is the hold

/* Bottom tab bar: labelled glyph tabs, stroke-only inline SVGs on a 0 0 20 20 grid. */
const TABS: { name: string; icon: JSX.Element }[] = [
  {
    name: 'Home',
    icon: (
      <>
        <path d="M4 9.5 10 4.5l6 5" />
        <path d="M5.6 8.7V15.5h8.8V8.7" />
      </>
    ),
  },
  {
    name: 'Calendar',
    icon: (
      <>
        <rect x="4" y="5" width="12" height="11" rx="1.5" />
        <path d="M4 8.5h12M7.4 3.4v3M12.6 3.4v3" />
      </>
    ),
  },
  {
    name: 'Notebooks',
    icon: (
      <>
        <rect x="6.5" y="3.8" width="9" height="9" rx="1.5" />
        <path d="M4.5 6.5v7.7A1.5 1.5 0 0 0 6 15.7h7.2" />
      </>
    ),
  },
  {
    name: 'Tags',
    icon: (
      <>
        <path d="M10 3.5 16.5 10 10 16.5 3.5 10z" />
        <circle cx="7.3" cy="7.3" r="1" />
      </>
    ),
  },
  {
    name: 'Settings',
    icon: (
      <>
        <circle cx="10" cy="10" r="2.7" />
        <path d="M10 3.7v2M10 14.3v2M3.7 10h2M14.3 10h2M5.6 5.6l1.4 1.4M13 13l1.4 1.4M14.4 5.6l-1.4 1.4M7 13l-1.4 1.4" />
      </>
    ),
  },
]

export function ScribbleHero() {
  const reduce = useReducedMotion() === true
  const [step, setStep] = useState(LAST) // prerender + first paint show the complete final beat

  useEffect(() => {
    if (reduce) return
    const t = window.setTimeout(() => setStep((s) => s + 1), DURATIONS[step % BEATS])
    return () => window.clearTimeout(t)
  }, [step, reduce])

  const beat = step % BEATS
  const activeTab = beat === 0 ? 'Home' : 'Notebooks'
  const cls = (n: number) => `sc-screen absolute inset-0 flex flex-col px-3.5 ${beat === n ? 'sc-on' : 'sc-off'}`

  return (
    <HeroFrame frame="phone" tone="ink">
      <div
        aria-hidden="true"
        className={`sc-root absolute inset-0 flex flex-col bg-canvas pt-7 ${reduce ? '' : 'sc-play'}`}
      >
        <style>{SC_CSS}</style>

        {/* Persistent top bar */}
        <div className="flex items-center justify-between px-3.5 pb-2.5">
          <span className="text-sm font-semibold text-inkStrong">Scribble</span>
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-accent" fill="none" aria-hidden="true">
            <path
              d="M12.5 4 16 7.5 8 15.5H4.5V12z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Screen stack: all three layers present, crossfading */}
        <div className="relative min-h-0 flex-1">
          {/* Home */}
          <div className={cls(0)}>
            <div className="sc-in flex gap-1.5">
              <div className="flex flex-1 flex-col items-center gap-1 rounded-lg bg-accent px-1 py-2 text-[0.56rem] font-semibold text-canvas">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                  <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                New note
              </div>
              <div className="flex flex-1 flex-col items-center gap-1 rounded-lg border border-hairline px-1 py-2 text-[0.56rem] text-inkMuted">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                  <rect x="8" y="3.4" width="4" height="7.4" rx="2" stroke="currentColor" strokeWidth="1.3" />
                  <path
                    d="M5.6 9.6a4.4 4.4 0 0 0 8.8 0M10 14v2.4"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
                Dictate
              </div>
              <div className="flex flex-1 flex-col items-center gap-1 rounded-lg border border-hairline px-1 py-2 text-[0.56rem] text-inkMuted">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                  <path d="M6.6 6 7.6 4.4h4.8L13.4 6" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  <rect x="3.5" y="6" width="13" height="9.4" rx="1.8" stroke="currentColor" strokeWidth="1.3" />
                  <circle cx="10" cy="10.7" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                </svg>
                Photo
              </div>
            </div>

            <p className="sc-in mt-3.5 font-mono text-[0.54rem] uppercase tracking-label text-inkMuted">
              Recent
            </p>
            <div className="sc-in mt-2 flex flex-col gap-2">
              {[
                { title: 'Ideas', sub: '2 blocks · today' },
                { title: 'Reading list', sub: '5 blocks · Tuesday' },
              ].map((note) => (
                <div
                  key={note.title}
                  className="flex items-center gap-2.5 rounded-lg border border-hairline bg-card px-2.5 py-2"
                >
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-md border border-hairline bg-canvas">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-inkMuted" fill="none" aria-hidden="true">
                      <rect x="3.5" y="2.5" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
                      <path d="M5.8 5.6h4.4M5.8 8h4.4M5.8 10.4h2.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[0.74rem] font-medium leading-tight text-ink">{note.title}</p>
                    <p className="mt-0.5 text-[0.58rem] leading-tight text-inkMuted">{note.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className={cls(1)}>
            <div className="flex items-center justify-between">
              <span className="text-[0.82rem] font-semibold text-inkStrong">Ideas</span>
              <div className="flex rounded-md border border-hairline p-0.5 text-[0.56rem] font-medium">
                <span className="rounded bg-accent px-2 py-0.5 text-canvas">Edit</span>
                <span className="px-2 py-0.5 text-inkMuted">Preview</span>
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <div className="sc-b1 flex-1 rounded-lg border border-hairline bg-card px-3 py-2 text-[0.74rem] leading-snug text-ink">
                  Paint the hallway green?
                </div>
                <div className="sc-sticker flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-accentWarm/40 bg-accentWarm/15">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d="M8 2.5 13.5 8 8 13.5 2.5 8z" fill="#f4b05a" opacity="0.45" />
                    <path d="M8 2.5 13.5 8 8 13.5 2.5 8z" stroke="#f4b05a" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="sc-b2 rounded-lg border border-hairline bg-card px-3 py-2 text-[0.74rem] leading-snug text-ink">
                Call the framers on Tuesday.
              </div>
              <div className="sc-b3 flex items-center gap-1.5 rounded-lg border border-dashed border-hairline px-3 py-1.5 text-[0.62rem] text-inkMuted">
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Add block
              </div>
            </div>
          </div>

          {/* Preview + privacy footer (final / hold) */}
          <div className={cls(2)}>
            <div className="flex items-center justify-between">
              <span className="text-[0.82rem] font-semibold text-inkStrong">Ideas</span>
              <div className="flex rounded-md border border-hairline p-0.5 text-[0.56rem] font-medium">
                <span className="px-2 py-0.5 text-inkMuted">Edit</span>
                <span className="rounded bg-accent px-2 py-0.5 text-canvas">Preview</span>
              </div>
            </div>

            <div className="sc-in mt-3.5 flex flex-col gap-2.5">
              <p className="text-[0.8rem] font-medium leading-snug text-ink">Paint the hallway green?</p>
              <div className="flex items-center gap-2">
                <span className="flex h-4 w-4 flex-none items-center justify-center">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                    <path d="M8 2.5 13.5 8 8 13.5 2.5 8z" fill="#f4b05a" opacity="0.45" />
                    <path d="M8 2.5 13.5 8 8 13.5 2.5 8z" stroke="#f4b05a" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="text-[0.74rem] leading-snug text-ink">Call the framers on Tuesday.</p>
              </div>
            </div>

            <div className="sc-foot mt-auto flex items-center gap-2.5 rounded-xl border border-accent/30 bg-accent/10 px-3 py-2.5">
              <svg viewBox="0 0 20 20" className="h-5 w-5 flex-none" fill="none" aria-hidden="true">
                <rect x="4.5" y="9" width="11" height="8" rx="1.5" fill="#45d5f2" fillOpacity="0.22" stroke="#45d5f2" strokeWidth="1.3" />
                <path d="M7 9V7a3 3 0 0 1 6 0v2" stroke="#45d5f2" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="10" cy="12.6" r="1.3" fill="#45d5f2" />
              </svg>
              <div>
                <p className="text-[0.76rem] font-semibold text-accent">Saved on this device</p>
                <p className="mt-0.5 text-[0.62rem] leading-snug text-inkMuted">
                  No account. No server. Nothing collected.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Persistent bottom tab bar */}
        <div className="mt-1 flex items-stretch justify-around border-t border-hairline px-1 pb-2.5 pt-2">
          {TABS.map((tab) => {
            const active = tab.name === activeTab
            return (
              <div
                key={tab.name}
                className={`flex flex-col items-center gap-0.5 ${active ? 'text-accent' : 'text-inkMuted'}`}
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-[15px] w-[15px]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {tab.icon}
                </svg>
                <span className="text-[0.44rem] leading-none tracking-tight">{tab.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    </HeroFrame>
  )
}

const SC_CSS = `
.sc-play .sc-screen{transition:opacity .4s ease}
.sc-screen.sc-off{opacity:0}
.sc-screen.sc-on{opacity:1}
.sc-play .sc-on .sc-in{animation:scRise .5s cubic-bezier(.16,1,.3,1) both}
.sc-play .sc-on .sc-b1{animation:scRise .45s cubic-bezier(.16,1,.3,1) both}
.sc-play .sc-on .sc-sticker{animation:scPop .5s cubic-bezier(.16,1,.3,1) .28s both}
.sc-play .sc-on .sc-b2{animation:scRise .45s cubic-bezier(.16,1,.3,1) .44s both}
.sc-play .sc-on .sc-b3{animation:scFade .5s ease .62s both}
.sc-play .sc-on .sc-foot{animation:scRise .5s cubic-bezier(.16,1,.3,1) .1s both}
@keyframes scRise{from{opacity:0;transform:translateY(10px)}}
@keyframes scPop{from{opacity:0;transform:scale(0) rotate(-12deg)}}
@keyframes scFade{from{opacity:0}}
`
