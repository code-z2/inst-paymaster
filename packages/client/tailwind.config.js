/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundTheme: "#11142b",
        secondaryGlow: "#7d0cc1",
      },
      fontFamily: {
        monserrat: "Montserrat",
        color: "#fff",
      },
      mainContainer: {
        maxWidth: "88%",
        center: "0 auto",
      },
    },
  },
  plugins: [],
};
