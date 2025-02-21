/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    './app.vue',
    './layouts/templates/header.vue',
    './components/**',
    
    
  ],
  theme: {
    extend: {
      colors: {
        primary_blackground_color: "#1B1B20"
      }
    },
  },
  plugins: [],
}

