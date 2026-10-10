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
          DEFAULT: '#be185d',
          dark: '#9d174d',
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          600: '#be185d',
          700: '#9d174d',
          800: '#831843',
        },
        accent: '#fdf2f8',
        surface: '#ffffff',
        whatsapp: {
          DEFAULT: '#25D366',
          hover: '#128C7E',
        },
        'text-main': '#1f2937',
        'text-muted': '#6b7280',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

