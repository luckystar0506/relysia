const plugin = require('tailwindcss/plugin')

module.exports = {
  important: true,
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#2E2E47',
        secondary: '#FE2C3D',
        third: '#3F4060',
        fourth: '#FF9199',
        fifth: '#282554',
        sHover: '#434262',
        pinkTransparent: 'rgba(255, 204, 208, 0.2)',
        bgLight: 'rgba(255, 245, 246, 0.2)',
      },
      backgroundImage: {
        gradient: 'linear-gradient(92.55deg, #E70077 3.08%, #FC8F0C 97.48%)',
        gradientHover:
          'linear-gradient(111.07deg, #E7009A 10.57%, #FC5C0C 105.27%)',
        gradient2: 'linear-gradient(180deg, #1F87EF 0%, #D614A8 100%)',
        gradient3: 'linear-gradient(101.46deg, #40CA69 9.74%, #0CFCD1 118.22%)',
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
