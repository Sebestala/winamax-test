import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
        },
        selected: {
          DEFAULT: "var(--selected)",
          foreground: "var(--selected-foreground)",
        },
        textColor: "var(--text-color)",
      },
      fontFamily: {
        archivo: ["var(--font-archivo-regular)", "sans-serif"],
        archivoBold: ["var(--font-archivo-bold)", "sans-serif"],
        archivoMedium: ["var(--font-archivo-medium)", "sans-serif"],
        archivoSemiBold: ["var(--font-archivo-semi-bold)", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
