module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'ibm-plex-sans': ["'IBM Plex Sans'", 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'cool-gray': '#E5E7EB',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
