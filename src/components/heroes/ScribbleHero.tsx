import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { HeroFrame } from './HeroFrame'

/*
 * ScribbleHero: an animated project-page hero laid out as a landscape two-pane.
 * A left rail holds the app title, quick actions and a notes list; the right pane
 * is the editor, where a block types on, an amber sticker pops beside it and a
 * second block appears, then the view flips to a clean preview that rests on the
 * privacy footer. The final beat is that preview, so with reduced motion (and in
 * the prerendered HTML) the whole frame shows statically with no timers. Beats
 * advance on setTimeout and loop.
 *
 * Illustrative mock content.
 */

const BEATS = 3
const LAST = BEATS - 1
const DURATIONS = [2600, 3000, 2400] // ms per beat; final beat is the hold

const NOTES = [
  { title: 'Ideas', sub: '2 blocks · today', active: true },
  { title: 'Reading list', sub: '5 blocks · Tuesday', active: false },
]

/** Reveals a string character by character on mount; full string with no JS. */
function TypeOn({ text }: { text: string }) {
  const [n, setN] = useState(text.length)

  useEffect(() => {
    let raf = 0
    let started = 0
    const total = text.length * 46 // ms per character
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

function StickerGlyph({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <path d="M8 2.5 13.5 8 8 13.5 2.5 8z" fill="#f4b05a" opacity="0.45" />
      <path d="M8 2.5 13.5 8 8 13.5 2.5 8z" stroke="#f4b05a" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  )
}

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
  const preview = beat >= 2

  return (
    <HeroFrame frame="browser" host="scribble.rqai.co.uk" tone="ink">
      <div
        aria-hidden="true"
        className={`sc-root relative h-[19rem] overflow-hidden bg-canvas p-4 md:h-[21rem] md:p-5 ${reduce ? '' : 'sc-play'}`}
      >
        <style>{SC_CSS}</style>

        <div key={cycle} className="flex h-full min-h-0 gap-4 md:gap-5">
          {/* Left rail: title, quick actions, notes */}
          <div className="flex min-h-0 min-w-0 flex-col gap-2 overflow-hidden flex-[34_1_0%]">
            <div className="text-sm font-semibold text-inkStrong">Scribble</div>

            <div className="sc-new flex items-center justify-center gap-1.5 rounded-lg bg-accent px-2 py-1.5 text-[0.66rem] font-semibold text-canvas">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              New note
            </div>

            <div className="flex gap-1.5">
              <div className="flex flex-1 flex-col items-center gap-1 rounded-lg border border-hairline px-1 py-1.5 text-[0.56rem] text-inkMuted">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                  <rect x="8" y="3.4" width="4" height="7.4" rx="2" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M5.6 9.6a4.4 4.4 0 0 0 8.8 0M10 14v2.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Dictate
              </div>
              <div className="flex flex-1 flex-col items-center gap-1 rounded-lg border border-hairline px-1 py-1.5 text-[0.56rem] text-inkMuted">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                  <path d="M6.6 6 7.6 4.4h4.8L13.4 6" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  <rect x="3.5" y="6" width="13" height="9.4" rx="1.8" stroke="currentColor" strokeWidth="1.3" />
                  <circle cx="10" cy="10.7" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                </svg>
                Photo
              </div>
            </div>

            <p className="mt-1 font-mono text-[0.54rem] uppercase tracking-label text-inkMuted">Notes</p>
            <div className="flex flex-col gap-1.5">
              {NOTES.map((note) => (
                <div
                  key={note.title}
                  className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 ${
                    note.active ? 'border-accent/50 bg-accent/10' : 'border-hairline bg-card'
                  }`}
                >
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-md border border-hairline bg-canvas">
                    <svg viewBox="0 0 16 16" className="h-3 w-3 text-inkMuted" fill="none" aria-hidden="true">
                      <rect x="3.5" y="2.5" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
                      <path d="M5.8 5.6h4.4M5.8 8h4.4M5.8 10.4h2.6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className={`text-[0.72rem] font-medium leading-tight ${note.active ? 'text-inkStrong' : 'text-ink'}`}>
                      {note.title}
                    </p>
                    <p className="mt-0.5 text-[0.58rem] leading-tight text-inkMuted">{note.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right pane: the editor */}
          <div className="flex min-h-0 min-w-0 flex-col overflow-hidden border-l border-hairline pl-4 flex-[66_1_0%] md:pl-5">
            <div className="flex items-center justify-between">
              <span className="text-[0.86rem] font-semibold text-inkStrong">Ideas</span>
              <div className="flex rounded-md border border-hairline p-0.5 text-[0.58rem] font-medium">
                <span className={`rounded px-2 py-0.5 ${preview ? 'text-inkMuted' : 'bg-accent text-canvas'}`}>Edit</span>
                <span className={`rounded px-2 py-0.5 ${preview ? 'bg-accent text-canvas' : 'text-inkMuted'}`}>Preview</span>
              </div>
            </div>

            {!preview ? (
              <div className="mt-3 flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
                <div className="flex items-start gap-2">
                  <div className="sc-b1 flex-1 rounded-lg border border-hairline bg-card px-3 py-2 text-[0.78rem] leading-snug text-ink">
                    {beat === 0 ? <TypeOn text="Paint the hallway green?" /> : 'Paint the hallway green?'}
                  </div>
                  {beat >= 1 && (
                    <div className="sc-sticker flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-accentWarm/40 bg-accentWarm/15">
                      <StickerGlyph className="h-4 w-4" />
                    </div>
                  )}
                </div>
                {beat >= 1 && (
                  <>
                    <div className="sc-b2 rounded-lg border border-hairline bg-card px-3 py-2 text-[0.78rem] leading-snug text-ink">
                      Call the framers on Tuesday.
                    </div>
                    <div className="sc-b3 flex items-center gap-1.5 rounded-lg border border-dashed border-hairline px-3 py-1.5 text-[0.64rem] text-inkMuted">
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
                        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                      Add block
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="sc-in mt-3 flex flex-col gap-2.5">
                  <p className="text-[0.82rem] font-medium leading-snug text-ink">Paint the hallway green?</p>
                  <div className="flex items-center gap-2">
                    <StickerGlyph className="h-3.5 w-3.5 flex-none" />
                    <p className="text-[0.78rem] leading-snug text-ink">Call the framers on Tuesday.</p>
                  </div>
                </div>

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
              </>
            )}
          </div>
        </div>
      </div>
    </HeroFrame>
  )
}

const SC_CSS = `
.sc-play .sc-new{animation:scRise .5s cubic-bezier(.16,1,.3,1) both}
.sc-play .sc-b1{animation:scRise .45s cubic-bezier(.16,1,.3,1) both}
.sc-play .sc-sticker{animation:scPop .5s cubic-bezier(.16,1,.3,1) .28s both}
.sc-play .sc-b2{animation:scRise .45s cubic-bezier(.16,1,.3,1) .1s both}
.sc-play .sc-b3{animation:scFade .5s ease .28s both}
.sc-play .sc-in{animation:scRise .5s cubic-bezier(.16,1,.3,1) both}
.sc-play .sc-foot{animation:scRise .5s cubic-bezier(.16,1,.3,1) .1s both}
@keyframes scRise{from{opacity:0;transform:translateY(10px)}}
@keyframes scPop{from{opacity:0;transform:scale(0) rotate(-12deg)}}
@keyframes scFade{from{opacity:0}}
`
