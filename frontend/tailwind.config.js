/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Brand / semantic colors
        brand: {
          DEFAULT: '#0b1220' // deep navy / dark charcoal
        },
        primary: {
          DEFAULT: '#1366D6', // bright professional blue
          hover: '#0F57B8',
          dark: '#0B4EA0'
        },
        background: '#F7F8FA',
        surface: '#FFFFFF',
        'text-primary': '#0B0F1A',
        'text-secondary': '#6B7280',
        border: '#E6E7EB',
        success: '#16A34A',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#0EA5E9'
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto']
      },
      boxShadow: {
        card: 'rgba(2,6,23,0.06) 0 8px 20px',
        card-hover: 'rgba(2,6,23,0.08) 0 12px 30px'
      }
    }
  },
  plugins: []
};
