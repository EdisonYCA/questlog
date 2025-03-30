/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'expand': {
          '0%': { 
            opacity: '0',
            transform: 'scale(1) translate(0, 0)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1.1) translate(-50%, -50%)'
          }
        },
        'contract': {
          '0%': { 
            opacity: '1',
            transform: 'scale(1.1) translate(-50%, -50%)'
          },
          '100%': { 
            opacity: '0',
            transform: 'scale(1) translate(0, 0)'
          }
        }
      },
      animation: {
        'expand': 'expand 0.3s ease-out forwards',
        'contract': 'contract 0.3s ease-in forwards'
      }
    },
  },
  plugins: [],
}; 