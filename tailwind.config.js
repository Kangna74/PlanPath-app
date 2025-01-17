/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '100rem'
      },
      backgroundImage: {
        'path': "url('/public/img/imgpath.webp')",
        'smpath': "url('/public/img/imgpathsm.webp')",
      }
    },
    color: {
      'blue': {
        100: '#f2f7fb',
        500: '#136ab0'
      }
    },
    fontFamily: {
      'merienda': ['merienda', 'serif'],
      'sans': ['jost', 'sans-serif'],
    },
  },
  plugins: [],
}

