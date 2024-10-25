/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "'Montserrat', sans-serif",
        bebasNeue: "`Bebas Neue`, sans-serif",
        roboto: "'Roboto', sans-serif",
      },
      colors: {
        primary: "#4ea7dd", // Text color: lightblue
        secondary: "#8B0000", // Text color: dark red
        highlight: "#FF5722", // highlight color
        sectionBgColor: "#F7F7F7", // bg color for sections
        lightRedBg: "#FFE6E6", // background color
        btnBgColor: "#1E2E61", // Button bg color
        btnBgHoverColor: "#CC0000", // Button bg hover color
        dashboardNavbarBG: "#FFCCCC", // Dashboard navbar bg color
        footerBGColor: "#2C3E50", // Footer bg color
        logoMainColor: "#1F3060",
        baseColor: "#FCFCFC",
        deepColor: "#1E2E61",
        midColor: "#2E568A",
        semiColor: "#3E7EB3",
        lightColor: "#4EA7DD",
      },
      backgroundImage: {
        bannerImg:
          "url('https://images.unsplash.com/photo-1423666523292-b458da343f6a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      },
    },
  },
  plugins: [require("daisyui")],
};
