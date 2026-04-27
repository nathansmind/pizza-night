import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C83D3E',
        cream: '#FAF6EE',
      },
      fontFamily: {
        sans: ['var(--font-pt-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-pt-sans-narrow)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
