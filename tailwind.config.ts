import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07090d",
        panel: "#11161f",
        line: "rgba(236,229,215,0.11)",
        gold: "#d0ad6a",
        sage: "#9bb8aa",
        signal: "#91a7ff",
        chalk: "#f3ecdf",
        muted: "#a9a092",
        copper: "#c7825b"
      },
      boxShadow: {
        premium: "0 24px 80px rgba(0, 0, 0, 0.38)",
        quiet: "inset 0 1px 0 rgba(255,255,255,0.06), 0 18px 50px rgba(0,0,0,0.26)"
      },
      fontFamily: {
        serif: ["var(--font-lora)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "fade-up": "fade-up 420ms ease-out both"
      }
    }
  },
  plugins: []
};

export default config;
