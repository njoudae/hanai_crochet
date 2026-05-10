import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171412",
        porcelain: "#fbfaf7",
        cream: "#f4eee5",
        mist: "#eef3ef",
        petal: "#f4b8c6",
        sage: "#9db89f",
        peach: "#eeb497"
      },
      fontFamily: {
        display: ["var(--font-display)", "Tajawal", "IBM Plex Sans Arabic", "sans-serif"],
        sans: ["var(--font-sans)", "Tajawal", "IBM Plex Sans Arabic", "sans-serif"]
      },
      boxShadow: {
        float: "0 28px 80px rgba(37, 26, 19, 0.16)",
        soft: "0 18px 50px rgba(52, 40, 31, 0.09)"
      }
    }
  },
  plugins: []
};

export default config;
