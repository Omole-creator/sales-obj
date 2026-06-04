import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Money-green, the primary CTA / action accent (signals "go" + money).
        // The Playwright theme test asserts this exact value (rgb(22, 163, 74)).
        brand: {
          DEFAULT: "#16A34A",
          dark: "#15803D",
        },
        // Gold pulled from the ebook cover. Now the dominant authority/wealth
        // accent: eyebrows, highlights, and the full-bleed "punch" sections.
        gold: {
          DEFAULT: "#F5B301",
          soft: "#FFD45E",
        },
        ink: "#0A0A0A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "cta-pulse": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(22,163,74,0.55)" },
          "50%": { transform: "scale(1.03)", boxShadow: "0 0 0 18px rgba(22,163,74,0)" },
        },
        "rise": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "cta-pulse": "cta-pulse 1.8s ease-in-out infinite",
        "rise": "rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "marquee": "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
