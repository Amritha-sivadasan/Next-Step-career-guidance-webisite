/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
         sans: ["Lato", "Helvetica", "Arial", "sans-serif"],
      },
      animation: {
        'fallDown': 'fallDown 0.5s ease-out',
      },
      keyframes: {
        fallDown: {
          '0%': { opacity: 0, transform: 'translateY(-100px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};