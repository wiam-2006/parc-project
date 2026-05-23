/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest-green': '#2D5A27',
        'warm-ivory': '#f5f7f2',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
        cursive: ['"Dancing Script"', 'cursive'],
      }
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
