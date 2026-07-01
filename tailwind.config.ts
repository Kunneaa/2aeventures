import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0b151c",
          primary: "#17324d",
          accent: "#336699",
          light: "#f2f7fb",
          border: "#d8e3df",
          secondary: "#d9a85c",
        },
      },
      fontFamily: {
        sans: ["var(--font-be-vietnam-pro)", "sans-serif"],
        serif: ["var(--font-cormorant-garamond)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
