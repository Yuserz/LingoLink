/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      primary: "#4FD1C5",
      secondary: "#F8F9FA",
      white: "#FFFFFF",
      black: "#2D3748",
      gray: {
        100: "#f7fafc",
        200: "#edf2f7",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c",
      },
    },
    extend: {
      fontFamily: {
        custom: ["MyFont", "sans-serif"],
      },
      textColor: {
        primary: "#4FD1C5",
        secondary: "#F8F9FA",
        white: "#FFFFFF",
        black: "#2D3748",
        black2: "#A0AEC0",
      },
    },
  },
  plugins: [],
};
