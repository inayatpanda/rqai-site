import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Pulls in vite-react-ssg's `ssgOptions` augmentation of Vite's config type.
import type {} from 'vite-react-ssg'

// The site deploys to the web root of rqai.co.uk, and every route is
// prerendered to its own /route/index.html by vite-react-ssg. An absolute
// base keeps the hashed /assets/* URLs correct from deep routes such as
// /orthoportfolio/ (a relative base would resolve them under the route dir).
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  ssgOptions: {
    // Emit dist/<route>/index.html (not dist/<route>.html) so deep links resolve
    // as real directories on Apache/Hostinger.
    dirStyle: 'nested',
  },
})
