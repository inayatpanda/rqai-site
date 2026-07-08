/** @type {import('tailwindcss').Config} */

/*
 * RQAI dark-blue design system.
 * OWNER DECISION 2026-07-08 v2: DARK BLUE theme (supersedes the earlier light
 * theme AND the family "near-black #04060c" rule for THIS site). A deep
 * navy/indigo canvas that reads unmistakably blue, dark-blue cards, crisp
 * hairlines, and restrained luminous accents: ONE electric-cyan accent + ONE
 * warm gold counterpoint, used sparingly. Editorial serif (Fraunces) over a
 * clean sans (IBM Plex Sans).
 *
 * Token contrast (WCAG AA verified against canvas #0c1a3a and card #13234c):
 *   inkStrong 15.3:1 / ink 11.3:1 / inkMuted 6.0:1 (on card) / accent 8.8:1
 *   (canvas-on-accent CTA text 9.8:1) / accentWarm 8.2:1. All pass AA for
 *   small text on both surfaces.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#0c1a3a', // deep indigo-navy page background (reads blue, not black)
        card: '#13234c', // dark-blue surface for cards / raised panels
        inkStrong: '#eef2ff', // headings, near-white with a blue cast
        ink: '#c7d2ec', // body text
        inkMuted: '#93a2c8', // captions, labels, secondary text
        hairline: '#2e4374', // crisp blue borders / dividers
        accent: '#45d5f2', // electric cyan (links, CTAs, constellation)
        accentWarm: '#f4b05a', // warm gold counterpoint, used sparingly
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Cambria', 'serif'],
        sans: [
          'IBM Plex Sans',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        edge: '72rem',
      },
      letterSpacing: {
        label: '0.16em',
      },
      boxShadow: {
        // Deep navy shadows (never pure black); `lift` adds a restrained
        // luminous cyan edge for hover states.
        soft: '0 1px 2px rgba(3,8,24,0.5), 0 8px 24px -12px rgba(3,8,24,0.7)',
        lift: '0 0 0 1px rgba(69,213,242,0.16), 0 20px 44px -20px rgba(3,8,24,0.8)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
