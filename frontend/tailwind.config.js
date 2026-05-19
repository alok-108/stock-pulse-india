/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#10B981', // bullish
          red: '#EF4444',   // bearish
          darkBg: '#090D16', // clinical deep navy bg
          cardBg: '#131A26', // terminal card bg
          border: '#1F2C3F'
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'glass-premium': 'linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, rgba(0, 0, 0, 0) 100%)',
        'glass-bearish': 'linear-gradient(180deg, rgba(239, 68, 68, 0.05) 0%, rgba(0, 0, 0, 0) 100%)'
      },
      boxShadow: {
        'terminal': '0 0 15px rgba(16, 185, 129, 0.1)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
}
