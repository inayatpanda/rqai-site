/*
 * Constellation — the RQAI house motif.
 *
 * A hand-built SVG knowledge-graph constellation (deliberately NOT a graph or
 * charting library) used as the hero signature and as section punctuation:
 * points of light joined by fine citation-like edges that draw in
 * progressively, left to right — ideas linking into insight. Each node lights
 * up as the first edge reaches it; hub nodes glow softly and breathe once the
 * graph is complete. All motion is CSS (dash/opacity/transform only) and
 * collapses to the completed static constellation under prefers-reduced-motion
 * (see the .cst-* rules in index.css).
 *
 * Contract: <Constellation tone?: 'accent' | 'ink'; className?: string />
 * Size it from the outside, e.g. <Constellation className="h-20 w-full" />.
 */

interface ConstellationProps {
  /** Motif colour. Defaults to the electric-cyan accent. */
  tone?: 'accent' | 'ink'
  /** Sizing / positioning classes for the <svg> (width, height, etc.). */
  className?: string
}

const TONE = {
  accent: '#45d5f2',
  ink: '#eef2ff',
} as const

interface Node {
  x: number
  y: number
  r: number
  /** Hubs are the brighter "insight" points: larger, glowing, breathing. */
  hub?: boolean
}

// Hand-placed for an organic scatter across a 720x120 viewBox (kept circular
// via the default xMidYMid meet — never stretched).
const NODES: Node[] = [
  { x: 18, y: 84, r: 2.4 },
  { x: 74, y: 38, r: 3.8, hub: true },
  { x: 132, y: 92, r: 2.4 },
  { x: 172, y: 20, r: 2.6 },
  { x: 228, y: 62, r: 4.2, hub: true },
  { x: 282, y: 100, r: 2.2 },
  { x: 312, y: 30, r: 2.8 },
  { x: 372, y: 74, r: 3.8, hub: true },
  { x: 420, y: 16, r: 2.4 },
  { x: 468, y: 52, r: 3.0 },
  { x: 522, y: 96, r: 2.4 },
  { x: 556, y: 34, r: 4.0, hub: true },
  { x: 614, y: 78, r: 2.6 },
  { x: 654, y: 22, r: 2.4 },
  { x: 702, y: 58, r: 3.4, hub: true },
]

// Citation-like web, ordered left to right so the graph grows progressively.
const EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 3],
  [1, 2],
  [3, 4],
  [2, 4],
  [4, 6],
  [4, 5],
  [6, 7],
  [5, 7],
  [7, 8],
  [7, 9],
  [9, 10],
  [9, 11],
  [8, 11],
  [10, 11],
  [11, 13],
  [11, 12],
  [12, 14],
  [13, 14],
]

const EDGE_STAGGER = 0.13 // seconds between edge draw starts
const NODE_LAG = 0.3 // node lights up as its first edge arrives
const BREATHE_LAG = 3.2 // hubs start breathing after the graph completes

// First edge touching each node: the moment it joins the graph.
const FIRST_TOUCH = NODES.map((_, n) =>
  Math.max(
    EDGES.findIndex(([a, b]) => a === n || b === n),
    0,
  ),
)

export function Constellation({ tone = 'accent', className = '' }: ConstellationProps) {
  return (
    <svg
      viewBox="0 0 720 120"
      role="img"
      aria-label="Knowledge-graph constellation"
      className={`block w-full ${className}`}
      style={{ color: TONE[tone] }}
    >
      {EDGES.map(([a, b], i) => (
        <path
          key={`e${a}-${b}`}
          className="cst-edge"
          d={`M${NODES[a].x},${NODES[a].y} L${NODES[b].x},${NODES[b].y}`}
          pathLength={100}
          style={{ animationDelay: `${(i * EDGE_STAGGER).toFixed(2)}s` }}
        />
      ))}
      {NODES.map((n, i) => {
        const delay = FIRST_TOUCH[i] * EDGE_STAGGER + NODE_LAG
        return (
          <circle
            key={`n${i}`}
            className={n.hub ? 'cst-node cst-hub' : 'cst-node'}
            cx={n.x}
            cy={n.y}
            r={n.r}
            // Hubs run two animations (light-up, then breathe): two delays.
            style={{
              animationDelay: n.hub
                ? `${delay.toFixed(2)}s, ${(delay + BREATHE_LAG).toFixed(2)}s`
                : `${delay.toFixed(2)}s`,
            }}
          />
        )
      })}
    </svg>
  )
}
