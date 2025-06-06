/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': {
          50: '#F7FDF8',  // Lightest green for backgrounds
          100: '#E6F7E8',
          200: '#C9ECD0',
          300: '#A1E267',  // Lime green for gradients
          400: '#7DCF8B',
          500: '#58C471',  // Primary light green
          600: '#5CA660',  // Natural leaf green
          700: '#4A8B4E',
          800: '#3A703D',
          900: '#2C552F',
        },
        'brand-dark': '#1A1A1A',  // Dark slate for headlines
        'brand-gray': '#757575',  // Mid-gray for secondary content
        'brand-light': '#FAFAFA',  // Soft white background
        'brand-accent': {
          red: '#F75C5C',      // Soft red for notifications
          purple: '#C99CFF',   // Lavender purple for loyalty points
          blue: '#6BAAFB',     // Blue for calendar icons
          orange: '#FBA871',   // Soft orange for order tracking
        },
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(to right, #58C471, #A1E267)',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        'xl': '1rem',
      },
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
  },
  plugins: [],
}