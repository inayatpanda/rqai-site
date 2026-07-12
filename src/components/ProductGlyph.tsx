import type { Slug } from '../data/products'

const stroke = { vectorEffect: 'non-scaling-stroke' as const }

function ResearchGlyph() {
  return <>
    <path className="glyph-secondary glyph-draw" pathLength="1" d="M7 13 20 8l12 11 10-8" style={stroke} />
    <circle className="glyph-highlight glyph-pop" cx="7" cy="13" r="3" />
    <circle className="glyph-highlight glyph-pop" cx="20" cy="8" r="3" />
    <circle className="glyph-highlight glyph-pop" cx="32" cy="19" r="3" />
    <path className="glyph-primary glyph-shift" d="M38 26h19v14H35V29c0-1.7 1.3-3 3-3Z" style={stroke} />
    <path className="glyph-secondary glyph-draw" pathLength="1" d="M40 31h12m-12 4h8" style={stroke} />
    <rect className="glyph-highlight glyph-pop" x="52" y="34" width="7" height="7" rx="2" />
  </>
}

function PromsGlyph() {
  return <>
    <path className="glyph-primary" d="M7 39V8m0 31h51" style={stroke} />
    <path className="glyph-warm glyph-draw" pathLength="1" d="M7 23h51" strokeDasharray="3 3" style={stroke} />
    <path className="glyph-secondary glyph-draw" pathLength="1" d="m10 35 12-4 11-9 11-6 12-6" style={stroke} />
    {[['10','35'],['22','31'],['33','22'],['44','16'],['56','10']].map(([cx,cy]) => <circle key={cx} className="glyph-highlight glyph-pop" cx={cx} cy={cy} r="2.7" />)}
    <path className="glyph-warm" d="M45 19h11" style={stroke} />
  </>
}

function ChapbookGlyph() {
  return <>
    <rect className="glyph-primary glyph-shift" x="4" y="7" width="22" height="9" rx="4.5" />
    <rect className="glyph-primary glyph-shift" x="9" y="20" width="20" height="8" rx="4" />
    <path className="glyph-secondary glyph-draw" pathLength="1" d="M31 18h7m-3-3 3 3-3 3" style={stroke} />
    <path className="glyph-primary" d="M41 7h17v34H37V11c0-2.2 1.8-4 4-4Z" style={stroke} />
    <path className="glyph-warm glyph-draw" pathLength="1" d="M42 15h11m-11 6h11m-11 6h8" style={stroke} />
    <circle className="glyph-warm-fill glyph-pop" cx="52" cy="35" r="3" />
  </>
}

function PortfolioGlyph() {
  return <>
    <rect className="glyph-primary glyph-shift" x="6" y="13" width="26" height="29" rx="3" transform="rotate(-8 19 27.5)" />
    <rect className="glyph-secondary glyph-shift" x="17" y="9" width="27" height="31" rx="3" transform="rotate(4 30.5 24.5)" />
    <path className="glyph-primary" d="M31 13h27v29H31z" style={stroke} />
    <path className="glyph-secondary glyph-draw" pathLength="1" d="M37 21h15m-15 6h15m-15 6h10" style={stroke} />
    <path className="glyph-warm glyph-draw" pathLength="1" d="m46 36 4 4 8-10" style={stroke} />
  </>
}

function PrepGlyph() {
  return <>
    <circle className="glyph-primary" cx="20" cy="24" r="14" />
    <path className="glyph-secondary glyph-draw" pathLength="1" d="M20 12v12l8 5" style={stroke} />
    <circle className="glyph-highlight glyph-pop" cx="20" cy="24" r="3" />
    <path className="glyph-primary glyph-shift" d="M39 10h20v25H39z" style={stroke} />
    <path className="glyph-secondary glyph-draw" pathLength="1" d="M44 17h10m-10 6h10m-10 6h7" style={stroke} />
    <path className="glyph-warm glyph-draw" pathLength="1" d="m46 39 4 3 8-9" style={stroke} />
  </>
}

function QuillGlyph() {
  return <>
    <g className="glyph-bars">
      {[8,17,11,25,15,30,19,12].map((h,i) => <rect key={i} className="glyph-highlight" x={5+i*4} y={24-h/2} width="2.4" height={h} rx="1.2" style={{ '--bar': i } as React.CSSProperties} />)}
    </g>
    <path className="glyph-secondary glyph-draw" pathLength="1" d="M38 12h21m-21 8h16m-16 8h21m-21 8h13" style={stroke} />
    <path className="glyph-primary glyph-shift" d="M34 7v34" style={stroke} />
  </>
}

function ScribbleGlyph() {
  return <>
    <rect className="glyph-primary glyph-shift" x="5" y="7" width="24" height="11" rx="3" />
    <rect className="glyph-secondary glyph-shift" x="5" y="22" width="34" height="9" rx="3" />
    <rect className="glyph-primary glyph-shift" x="5" y="35" width="20" height="8" rx="3" />
    <path className="glyph-secondary glyph-draw" pathLength="1" d="M43 13h15v28H34" style={stroke} />
    <path className="glyph-warm glyph-draw" pathLength="1" d="m47 29 4 4 7-9" style={stroke} />
    <circle className="glyph-warm-fill glyph-pop" cx="50" cy="10" r="4" />
  </>
}

export function ProductGlyph({ slug, className = '' }: { slug: Slug; className?: string }) {
  const content = (() => {
    switch (slug) {
      case 'researchassistant': return <ResearchGlyph />
      case 'clinicalproms': return <PromsGlyph />
      case 'chapbook': return <ChapbookGlyph />
      case 'orthoportfolio': return <PortfolioGlyph />
      case 'consultantprep': return <PrepGlyph />
      case 'audioquill': return <QuillGlyph />
      case 'scribble': return <ScribbleGlyph />
    }
  })()

  return (
    <svg viewBox="0 0 64 48" aria-hidden="true" focusable="false" className={`product-glyph ${className}`}>
      {content}
    </svg>
  )
}
