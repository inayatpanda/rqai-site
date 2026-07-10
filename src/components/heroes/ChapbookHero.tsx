import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { HeroFrame } from './HeroFrame'

/*
 * ChapbookHero: an animated project-page hero laid out as a landscape two-pane.
 * On the left a blog post is written the way you text, a line and then a photo,
 * published with one tap. On the right a post preview builds as the chat
 * progresses and, on the final beat, goes live on a blog you own. The final beat
 * is that live confirmation, so with reduced motion (and in the prerendered HTML)
 * the whole frame shows statically with no timers. Beats advance on setTimeout
 * and loop.
 *
 * Illustrative mock content.
 */

const BEATS = 4
const LAST = BEATS - 1
const DURATIONS = [2400, 2500, 2300, 2200] // ms per beat; final beat is the hold

function PhotoGlyph({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 44 30" className={className} fill="none" aria-hidden="true">
      <circle cx="32" cy="9" r="3.5" fill="#45d5f2" opacity="0.75" />
      <path d="M3 26 15 13l7 8 6-6 13 11z" fill="#45d5f2" opacity="0.3" />
      <path d="M3 26 15 13l7 8 6-6 13 11" stroke="#45d5f2" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function ChapbookHero() {
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
    <HeroFrame frame="browser" host="chapbook.rqai.co.uk" tone="accent">
      <div
        aria-hidden="true"
        className={`cb-root relative h-[19rem] overflow-hidden bg-canvas p-4 md:h-[21rem] md:p-5 ${reduce ? '' : 'cb-play'}`}
      >
        <style>{CB_CSS}</style>

        <div key={cycle} className="flex h-full min-h-0 gap-4 md:gap-5">
          {/* Left pane: compose the post like a chat */}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-inkStrong">New post</span>
              <span className="font-mono text-[0.58rem] uppercase tracking-label text-accent">Chapbook</span>
            </div>

            <div className="mt-3 flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
              <div className="cb-b1 ml-auto max-w-[88%] rounded-2xl rounded-tr-sm border border-accent/40 bg-accent/10 px-3 py-2 text-[0.72rem] leading-snug text-ink">
                The towpath at dawn. Mist over the water, a kingfisher, the city still asleep.
              </div>
              {beat >= 1 && (
                <>
                  <div className="cb-b2 ml-auto max-w-[88%] rounded-2xl rounded-tr-sm border border-accent/40 bg-accent/10 px-3 py-2 text-[0.72rem] leading-snug text-ink">
                    add this morning&apos;s photo
                  </div>
                  <div className="cb-photo ml-auto flex h-12 w-[58%] items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
                    <PhotoGlyph className="h-7 w-11" />
                  </div>
                </>
              )}
            </div>

            {beat >= 2 && (
              <div className="mt-2 flex shrink-0 items-center gap-2 pt-1">
                <span className="cb-pill w-max rounded-full bg-accent px-4 py-1.5 text-[0.72rem] font-semibold text-canvas">
                  Publish
                </span>
                <span className="cb-prog font-mono text-[0.6rem] text-inkMuted">Committing to your repository...</span>
              </div>
            )}
          </div>

          {/* Right pane: the post preview builds as the chat progresses */}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center gap-3 overflow-hidden border-l border-hairline pl-4 md:pl-5">
            <div className="cb-card rounded-xl border border-hairline bg-card p-3">
              <p className="font-display text-[0.95rem] font-semibold leading-tight text-inkStrong">
                The towpath at dawn
              </p>
              <p className="mt-2 text-[0.72rem] leading-snug text-inkMuted">Mist over the water, a kingfisher, and</p>
              <p className="text-[0.72rem] leading-snug text-inkMuted">the city still asleep.</p>
              {beat >= 1 && (
                <div className="cb-photo2 mt-2.5 flex h-16 w-full items-center justify-center rounded-lg border border-hairline bg-canvas">
                  <PhotoGlyph className="h-9 w-14" />
                </div>
              )}
            </div>

            {beat >= 3 && (
              <div className="cb-live flex items-start gap-2 rounded-xl border border-accent/30 bg-accent/10 px-3 py-2.5">
                <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 flex-none" fill="none" aria-hidden="true">
                  <path d="M3 8.5 6.3 12 13 5" stroke="#45d5f2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-[0.76rem] font-semibold text-accent">Live on your own blog</p>
                  <p className="mt-0.5 text-[0.64rem] leading-snug text-inkMuted">
                    Your domain. Your repository. Your words.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </HeroFrame>
  )
}

const CB_CSS = `
.cb-play .cb-b1{animation:cbBubble .5s cubic-bezier(.16,1,.3,1) both}
.cb-play .cb-b2{animation:cbBubble .5s cubic-bezier(.16,1,.3,1) both}
.cb-play .cb-photo{animation:cbBubble .5s cubic-bezier(.16,1,.3,1) .1s both}
.cb-play .cb-pill{animation:cbPulse 1.1s ease .1s 2 both}
.cb-play .cb-prog{animation:cbFade .5s ease .5s both}
.cb-play .cb-card{animation:cbRise .5s cubic-bezier(.16,1,.3,1) both}
.cb-play .cb-photo2{animation:cbRise .5s cubic-bezier(.16,1,.3,1) .1s both}
.cb-play .cb-live{animation:cbRise .5s cubic-bezier(.16,1,.3,1) .12s both}
@keyframes cbBubble{from{opacity:0;transform:translateY(10px) scale(.96)}}
@keyframes cbRise{from{opacity:0;transform:translateY(12px)}}
@keyframes cbFade{from{opacity:0}}
@keyframes cbPulse{0%,100%{transform:scale(1)}45%{transform:scale(1.06)}}
`
