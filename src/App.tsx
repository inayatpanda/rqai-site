import type { RouteRecord } from 'vite-react-ssg'
import { Shell } from './components/Shell'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { AppPage } from './pages/AppPage'
import { Orthopaedics } from './pages/Orthopaedics'
import { LegalPage } from './pages/LegalPage'
import { LEGAL_LINKS } from './data/navigation'
import { NotFound } from './pages/NotFound'
import { PRODUCTS } from './data/products'
import { SHARED_APP_ROOTS } from './data/projectPaths'

export interface ProjectMeta {
  /** URL slug (exact, from the global constraints). */
  slug: string
  /** Product name, kept exactly as-is. */
  name: string
}

/*
 * The route-level project index, derived from the single source of truth in
 * src/data/products.ts (no duplicate list). `slug` drives the /:slug route and
 * the prerendered path; `name` is the display label. Project pages pull the
 * richer copy (tagline, description, features, price, demo) from PRODUCTS
 * directly. Naming rule (hard): they are "projects", never "apps", in all copy.
 */
export const PROJECTS: ProjectMeta[] = PRODUCTS.map(({ slug, name }) => ({ slug, name }))

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
      { path: 'orthopaedics', element: <Orthopaedics /> },
      ...LEGAL_LINKS.map(({ slug }) => ({ path: slug, element: <LegalPage page={slug} /> })),
      {
        path: ':slug',
        element: <AppPage />,
        getStaticPaths: () => PROJECT_SLUGS.filter(slug => !SHARED_APP_ROOTS.some(root => root === slug)),
      },
      {
        path: 'projects/:slug',
        element: <AppPage />,
        getStaticPaths: () => SHARED_APP_ROOTS.map(slug => `projects/${slug}`),
      },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
