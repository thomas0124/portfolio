/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      perspective: {
        '1000': '1000px'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        ping: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '75%, 100%': { transform: 'scale(2)', opacity: '0' }
        },
        'ping-fast': {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '70%': { transform: 'scale(2.5)', opacity: '0' },
          '100%': { transform: 'scale(0.8)', opacity: '0' }
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'timeline-grow': {
          '0%': { height: '0%' },
          '100%': { height: '100%' }
        },
        'dot-appear': {
          '0%': {
            transform: 'translate(-50%, -50%) scale(0)',
            opacity: '0'
          },
          '50%': {
            transform: 'translate(-50%, -50%) scale(1.2)'
          },
          '100%': {
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: '1'
          }
        },
        'pulse-strong': {
          '0%, 100%': {
            transform: 'translate(-50%, -50%) scale(1)',
            boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)'
          },
          '50%': {
            transform: 'translate(-50%, -50%) scale(1.1)',
            boxShadow: '0 0 0 10px rgba(59, 130, 246, 0)'
          }
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'expand-width': {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        ping: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ping-fast': 'ping-fast 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'timeline-grow': 'timeline-grow 1.5s ease-out forwards',
        'dot-appear': 'dot-appear 0.5s ease-out forwards',
        'pulse-strong': 'pulse-strong 2s infinite',
        'spin-slow': 'spin-slow 12s linear infinite',
        'expand-width': 'expand-width 0.7s ease-out forwards',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
