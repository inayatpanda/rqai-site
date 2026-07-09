import { WorkflowReel } from './WorkflowReel'

/*
 * ResearchAssistantShowcase — the flagship band on /researchassistant.
 * Reuses the product's own assets rather than re-inventing them: the
 * "Watch it work" reel ported from researchassistant.rqai.co.uk, and two of
 * its self-contained walkthrough tours (single-file HTML, no external
 * requests) served from /walkthroughs/. The reel was designed on a light
 * canvas, so it sits in a light panel inside the dark page.
 */
const TOURS = [
  {
    href: '/walkthroughs/systematic-review.html',
    title: 'A systematic review, from scratch',
    blurb: 'PICO to search to screening to synthesis to write-up, in one guided tour.',
  },
  {
    href: '/walkthroughs/meta-analysis.html',
    title: 'Meta-analysis walkthrough',
    blurb: 'Pooled effects, heterogeneity, sensitivity and GRADE, with a real worked example.',
  },
]

export function ResearchAssistantShowcase() {
  return (
    <div>
      <h2 className="reveal text-2xl leading-tight md:text-3xl">Watch it work</h2>
      <p className="reveal mt-3 max-w-[52ch] leading-relaxed text-ink">
        The same animated workflow shown on researchassistant.rqai.co.uk:
        highlight, compile, analyse and write, step by step.
      </p>
      <div className="reveal mt-8 overflow-hidden rounded-2xl border border-hairline bg-[#f8fafc] p-4 md:p-6">
        <WorkflowReel />
      </div>

      <h3 className="reveal mt-12 text-xl leading-tight md:text-2xl">
        Sixty-second tours
      </h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {TOURS.map((tour) => (
          <a
            key={tour.href}
            href={tour.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group reveal flex h-full flex-col rounded-2xl border border-hairline bg-card p-6 transition-colors duration-300 ease-out-soft hover:border-accent/50"
          >
            <h4 className="font-display text-lg font-semibold text-inkStrong">
              {tour.title}
            </h4>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-inkMuted">{tour.blurb}</p>
            <span className="mt-4 text-sm font-medium text-ink transition-colors duration-300 group-hover:text-accent">
              Open the tour
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
