/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        'kepler-primary': '#1F7CF4',
        'kepler-secondary': '#6A7485',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif'],
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        'inter-thin': '100',
        'inter-extralight': '200',
        'inter-light': '300',
        'inter-normal': '400',
        'inter-medium': '500',
        'inter-semibold': '600',
        'inter-bold': '700',
        'inter-extrabold': '800',
        'inter-black': '900',
      }
    },
  },
  
  plugins: [],
};