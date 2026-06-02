import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vibrant Orange, the primary CTA accent. The Playwright theme test
        // asserts this exact value (rgb(255, 69, 0)).
        brand: {
          DEFAULT: "#FF4500",
          dark: "#E03C00",
        },
        // Gold pulled from the ebook cover, used for premium accents/underlines.
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
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(255,69,0,0.55)" },
          "50%": { transform: "scale(1.03)", boxShadow: "0 0 0 18px rgba(255,69,0,0)" },
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
