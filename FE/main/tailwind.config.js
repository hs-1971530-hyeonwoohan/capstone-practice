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
      colors: {
        'lightbeige' : '#eeeeee',
      },
      animation: {
        fill: 'fill 2s forwards', // 커스텀 애니메이션의 이름과 지속 시간, 'forwards'로 설정합니다.
      },
      keyframes: {
        fill: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }, // 게이지 바가 채워질 최종 너비입니다. 이 값을 실제 게이지 바의 비율로 변경해주세요.
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
