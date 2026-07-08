/*
 * EcgTrace — the RQAI house motif.
 *
 * A hand-built SVG electrocardiogram trace (deliberately NOT a charting
 * library) used as the hero signature and as section punctuation. The line
 * draws itself in once on load, then a bright "live" head sweeps along it,
 * echoing a vital-signs monitor. All motion is CSS (transform/opacity/dash
 * only) and collapses to a static, fully-drawn line under prefers-reduced-motion
 * (see the .ecg-* rules in index.css).
 *
 * Contract: <EcgTrace tone?: 'teal' | 'ink'; className?: string />
 * Size it from the outside, e.g. <EcgTrace className="h-16 w-full" />.
 */

interface EcgTraceProps {
  /** Trace colour. Defaults to the surgical-teal accent. */
  tone?: 'teal' | 'ink'
  /** Sizing / positioning classes for the <svg> (width, height, etc.). */
  className?: string
}

const TONE = {
  teal: '#0b716c',
  ink: '#16212b',
} as const

// One PQRST heartbeat expressed as relative path commands, repeated across the
// viewBox. Baseline sits at y=56; the R spike peaks at y=16, the S trough at
// y=70. Each beat advances 160 user units in x and returns to the baseline.
const BASELINE_Y = 56
const BEAT =
  'l44,0 q10,-9 20,0 l14,0 l4,4 l8,-44 l8,54 l6,-14 l12,0 q14,-13 28,0 l16,0'
const PATH = `M0,${BASELINE_Y} ${BEAT} ${BEAT} ${BEAT}`

export function EcgTrace({ tone = 'teal', className = '' }: EcgTraceProps) {
  return (
    <svg
      viewBox="0 0 480 100"
      preserveAspectRatio="none"
      role="img"
      aria-label="ECG trace"
      className={`ecg-trace block w-full ${className}`}
      style={{ color: TONE[tone] }}
    >
      {/* The drawn baseline trace. */}
      <path className="ecg-base" d={PATH} pathLength={100} />
      {/* The bright sweeping head (hidden under reduced motion). */}
      <path className="ecg-beam" d={PATH} pathLength={100} />
    </svg>
  )
}
