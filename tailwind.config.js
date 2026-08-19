/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#F8FAFC',
          dark: '#0B0F17',
        },
        primary: {
          DEFAULT: '#EA580C', // Naranja eléctrico
          hover: '#C2410C',
        },
        secondary: {
          DEFAULT: '#0EA5E9', // Cian/Azul
          hover: '#0284C7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
