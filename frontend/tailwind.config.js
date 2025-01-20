/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Use the class strategy for dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure Tailwind purges the right files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
        'dark-primary': '#1e3a8a',  // Dark mode color for primary
        'dark-secondary': '#16a085', // Dark mode color for secondary
      },
    },
    
  },
  plugins: [],
}
