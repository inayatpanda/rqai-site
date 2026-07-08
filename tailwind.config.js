/** @type {import('tailwindcss').Config} */

/*
 * RQAI — light "ECG chart-paper" design system.
 * OWNER DECISION 2026-07-08: light theme (overrides the family "dark
 * everywhere" rule for THIS site). Warm cream paper canvas, white cards,
 * deep ink text, ONE surgical-teal accent + ONE warm amber accent used
 * sparingly. Editorial serif (Fraunces) over a clean sans (IBM Plex Sans).
 *
 * Token contrast (WCAG AA verified against paper #faf7f2 and card #fffdfa):
 *   inkStrong 15.3:1 · ink 8.5:1 · inkMuted 5.2:1 · teal 5.5:1 (white-on-teal
 *   5.8:1) · amber 4.9:1 (white-on-amber 5.3:1). All pass AA for small text.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#faf7f2', // warm cream canvas (chart paper)
        card: '#fffdfa', // white-warm surface for cards / raised panels
        inkStrong: '#16212b', // headings — deep ink with a faint teal cast
        ink: '#3d4a53', // body text
        inkMuted: '#5f6a72', // captions, labels, secondary text
        hairline: '#e9e2d7', // faint warm borders / dividers
        teal: '#0b716c', // surgical-teal accent (links, CTAs, ECG trace)
        amber: '#9c5d16', // warm accent, used sparingly
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
        // Shadows tinted to the ink hue (never pure black on the light canvas).
        soft: '0 1px 2px rgba(22,33,43,0.04), 0 8px 24px -12px rgba(22,33,43,0.12)',
        lift: '0 2px 4px rgba(22,33,43,0.05), 0 20px 44px -20px rgba(11,113,108,0.22)',
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
