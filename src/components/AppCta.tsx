import { isLive, type Product } from '../data/products'

/*
 * AppCta — the single call-to-action for a project page.
 *
 * Live  (isLive(slug) === true): an external link "Open <name>" to the project's
 *   live URL, opening in a new tab (rel="noopener noreferrer"), styled as the
 *   primary accent button.
 * Not live: a non-interactive, on-brand "Coming to <host> soon" state — never a
 *   dead link. It flips to the live link with no code change the moment
 *   scripts/check-links.mjs finds the URL reachable (isLive reads liveness.json).
 *
 * All authored copy here is British and free of em-dashes.
 */

/** Hostname only (e.g. "topp.rqai.co.uk"), used in the coming-soon state. */
function hostOf(url: string): string {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

/* Arrow-up-right: signals an external link that leaves the site. */
function ExternalArrow() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M5.5 10.5 10.5 5.5M6 5.5h4.5V10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AppCta({ product, className = '' }: { product: Product; className?: string }) {
  const { name, slug, url } = product

  if (isLive(slug)) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-canvas shadow-lift transition-transform duration-300 ease-out-soft hover:-translate-y-0.5 ${className}`}
      >
        Open {name}
        <ExternalArrow />
      </a>
    )
  }

  return (
    <div
      role="status"
      className={`inline-flex max-w-full items-center gap-2.5 rounded-2xl border border-dashed border-hairline bg-card/50 px-5 py-3.5 text-sm text-inkMuted sm:text-base ${className}`}
    >
      <span
        aria-hidden="true"
        className="h-2 w-2 flex-none rounded-full bg-accentWarm shadow-[0_0_8px_#f4b05a]"
      />
      <span>
        Coming to <span className="font-medium text-ink">{hostOf(url)}</span> soon
      </span>
    </div>
  )
}
