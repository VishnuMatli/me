/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <--- This line is missing in your setup!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}