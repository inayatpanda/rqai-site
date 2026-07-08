import type { RouteRecord } from 'vite-react-ssg'
import { Shell } from './components/Shell'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { AppPage } from './pages/AppPage'
import { NotFound } from './pages/NotFound'

export interface AppMeta {
  /** URL slug (exact, from the global constraints). */
  slug: string
  /** Product name, kept exactly as-is. */
  name: string
}

/*
 * The six RQAI apps, in menu order. `slug` drives the /:slug route and the
 * prerendered path; `name` is the display label. Product pages (later tasks)
 * pull richer copy from src/data/products.ts — this is the route-level index.
 */
export const APPS: AppMeta[] = [
  { slug: 'orthoportfolio', name: 'OrthoPortfolio' },
  { slug: 'consultantprep', name: 'OrthoConsultantPrep' },
  { slug: 'clinicalproms', name: 'ClinicalPROMs' },
  { slug: 'chapbook', name: 'Chapbook' },
  { slug: 'audioquill', name: 'AudioQuill' },
  { slug: 'scribble', name: 'Scribble' },
]

export const APP_SLUGS = APPS.map((a) => a.slug)

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
        getStaticPaths: () => APP_SLUGS,
      },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
