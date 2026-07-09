import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { PROJECTS, PROJECT_SLUGS } from '../App'

const CONTACT_EMAIL = 'hello@rqai.co.uk'

/* RQAI wordmark (never expanded) with a small static constellation mark. */
function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="RQAI home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="grid h-8 w-8 place-items-center rounded-[9px] border border-hairline bg-card text-accent shadow-soft transition-transform duration-300 ease-out-soft group-hover:-translate-y-0.5">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5.5 17.5 12 6.5l7 6.5-5.5 5.5z M12 6.5l1.5 12"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />
          <circle cx="5.5" cy="17.5" r="1.7" fill="currentColor" />
          <circle cx="12" cy="6.5" r="2.1" fill="currentColor" />
          <circle cx="19" cy="13" r="1.7" fill="currentColor" />
          <circle cx="13.5" cy="18.5" r="1.5" fill="currentColor" />
        </svg>
      </span>
      <span className="font-display text-xl font-semibold leading-none tracking-tight text-inkStrong">
        RQAI
      </span>
    </Link>
  )
}

/* Desktop "Projects" dropdown listing the seven project pages. */
function ProjectsMenu({ active }: { active: boolean }) {
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
        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors hover:text-accent ${
          active || open ? 'text-accent' : 'text-ink'
        }`}
      >
        Projects
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
            {PROJECTS.map((project) => (
              <NavLink
                key={project.slug}
                to={`/${project.slug}`}
                role="menuitem"
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    isActive ? 'bg-canvas text-accent' : 'text-ink hover:bg-canvas hover:text-accent'
                  }`
                }
              >
                {project.name}
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

  const onProject = PROJECT_SLUGS.some((s) => pathname === `/${s}`)

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
          ? 'border-b border-hairline bg-canvas/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="container-edge flex h-16 items-center justify-between">
        <Wordmark />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <ProjectsMenu active={onProject} />
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `rounded-full px-3.5 py-2 text-sm transition-colors hover:text-accent ${
                isActive ? 'text-accent' : 'text-ink'
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
            className="overflow-hidden border-t border-hairline bg-canvas md:hidden"
          >
            <nav className="container-edge flex flex-col gap-1 py-4" aria-label="Mobile">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3 text-base transition-colors hover:bg-card hover:text-accent ${
                    isActive ? 'text-accent' : 'text-ink'
                  }`
                }
              >
                About
              </NavLink>
              <p className="mt-2 px-3 pb-1 font-mono text-[0.7rem] uppercase tracking-label text-inkMuted">
                Projects
              </p>
              {PROJECTS.map((project) => (
                <NavLink
                  key={project.slug}
                  to={`/${project.slug}`}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-3 text-base transition-colors hover:bg-card hover:text-accent ${
                      isActive ? 'text-accent' : 'text-ink'
                    }`
                  }
                >
                  {project.name}
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
            Focused, local-first software for clinicians, researchers and writers.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-4 inline-block text-sm text-accent transition-colors hover:text-inkStrong"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <div>
          <h2 className="font-mono text-[0.7rem] uppercase tracking-label text-inkMuted">
            Projects
          </h2>
          <ul className="mt-4 space-y-2.5">
            {PROJECTS.map((project) => (
              <li key={project.slug}>
                <Link
                  to={`/${project.slug}`}
                  className="text-sm text-ink transition-colors hover:text-accent"
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-[0.7rem] uppercase tracking-label text-inkMuted">Site</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link to="/" className="text-sm text-ink transition-colors hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm text-ink transition-colors hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-ink transition-colors hover:text-accent"
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
 * Projects menu, About), the page outlet, and the footer. Rendered once at the
 * root of the route table so every page shares the same chrome.
 */
export function Shell() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only rounded-lg bg-inkStrong px-4 py-2 text-canvas focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
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
