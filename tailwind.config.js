/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: ['./index.html', './src/**/*.{vue, js, ts, jsx, tsx}'],
  theme: {
    // fontFamily: {
    //   'serif': 'Roboto Slab, serif',
    //   'sans': 'wingdings'
    // },
    extend: {
      colors: {
        'text': {
          DEFAULT: '#fff0f0',
          50: '#ffe5e5',
          100: '#ffcccc',
          200: '#ff9999',
          300: '#ff6666',
          400: '#ff3333',
          500: '#ff0000',
          600: '#cc0000',
          700: '#990000',
          800: '#660000',
          900: '#330000',
          950: '#1a0000',
        },
        'background': {
          DEFAULT: '#100e0e',
          50: '#f3f1f1',
          100: '#e7e4e4',
          200: '#d0c8c8',
          300: '#b8adad',
          400: '#a09292',
          500: '#887777',
          600: '#6d5f5f',
          700: '#524747',
          800: '#372f2f',
          900: '#1b1818',
          950: '#0e0c0c',
        },
        'primary': {
          DEFAULT: '#272422',
          50: '#f3f2f1',
          100: '#e7e5e4',
          200: '#d0cbc8',
          300: '#b8b1ad',
          400: '#a09892',
          500: '#887e77',
          600: '#6d655f',
          700: '#524b47',
          800: '#37322f',
          900: '#1b1918',
          950: '#0e0d0c',
        },
        'secondary': {
          DEFAULT: '#d8aa47',
          50: '#fbf5ea',
          100: '#f6ecd5',
          200: '#edd8ab',
          300: '#e4c581',
          400: '#dbb157',
          500: '#d29e2d',
          600: '#a87e24',
          700: '#7e5f1b',
          800: '#543f12',
          900: '#2a2009',
          950: '#151004',
        },
        'accent': {
          DEFAULT: '#f63a3a',
          50: '#fee7e7',
          100: '#fdcece',
          200: '#fa9e9e',
          300: '#f86d6d',
          400: '#f63c3c',
          500: '#f40b0b',
          600: '#c30909',
          700: '#920707',
          800: '#610505',
          900: '#310202',
          950: '#180101',
        },
        'health': {
          DEFAULT: '#00FF00',
          0: '#142900',
          
        }
       },
    },
  },
  plugins: [],
}

