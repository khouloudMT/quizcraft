/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#2563eb', // Your primary blue
          600: '#1d4ed8', // Darker shade
        },
        red: {
          500: '#dc2626', // Your primary red
          600: '#b91c1c', // Darker shade
        },
      },
      gradientColorStops: {
        'blue-start': '#2563eb',
        'red-end': '#dc2626',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}