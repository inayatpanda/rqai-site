import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { APPS, APP_SLUGS } from '../App'

const CONTACT_EMAIL = 'hello@rqai.co.uk'

/* RQAI wordmark (never expanded) with a small static ECG blip mark. */
function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="RQAI home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-inkStrong text-teal shadow-soft transition-transform duration-300 ease-out-soft group-hover:-translate-y-0.5">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M2 13 H7 L9 8 L12 18 L14 13 H22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-xl font-semibold leading-none tracking-tight text-inkStrong">
        RQAI
      </span>
    </Link>
  )
}

/* Desktop "Apps" dropdown listing the six app pages. */
function AppsMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors hover:text-teal ${
          active || open ? 'text-teal' : 'text-ink'
        }`}
      >
        Apps
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-[calc(100%+0.5rem)] w-60 overflow-hidden rounded-2xl border border-hairline bg-card p-1.5 shadow-lift"
          >
            {APPS.map((app) => (
              <NavLink
                key={app.slug}
                to={`/${app.slug}`}
                role="menuitem"
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    isActive ? 'bg-paper text-teal' : 'text-ink hover:bg-paper hover:text-teal'
                  }`
                }
              >
                {app.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Header() {
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const onApp = APP_SLUGS.some((s) => pathname === `/${s}`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled || open
          ? 'border-b border-hairline bg-paper/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="container-edge flex h-16 items-center justify-between">
        <Wordmark />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <AppsMenu active={onApp} />
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `rounded-full px-3.5 py-2 text-sm transition-colors hover:text-teal ${
                isActive ? 'text-teal' : 'text-ink'
              }`
            }
          >
            About
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="grid h-11 w-11 place-items-center rounded-full border border-hairline bg-card md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-0.5 w-4 rounded-full bg-inkStrong transition-transform duration-300 ${
                open ? 'translate-y-[5px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-4 rounded-full bg-inkStrong transition-transform duration-300 ${
                open ? '-translate-y-[5px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-hairline bg-paper md:hidden"
          >
            <nav className="container-edge flex flex-col gap-1 py-4" aria-label="Mobile">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3 text-base transition-colors hover:bg-card hover:text-teal ${
                    isActive ? 'text-teal' : 'text-ink'
                  }`
                }
              >
                About
              </NavLink>
              <p className="mt-2 px-3 pb-1 font-mono text-[0.7rem] uppercase tracking-label text-inkMuted">
                Apps
              </p>
              {APPS.map((app) => (
                <NavLink
                  key={app.slug}
                  to={`/${app.slug}`}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-3 text-base transition-colors hover:bg-card hover:text-teal ${
                      isActive ? 'text-teal' : 'text-ink'
                    }`
                  }
                >
                  {app.name}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 border-t border-hairline bg-card">
      <div className="container-edge grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr]">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-4 text-sm leading-relaxed text-ink">
            A small independent UK studio building focused, local-first software.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 inline-block text-sm text-teal transition-colors hover:text-inkStrong"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div>
          <h2 className="font-mono text-[0.7rem] uppercase tracking-label text-inkMuted">Apps</h2>
          <ul className="mt-4 space-y-2.5">
            {APPS.map((app) => (
              <li key={app.slug}>
                <Link
                  to={`/${app.slug}`}
                  className="text-sm text-ink transition-colors hover:text-teal"
                >
                  {app.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-[0.7rem] uppercase tracking-label text-inkMuted">Studio</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link to="/" className="text-sm text-ink transition-colors hover:text-teal">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm text-ink transition-colors hover:text-teal">
                About
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-ink transition-colors hover:text-teal"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-edge flex flex-col items-start justify-between gap-2 py-6 text-xs text-inkMuted sm:flex-row sm:items-center">
          <p>&copy; {year} RQAI</p>
          <p className="font-mono">Local-first &middot; no accounts &middot; no tracking</p>
        </div>
      </div>
    </footer>
  )
}

/*
 * Shell — the global layout wrapping every route: sticky header (wordmark,
 * Apps menu, About), the page outlet, and the footer. Rendered once at the
 * root of the route table so every page shares the same chrome.
 */
export function Shell() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only rounded-lg bg-inkStrong px-4 py-2 text-card focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
