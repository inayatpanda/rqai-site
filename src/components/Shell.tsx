import { projectPath } from '../data/projectPaths'
import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MAIN_PROJECTS, ORTHOPAEDIC_PROJECTS, LEGAL_LINKS } from '../data/navigation'
import { RQAI_IDENTITY } from '../data/identity'

const CONTACT_EMAIL = RQAI_IDENTITY.email

/* Restores scroll to the top whenever the route changes (SPA navigation
   keeps the previous scroll position otherwise). */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null
      if (target) target.scrollIntoView()
      else window.scrollTo(0, 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
  return null
}

/* RQAI wordmark with the shared tile mark. */
function Wordmark() {
  return <Link to="/" className="rqai-wordmark" aria-label="RQAI home">
    <img src="/brand/rqai-mark.svg" width="56" height="44" alt="" />
    <span className="font-display text-2xl font-semibold tracking-tight text-inkStrong">RQAI</span>
  </Link>
}

/* Desktop "Projects" dropdown listing the project pages. */
function ProjectsMenu({ active, label, projects }: { active: boolean; label: string; projects: { slug: string; name: string }[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const panelId = useId()
  const { pathname } = useLocation()
  const reduce = useReducedMotion()
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); trigger.current?.focus() }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false) }}>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors hover:text-accent ${
          active || open ? 'text-accent' : 'text-ink'
        }`}
      >
        {label}
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
            id={panelId}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-[calc(100%+0.5rem)] w-72 max-h-[70dvh] overflow-y-auto rounded-2xl border border-hairline bg-card p-1.5 shadow-lift"
          >
            {projects.map((project) => (
              <NavLink
                key={project.slug}
                to={projectPath(project.slug)}
                onClick={() => setOpen(false)}
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

  const onProject = MAIN_PROJECTS.some(project => pathname.replace(/\/$/, '') === projectPath(project.slug))
  const onOrthopaedics = pathname.replace(/\/$/, '') === '/orthopaedics' || ORTHOPAEDIC_PROJECTS.some(project => pathname.replace(/\/$/, '') === projectPath(project.slug))

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
          <ProjectsMenu active={onProject} label="Projects" projects={MAIN_PROJECTS} />
          <ProjectsMenu active={onOrthopaedics} label="Orthopaedics" projects={[{ slug: 'orthopaedics', name: 'Orthopaedic tools' }, ...ORTHOPAEDIC_PROJECTS]} />
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

      {/* The international project rail keeps the orthopaedic projects grouped
          in the Orthopaedics menu above. */}
      <div className="hidden border-b border-hairline lg:block">
        <nav
          aria-label="Featured projects"
          className="no-scrollbar container-edge flex h-14 items-center gap-x-7 overflow-x-auto text-[1.0625rem] leading-none"
        >
          {MAIN_PROJECTS.map((project) => (
            <NavLink
              key={project.slug}
              to={projectPath(project.slug)}
              className={({ isActive }) =>
                `whitespace-nowrap transition-colors hover:text-accent ${
                  isActive ? 'text-accent' : 'text-inkMuted'
                }`
              }
            >
              {project.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-y-auto max-h-[75dvh] border-t border-hairline bg-canvas md:hidden"
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
              {MAIN_PROJECTS.map((project) => (
                <NavLink
                  key={project.slug}
                  to={projectPath(project.slug)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-3 text-base transition-colors hover:bg-card hover:text-accent ${
                      isActive ? 'text-accent' : 'text-ink'
                    }`
                  }
                >
                  {project.name}
                </NavLink>
              ))}
              <details key={pathname} className="orthopaedics-mobile mt-3 border-t border-hairline pt-2">
                <summary className="cursor-pointer rounded-xl px-3 py-3 text-base text-inkStrong">Orthopaedics</summary>
                <div className="flex flex-col border-l border-hairline ml-3 pl-2">
                  <Link to="/orthopaedics" className="rounded-xl px-3 py-3 text-sm text-accent">All orthopaedic tools</Link>
                  {ORTHOPAEDIC_PROJECTS.map(project => <NavLink key={project.slug} to={projectPath(project.slug)} className="rounded-xl px-3 py-3 text-sm text-ink hover:text-accent">{project.name}</NavLink>)}
                </div>
              </details>
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
            {RQAI_IDENTITY.brandLine}
          </p>
          <p className="mt-3 text-sm text-inkMuted">{RQAI_IDENTITY.founder} — Founder, RQAI.</p>
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
            {MAIN_PROJECTS.map((project) => (
              <li key={project.slug}>
                <Link
                  to={projectPath(project.slug)}
                  className="text-sm text-ink transition-colors hover:text-accent"
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-7 font-mono text-[0.7rem] uppercase tracking-label text-inkMuted"><Link to="/orthopaedics" className="hover:text-accent">Orthopaedics</Link></h2>
          <ul className="mt-4 space-y-2.5">
            {ORTHOPAEDIC_PROJECTS.map(project => <li key={project.slug}><Link to={projectPath(project.slug)} className="text-sm text-ink transition-colors hover:text-accent">{project.name}</Link></li>)}
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
          <h2 className="mt-7 font-mono text-[0.7rem] uppercase tracking-label text-inkMuted">Legal</h2>
          <ul className="mt-4 space-y-2.5">
            {LEGAL_LINKS.map(page => <li key={page.slug}><Link to={`/${page.slug}`} className="text-sm text-ink transition-colors hover:text-accent">{page.name}</Link></li>)}
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="container-edge flex flex-col items-start justify-between gap-2 py-6 text-xs text-inkMuted sm:flex-row sm:items-center">
          <p>&copy; {year} {RQAI_IDENTITY.founder}, trading as RQAI.</p>
          <Link to="/legal" className="hover:text-accent">Business &amp; legal information</Link>
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
      <ScrollToTop />
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
