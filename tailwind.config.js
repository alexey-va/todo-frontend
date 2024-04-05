/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '450px'
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translate(1px, 1px)' },
          '10%': { transform: 'translate(-1px, -2px) ' },
          '20%': { transform: 'translate(-3px, 0px)' },
          '30%': { transform: 'translate(3px, 2px)' },
          '40%': { transform: 'translate(1px, -1px)' },
          '50%': { transform: 'translate(-1px, 2px) ' },
          '60%': { transform: 'translate(-3px, 1px)' },
          '70%': { transform: 'translate(3px, 1px) ' },
          '80%': { transform: 'translate(-1px, -1px)' },
          '90%': { transform: 'translate(1px, 2px)' },
          '100%': { transform: 'translate(1px, -2px) ' },
        },
      },
    },
  },
  plugins: [],
}

