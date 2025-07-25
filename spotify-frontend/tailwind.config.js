/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { 
            transform: 'translateX(-100%) rotate(0deg)',
            opacity: '0'
          },
          '50%': { 
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(100%) rotate(0deg)',
            opacity: '0'
          }
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s ease-in-out infinite',
      },
      perspective: {
        '1000': '1000px',
      },
      colors: {
        spotify: {
          green: '#1db954',
          'green-hover': '#1ed760',
          black: '#191414',
          'dark-gray': '#121212',
          'medium-gray': '#282828',
          'light-gray': '#b3b3b3',
          white: '#ffffff',
        }
      },
      fontFamily: {
        'spotify': ['Circular', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer-gradient': 'linear-gradient(45deg, transparent 35%, rgba(255,255,255,0.5) 50%, transparent 65%)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [
    // Custom plugin for perspective utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        }
      }
      addUtilities(newUtilities)
    }
  ],
}
