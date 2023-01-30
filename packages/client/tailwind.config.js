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
        jsClientGlow: "#7D0CC1",
        jsClientDark: "rgba(125, 12, 193, 0.3)",
        blurColor: "rgba(125, 12, 193, 0.5)",
        flowerBlur: "rgba(193, 12, 12, 0.5)",
      },
      fontFamily: {
        monserrat: "Montserrat",
        color: "#fff",
      },
      shadow: {
        btn: "4px 4px 14px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
