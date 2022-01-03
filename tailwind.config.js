module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'ibm-plex-sans': ["'IBM Plex Sans'", 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        body: '#fcfcfc',
        'primary-blue': '#0135B3',
      },
      boxShadow: {
        'elevation-2': '0px 2px 4px 0px rgba(0, 0, 0, 0.16)',
      },
      letterSpacing: {
        btn: '0.02em',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
