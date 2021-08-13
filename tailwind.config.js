const plugin = require('tailwindcss/plugin')

module.exports = {
  important: true,
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        third: 'var(--third)',
        fourth: 'var(--fourth)',
        fifth: 'var(--fifth)',
        sHover: 'var(--sHover)',
        pinkTransparent: 'var(--pinkTransparent)',
        bgLight: 'var(--bgLight)',
        relPink: 'var(--relPink)',
        relGreen: 'var(--relGreen)',
        cardArticleBg: 'var(--cardArticleBg)',
        borderOne: 'var(--borderOne)',
        sidebar: 'var(--sidebar)',
      },
      backgroundImage: {
        gradient: 'var(--gradient)',
        gradientHover: 'var(--gradientHover)',
        gradient2: 'var(--gradient2)',
        gradient3: 'var(--gradient3)',
      },
      borderRadius: {
        default: '32px',
      },
      fontSize: {
        body: '16px',
        h1: [
          '3.5rem',
          {
            lineHeight: '3.5rem',
          },
        ],
        h2: [
          '3rem',
          {
            lineHeight: '3rem',
          },
        ],
        h3: [
          '2rem',
          {
            lineHeight: '2rem',
          },
        ],
        h4: [
          '1.5rem',
          {
            lineHeight: '1.5rem',
          },
        ],
        h5: [
          '1.125rem',
          {
            lineHeight: '1.125rem',
          },
        ],
        par: [
          '1.125rem',
          {
            lineHeight: '1.5rem',
          },
        ],
        'par-s': ['1rem', { lineHeight: '1.625rem' }],
      },
      height: {
        worldMap: '63.75rem',
        worldMapBig: '85rem',
      },
      width: {
        hero: '60.5rem',
      },
      maxWidth: {
        heroMax: '60.5rem',
      },
      zIndex: {
        5: '5',
      },
      letterSpacing: {
        tightS: '-0.5px',
      },
      borderColor: {
        gradient: 'linear-gradient(92.55deg, #E70077 3.08%, #FC8F0C 97.48%)',
      },
      boxShadow: {
        primaryButton: '0px 20px 40px rgba(254, 44, 61, 0.15)',
        platformCardIconPink: '0px 40px 100px 0px rgba(255, 204, 208, 0.8)',
        platformCardIconGreen: '0px 20px 100px 0px rgba(212, 247, 223, 0.5)',
      },
      fill: {
        socialIconHover: '#FF9199',
      },
      margin: {
        '1/4': '20%',
        '-1/4': '-20%',
      },
      backdropBlur: {
        cardBLur: 'var(--cardBLur)',
      },
    },
    fontFamily: {
      body: ['Sofia Pro'],
    },
    screens: {
      '3xl': { min: '1600px' },
      // => @media (max-width: 1600px) { ... }
      '2xl': { min: '1440px' },
      // => @media (min-width: 1535px) { ... }
      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }
      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }
      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }
      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-pseudo-elements'),
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.active-nav': {
          content: "''",
        },
      }
      addUtilities(newUtilities, {
        variants: ['before', 'after'],
      })
    }),
  ],
}
