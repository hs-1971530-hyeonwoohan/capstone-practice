/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        kr: ['Noto Sans KR'],
      },
      minWidth: {
        '32': '8rem',
        '8': '1rem',
        '20': '5rem',
      },
      maxWidth: {
        '32': '8rem',
        '8': '1rem',
        '20': '5rem',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
