const { colors } = require('./app/constants/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        primary: colors.primary,
        theme: {
          primary: colors.background.primary,
          secondary: colors.background.secondary,
        }
      },
      typography: {
        DEFAULT: {
          css: {
            color: colors.text.primary,
            a: {
              color: colors.primary.main,
              '&:hover': {
                color: colors.primary.light,
              },
            },
            strong: {
              color: colors.text.primary,
            },
            h1: {
              color: colors.text.primary,
            },
            h2: {
              color: colors.text.primary,
            },
            h3: {
              color: colors.text.primary,
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 