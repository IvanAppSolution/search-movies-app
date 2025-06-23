/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#030014",
        secondary: "#151312",
        light: {
          DEFAULT: "#F3F4F6", // Gray 100
          hover: "#E5E7EB", // Gray 200
          active: "#D1D5DB", // Gray 300
          100: "#D6C7FF",
          200: "#A8B5DB",
          300: "#9CA4AB",
        },
        dark: {
          DEFAULT: "#1F2937", // Gray 800
          hover: "#374151", // Gray 700
          active: "#4B5563", // Gray 600
          100: "#221F3D",
          200: "#0F0D23",
        },
        accent: "#AB8BFF", // Emerald 500
        background: "#F3F4F6", // Gray 100
        text: "#111827", // Gray 900
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
    },
  },
  plugins: [],
}