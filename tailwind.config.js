/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom medical theme colors
        'medical-blue': '#2563eb',
        'medical-blue-light': '#3b82f6',
        'medical-blue-dark': '#1d4ed8',
        'medical-slate': '#64748b',
        'medical-slate-light': '#94a3b8',
        'medical-slate-dark': '#475569',
        'medical-emerald': '#059669',
        'medical-rose': '#e11d48',
        'medical-amber': '#f59e0b',
        'medical-purple': '#7c3aed',
        'medical-cyan': '#0891b2',
        'medical-lime': '#65a30d',
        'medical-fuchsia': '#c026d3',
        'medical-orange': '#ea580c',
        'medical-pink': '#ec4899',
        'medical-teal': '#0d9488',
        'medical-yellow': '#ca8a04',
        'medical-green': '#16a34a',
        'medical-violet': '#7c3aed',
        'medical-indigo': '#4f46e5',
      },
      fontFamily: {
        'medical': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'medical-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'medical-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'medical-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'medical-xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
      borderRadius: {
        'medical-sm': '0.375rem',
        'medical-md': '0.5rem',
        'medical-lg': '0.75rem',
        'medical-xl': '1rem',
        'medical-2xl': '1.5rem',
      },
      animation: {
        'medical-pulse': 'medical-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'medical-bounce': 'medical-bounce 1s infinite',
      },
      keyframes: {
        'medical-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        'medical-bounce': {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}