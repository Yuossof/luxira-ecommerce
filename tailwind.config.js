import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: '80px',
    },
    extend: {
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        secondry: ["Montserrat", "sans-serif"],
      },
      colors: {
        blue: {
          DEFAULT: '#115573',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        offWhite: '#EDEDED',
        arrow: '#23262A',
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#808080bc',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        gray2: '#666666',
        dark: '#23262A',
        activeDark: '#082634',
        overlay: '#000000f5',
        blue2: '#196383',
        red: '#DB4444',
      },
      borderColor: {
        main: '#F7F7F7',
      },
      boxShadow: {
        main: '5px 5px 15px #D1D9E6, -5px -5px 15px #ffffff',
      },
    },
  },
  plugins: [
    // flowbite.plugin(),
  ],
}
