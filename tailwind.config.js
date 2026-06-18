/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#06070b',
        surface: '#0f1118',
        'surface-2': '#141722',
        hairline: '#232734',
        fg: '#eef2f9',
        muted: '#8b94a7',
        accent: {
          teal: '#2dd4bf',
          cyan: '#22d3ee',
          violet: '#818cf8',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      backgroundImage: {
        // House accent gradient: teal -> cyan -> violet (NON-NEGOTIABLE)
        'accent-grad': 'linear-gradient(135deg, #2dd4bf, #22d3ee 45%, #818cf8)',
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
