// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import tailwindcss from '@tailwindcss/vite'

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Scan all JS/JSX/TS/TSX files in src
    './src/index.css' // Explicitly include index.css
  ],
  theme: {
    extend: {
      colors: {
        'custom-yellow': '#facc15',
      },
    },
  },
  plugins: [
    tailwindcss(),
  ],
};