/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      primary: ['Londrina Solid', 'sans-serif'],
      secondary: ['Londrina Solid', 'sans-serif']
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: '#3B8CF0',
      orange: '#FFA62B',
      violet: '#210535',
      black: '#000505',
      green: {
        DEFAULT: '#AAED4A',
        25: '#353A2D'
      },
      red: {
        DEFAULT: '#EE6055',
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
        50: '#1B7AEE'
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
