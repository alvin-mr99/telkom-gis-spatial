/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  
  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        'kepler-primary': '#1F7CF4',
        'kepler-secondary': '#6A7485',
      },
    },
  },
  
  plugins: [],
};