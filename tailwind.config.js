/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#E6FCF9',
          100: '#C3F9F0',
          200: '#8EF0E0',
          300: '#4FE6CF',
          400: '#20D4BD',
          500: '#14B8A6',
          600: '#0F9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
        },
        primary: '#14B8A6',
        secondary: '#0F9488',
        dark: '#0F172A',
        card: '#1E293B',
      },
      textColor: {
        contrast: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
      },
      backgroundColor: {
        body: 'var(--bg-body)',
        card: 'var(--bg-card)',
        elevated: 'var(--bg-elevated)',
      },
      borderColor: {
        muted: 'var(--text-muted)',
        card: 'var(--bg-card)',
        elevated: 'var(--bg-elevated)',
        subtle: 'var(--border-subtle)',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.06)',
        'elevated': '0 8px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        'modal': '0 24px 48px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)',
        'glow': '0 0 20px rgba(20, 184, 166, 0.15)',
      },
    },
  },
  plugins: [],
}
