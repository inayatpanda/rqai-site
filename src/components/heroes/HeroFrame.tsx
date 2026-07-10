import type { ReactNode } from 'react'
import { Constellation } from '../Constellation'

/*
 * HeroFrame: the device chrome (browser window or phone shell) that frames an
 * animated hero scene on a project page. The chrome is shared by every project
 * hero so the set reads as one system, only now the body holds a live product
 * simulation rather than a static screenshot.
 *
 * A decorative radial glow and a faint constellation sit behind, aria-hidden,
 * matching DemoStage. Scene bodies fill the frame body and paint their own
 * bg-canvas surface at a fixed height, so the layout never shifts as beats play.
 *
 * Contract: <HeroFrame frame='browser'|'phone' host? tone? className?>{scene}</HeroFrame>
 *   browser: a rounded window with three dots and a host pill; children fill the body.
 *   phone: a rounded shell with a notch; children fill an aspect-[9/16] screen.
 */
export function HeroFrame({
  frame,
  host,
  tone = 'accent',
  className = '',
  children,
}: {
  frame: 'browser' | 'phone'
  /** browser frame only: faux address shown in the window bar. */
  host?: string
  tone?: 'accent' | 'ink'
  className?: string
  children: ReactNode
}) {
  if (frame === 'phone') {
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
        <div className="relative w-[13rem] rounded-[2rem] border border-hairline bg-card p-1.5 shadow-lift">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[1.6rem] bg-canvas">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-2 z-10 h-1 w-12 -translate-x-1/2 rounded-full bg-inkStrong/25"
            />
            {children}
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
      <div className="relative w-full overflow-hidden rounded-2xl border border-hairline bg-card shadow-lift">
        <div className="flex items-center gap-2 border-b border-hairline bg-canvas/50 px-4 py-2.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-inkMuted/40" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-inkMuted/40" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-inkMuted/40" />
          {host && (
            <span className="ml-3 truncate rounded-md bg-inkStrong/10 px-2.5 py-0.5 font-mono text-[0.65rem] text-inkMuted">
              {host}
            </span>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}
