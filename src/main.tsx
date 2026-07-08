import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import { routes } from './App'

// vite-react-ssg drives the router: it prerenders each route to static HTML at
// build time and hydrates on the client. `createRoot` is the SSG entry point.
export const createRoot = ViteReactSSG({ routes, basename: import.meta.env.BASE_URL })
