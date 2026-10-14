/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#49372E',
          dark: '#201B18',
          50: '#F8F4ED',
          100: '#F0E7DA',
          200: '#D8C3A5',
          600: '#A67C52',
          700: '#49372E',
          800: '#201B18',
        },
        ivory: '#F8F4ED',
        surface: '#FFFFFF',
        'surface-secondary': '#D8C3A5',
        'surface-soft': '#F0E7DA',
        espresso: '#201B18',
        mocha: '#49372E',
        'antique-gold': '#A67C52',
        'champagne-gold': '#C6A675',
        'warm-border': '#E4D8C8',
        'muted-taupe': '#76685D',
        accent: '#A67C52',
        success: '#287653',
        error: '#B42318',
        warning: '#946200',
        whatsapp: {
          DEFAULT: '#0BAA75',
          hover: '#08885D',
        },
        'text-main': '#49372E',
        'text-muted': '#76685D',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

