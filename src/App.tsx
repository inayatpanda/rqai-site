import type { RouteRecord } from 'vite-react-ssg'
import { Shell } from './components/Shell'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { AppPage } from './pages/AppPage'
import { NotFound } from './pages/NotFound'

export interface ProjectMeta {
  /** URL slug (exact, from the global constraints). */
  slug: string
  /** Product name, kept exactly as-is. */
  name: string
}

/*
 * The seven RQAI projects, in menu order. `slug` drives the /:slug route and
 * the prerendered path; `name` is the display label. Project pages (later
 * tasks) pull richer copy from src/data/products.ts — this is the route-level
 * index. Naming rule (hard): they are "projects", never "apps", in all UI copy.
 */
export const PROJECTS: ProjectMeta[] = [
  { slug: 'orthoportfolio', name: 'OrthoPortfolio' },
  { slug: 'consultantprep', name: 'OrthoConsultantPrep' },
  { slug: 'clinicalproms', name: 'ClinicalPROMs' },
  { slug: 'chapbook', name: 'Chapbook' },
  { slug: 'audioquill', name: 'AudioQuill' },
  { slug: 'scribble', name: 'Scribble' },
  { slug: 'researchassistant', name: 'ResearchAssistant' },
]

export const PROJECT_SLUGS = PROJECTS.map((p) => p.slug)

/*
 * Route table. The Shell layout wraps every page. `/:slug` is a dynamic route;
 * getStaticPaths tells vite-react-ssg which slugs to prerender to real HTML.
 * `/404` is prerendered for Apache's ErrorDocument; `*` is the client fallback.
 */
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Shell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      {
        path: ':slug',
        element: <AppPage />,
        getStaticPaths: () => PROJECT_SLUGS,
      },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
