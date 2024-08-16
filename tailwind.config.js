/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: ['./index.html', './src/**/*.{vue, js, ts, jsx, tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'serif']
      },
      colors: {
        'text': {
          DEFAULT: '#060d0f',
          50: '#070f12',
          100: '#0e1e25',
          200: '#1c3c4a',
          300: '#2a5a6f',
          400: '#387894',
          500: '#4696b9',
          600: '#6babc7',
          700: '#90c0d5',
          800: '#b5d5e3',
          900: '#daeaf1',
          950: '#edf5f8',
        },
        'background': {
          DEFAULT: '#f4f9fb',
          50: '#070f12',
          100: '#0f1d24',
          200: '#1d3a49',
          300: '#2c576d',
          400: '#3a7592',
          500: '#4992b6',
          600: '#6da8c5',
          700: '#92bdd3',
          800: '#b6d3e2',
          900: '#dbe9f0',
          950: '#edf4f8',
        },
        'primary': {
          DEFAULT: '#498ab6',
          50: '#070e12',
          100: '#0f1c24',
          200: '#1d3749',
          300: '#2c536d',
          400: '#3a6f92',
          500: '#498ab6',
          600: '#6da2c5',
          700: '#92b9d3',
          800: '#b6d0e2',
          900: '#dbe8f0',
          950: '#edf3f8',
        },
        'secondary': {
          DEFAULT: '#959fd5',
          50: '#070912',
          100: '#0f1224',
          200: '#1d2449',
          300: '#2c356d',
          400: '#3a4792',
          500: '#4959b6',
          600: '#6d7ac5',
          700: '#929bd3',
          800: '#b6bde2',
          900: '#dbdef0',
          950: '#edeef8',
        },
        'accent': {
          DEFAULT: '#7e85cd',
          50: '#070812',
          100: '#0e1025',
          200: '#1d2049',
          300: '#2b2f6e',
          400: '#393f93',
          500: '#474fb8',
          600: '#6c72c6',
          700: '#9195d4',
          800: '#b6b9e2',
          900: '#dadcf1',
          950: '#ededf8',
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

