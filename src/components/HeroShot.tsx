import { Constellation } from './Constellation'

/*
 * HeroShot — a real product screenshot framed as the centrepiece of a project
 * page, replacing the abstract micro-demo on projects that have a shot.
 *
 * Two frames: a browser window (landscape app screens) and a phone (things used
 * on a phone: the patient questionnaire, the Scribble notebook). The screenshot
 * is a static asset in /public/screens; object-cover plus a per-image
 * objectPosition crops it to the interesting region without a build step, so a
 * tall or wide capture still sits cleanly in a fixed frame. Decorative glow and
 * constellation sit behind, aria-hidden, matching DemoStage so the page reads as
 * one system. A framed screenshot may be light inside the dark page; that reads
 * as a screenshot, not a section, so the page theme stays locked.
 */
export type HeroImage = {
  src: string
  alt: string
  frame: 'browser' | 'phone'
  /** object-position for the framed screenshot, e.g. 'top', 'center 80%'. */
  position?: string
  /** browser frame only: image aspect ratio, default '16/10'. */
  aspect?: string
  /** browser frame only: faux address shown in the window bar. */
  host?: string
}

export function HeroShot({
  image,
  tone,
  className = '',
}: {
  image: HeroImage
  tone: 'accent' | 'ink'
  className?: string
}) {
  const objectPosition = image.position ?? 'top'

  if (image.frame === 'phone') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_58%_at_50%_44%,rgba(69,213,242,0.12),transparent_70%)]"
        />
        <Constellation
          tone={tone}
          className="pointer-events-none absolute bottom-2 left-1/2 h-20 w-[120%] -translate-x-1/2 opacity-[0.10]"
        />
        <div className="relative w-[13rem] rounded-[2rem] border border-hairline bg-card p-1.5 shadow-lift sm:w-[14.5rem]">
          <div className="relative overflow-hidden rounded-[1.6rem]">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-2 z-10 h-1 w-12 -translate-x-1/2 rounded-full bg-inkStrong/25"
            />
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="block aspect-[9/17] w-full object-cover"
              style={{ objectPosition }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(69,213,242,0.10),transparent_70%)]"
      />
      <Constellation
        tone={tone}
        className="pointer-events-none absolute -bottom-6 left-1/2 h-24 w-[130%] -translate-x-1/2 opacity-[0.10]"
      />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-hairline bg-card shadow-lift">
        <div className="flex items-center gap-2 border-b border-hairline bg-canvas/50 px-4 py-2.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-inkMuted/40" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-inkMuted/40" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-inkMuted/40" />
          {image.host && (
            <span className="ml-3 truncate rounded-md bg-inkStrong/10 px-2.5 py-0.5 font-mono text-[0.65rem] text-inkMuted">
              {image.host}
            </span>
          )}
        </div>
        <div className="relative overflow-hidden">
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className="block w-full object-cover"
            style={{ aspectRatio: image.aspect ?? '16 / 10', objectPosition }}
          />
        </div>
      </div>
    </div>
  )
}
