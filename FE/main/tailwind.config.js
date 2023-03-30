/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        kr: ['Noto Sans KR'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
