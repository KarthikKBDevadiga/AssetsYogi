module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway'],
      },
      colors: {
        bcolor: {
          DEFAULT: '#828282',
        },
        bluecolor: {
          DEFAULT: '#2D9CDB'
        },
        tcolor: {
          DEFAULT: '#4F4F4F'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
