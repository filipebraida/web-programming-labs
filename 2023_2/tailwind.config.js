/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.{edge,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f7fa',
          100: '#e6ecf3',
          200: '#d4dee9',
          300: '#bbccdd',
          400: '#92acc8',
          500: '#7893b9',
          600: '#667daa',
          700: '#5a6d9b',
          800: '#4d5a80',
          900: '#414c67',
          950: '#2b3140',
        },
      },
    },
  },
  plugins: [],
}
