/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      backgroundColor: {
        "primary-blue": "var(--primary-blue-color)",
      },
      textColor: {
        "primary-blue": "var(--primary-blue-color)",
      }
    },
  },
  plugins: [],
}