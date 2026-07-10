import type { ReactNode } from 'react'
import { Constellation } from '../Constellation'

/*
 * HeroFrame: the browser-window chrome that frames an animated hero scene on a
 * project page. The chrome is shared by every project hero so the set reads as
 * one system, only now the body holds a live product simulation rather than a
 * static screenshot.
 *
 * A decorative radial glow and a faint constellation sit behind, aria-hidden,
 * matching DemoStage. Scene bodies fill the frame body and paint their own
 * bg-canvas surface at a fixed height, so the layout never shifts as beats play.
 *
 * Contract: <HeroFrame frame='browser' host? tone? className?>{scene}</HeroFrame>
 *   browser: a rounded window with three dots and a host pill; children fill the body.
 */
export function HeroFrame({
  host,
  tone = 'accent',
  className = '',
  children,
}: {
  /** kept for call-site symmetry; only the browser window is rendered. */
  frame?: 'browser'
  /** faux address shown in the window bar. */
  host?: string
  tone?: 'accent' | 'ink'
  className?: string
  children: ReactNode
}) {
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
