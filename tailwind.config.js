/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      primary: ['Mulish', 'sans-serif'],
      secondary: ['Londrina Solid', 'cursive']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#AAED4A',
      orange: '#FFA62B',
      violet: '#210535',
      black: '#12021D',
      green: {
        DEFAULT: '#AAED4A',
        25: '#353A2D'
      },
      red: {
        DEFAULT: '#EF466F',
        25: '#491331'
      },
      wgb: {
        grey2: '#E4E6E9'
      },
      gradient: {
        start: 'rgba(49, 12, 74, 0.5)',
        end: 'rgba(6, 14, 37, 0.95)'
      },
      blue: {
        DEFAULT: '#3772FF',
        25: '#1B1E55'
      },
      white: {
        DEFAULT: '#FEFEFE',
        50: '#EFEEE9',
        250: '#B8B3B6',
        500: '#807883',
        750: '#493D50',
        900: '#281A31',
        950: '#1D0E27',
        1000: '#12021D'
      },
      purple: '#71458E'
    },
    extend: {}
  },
  plugins: []
}
