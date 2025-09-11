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
        casino: {
          green: {
            900: '#0f2f0f',
            800: '#1a4d1a',
            700: '#266b26',
            600: '#338833',
            500: '#40a640',
            400: '#4dc44d',
            300: '#66d966',
            200: '#80e680',
            100: '#99f299',
          },
          gold: {
            900: '#4a3f00',
            800: '#6b5b00',
            700: '#8c7700',
            600: '#ad9200',
            500: '#ceae00',
            400: '#efca00',
            300: '#f2d426',
            200: '#f5de4d',
            100: '#f8e873',
          },
          red: {
            900: '#4a0000',
            800: '#6b0000',
            700: '#8c0000',
            600: '#ad0000',
            500: '#ce0000',
            400: '#ef0000',
            300: '#f22626',
            200: '#f54d4d',
            100: '#f87373',
          }
        }
      },
      backgroundImage: {
        'casino-gradient': 'linear-gradient(135deg, #0f2f0f 0%, #1a4d1a 25%, #266b26 50%, #1a4d1a 75%, #0f2f0f 100%)',
        'gold-gradient': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
        'red-gradient': 'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)',
        'green-gradient': 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(234, 179, 8, 0.5)',
        'glow': '0 0 20px rgba(234, 179, 8, 0.5)',
        'glow-lg': '0 0 30px rgba(234, 179, 8, 0.6)',
        'glow-red': '0 0 20px rgba(220, 38, 38, 0.5)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.5)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 20px 35px -5px rgba(0, 0, 0, 0.4), 0 15px 15px -5px rgba(0, 0, 0, 0.06)',
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      height: {
        '42': '10.5rem',
      },
      width: {
        '28': '7rem',
      }
    },
  },
  plugins: [],
}
