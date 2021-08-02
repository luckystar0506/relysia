module.exports = {
  important: true,
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#2E2E47",
        secondary: "#FE2C3D",
        third: "#3F4060",
        fourth: "#FF9199",
        fifth: "#282554",
      },
      backgroundImage: {
        gradient: "linear-gradient(92.55deg, #E70077 3.08%, #FC8F0C 97.48%)",
        gradient2: "linear-gradient(180deg, #1F87EF 0%, #D614A8 100%)",
        gradient3: "linear-gradient(101.46deg, #40CA69 9.74%, #0CFCD1 118.22%)",
      },
      borderRadius: {
        default: "32px",
      },
      fontSize: {
        body: "16px",
        h1: [
          "3.5rem",
          {
            lineHeight: "3.5rem",
          },
        ],
        h2: [
          "3rem",
          {
            lineHeight: "3rem",
          },
        ],
        h3: [
          "2rem",
          {
            lineHeight: "2rem",
          },
        ],
        h4: [
          "1.5rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        h5: [
          "1.125rem",
          {
            lineHeight: "1.125rem",
            color: "#FE2C3D",
          },
        ],
        par: [
          "1.125rem",
          {
            lineHeight: "1.5rem",
          },
        ],
        "par-s": ["1rem", { lineHeight: "1.625rem" }],
      },
      maxWidth: {
        heroMax: "60.5rem",
      },
      zIndex: {
        5: "5",
      },
      letterSpacing: {
        tightS: "-0.5px",
      },
    },
    fontFamily: {
      body: ["Sofia Pro"],
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }
      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }
      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }
      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
