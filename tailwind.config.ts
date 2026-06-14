import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f3f6f2",
          100: "#e3ebe0",
          200: "#c7d8c2",
          300: "#a1bd99",
          400: "#759c6b",
          500: "#547f4b",
          600: "#3f6539",
          700: "#33502f",
          800: "#2b4128",
          900: "#243622",
        },
        wood: {
          50: "#faf6f0",
          100: "#f1e7d8",
          200: "#e2cdb0",
          300: "#d0ac80",
          400: "#bf8c57",
          500: "#b1763f",
          600: "#9c6034",
          700: "#814a2d",
          800: "#6a3d2a",
          900: "#583425",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
