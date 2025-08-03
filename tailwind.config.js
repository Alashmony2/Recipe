const { heroui } = require("@heroui/react");
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add any custom colors here
      },
    },
  },
  plugins: [
    heroui(),
    require('flowbite/plugin')
  ],
}

