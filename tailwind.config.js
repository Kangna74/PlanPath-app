/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    color: {
      'blue': {
        100: '#f2f7fb',
        500: '#136ab0'
      }
    },
    fontFamily: {
      'merienda': ['merienda', 'serif'],
      'jost': ['jost', 'sans-serif'],
    },
  },
  plugins: [],
}

