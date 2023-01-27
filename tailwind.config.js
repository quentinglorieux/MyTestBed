/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
    "./src/*.{vue,js,html}."
  ],
  theme: {
    maxWidth: {
      '300': '300px',
    },
    extend: {},
  },
  plugins: [],
}