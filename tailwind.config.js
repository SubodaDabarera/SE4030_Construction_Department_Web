/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      custom: ["Poppins", "sans-serif"],
    },
    extend: {
      // colors: {
      //   cyan: colors.cyan,
      // },
    },
  },
  plugins: [
    // require("@tailwindcss/aspect-ratio"),
    // require("@tailwindcss/forms"),
    // require("@tailwindcss/typography"),
  ],
};
