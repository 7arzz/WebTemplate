/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        gold: {
          light: '#fde047',
          DEFAULT: '#fbbf24',
          dark: '#d97706',
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        
        /* -- Wedding Organizer Animations (Elegant, Slow, Soft) -- */
        'wo-fade': 'woFadeIn 1.5s ease-in-out forwards',
        'wo-slide-up': 'woSlideUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'wo-zoom-bg': 'woZoom 10s ease-in-out infinite alternate',

        /* -- Event Organizer Animations (Snappy, Energetic, Bouncy) -- */
        'eo-pop': 'eoPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'eo-slide-in': 'eoSlideIn 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'eo-pulse': 'eoPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',

        /* -- Tour & Travel Animations (Floating, Continuous, Playful) -- */
        'travel-float': 'travelFloat 3s ease-in-out infinite',
        'travel-fly': 'travelFly 1s ease-out forwards',
        'travel-hover': 'travelHover 0.3s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        
        /* Wedding Organizer Keyframes */
        woFadeIn: {
          '0%': { opacity: '0', filter: 'blur(5px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        woSlideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        woZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },

        /* Event Organizer Keyframes */
        eoPop: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '80%': { transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        eoSlideIn: {
          '0%': { opacity: '0', transform: 'translateX(-50px) skewX(-10deg)' },
          '100%': { opacity: '1', transform: 'translateX(0) skewX(0)' },
        },
        eoPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.8', transform: 'scale(1.02)' },
        },

        /* Tour & Travel Keyframes */
        travelFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        travelFly: {
          '0%': { opacity: '0', transform: 'translate(-30px, 30px) rotate(-10deg)' },
          '100%': { opacity: '1', transform: 'translate(0, 0) rotate(0)' },
        },
        travelHover: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-8px) scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
