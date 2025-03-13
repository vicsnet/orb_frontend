import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        bigDesktop: { max: "3200px" }, //Big desktop
        semiBigDesktop: { max: "1920px" },
        bigScreen:{max: "1539"},
        bSemiBig: { max: "1440px" }, //1440
        bSemismall: { max: "1366px" }, //
        lgDesktop: { max: "1280px" }, //large desktop
        smDesktop: { max: "1024px" }, // small desktop
        smDesk: { max: "917px" }, // small desktop
        tabletAir: { max: "820px" }, // small desktop
        tablet: { max: "768px" },
        extraTab:{max:"767px"},
        mobile: { max: "480px" },
        smMobile: { max: "344px" },
      },
    },
  },
  plugins: [],
};
export default config;

