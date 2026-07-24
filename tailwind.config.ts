import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm, elegant Cavalier palette drawn from the parent-dog photography
        ink: "#201812",        // deep espresso — hero backgrounds
        charcoal: "#2b2320",   // softer dark for sections
        chestnut: "#6e3b23",   // ruby / mahogany
        caramel: "#b07c4f",    // blenheim tan
        sand: "#e7d8c3",       // warm stone
        cream: "#f8f2e8",      // ivory background
        gold: "#c39b52",       // heritage gold accent
        "gold-soft": "#d8b878",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 45px -25px rgba(32, 24, 18, 0.45)",
        lift: "0 30px 60px -30px rgba(32, 24, 18, 0.55)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "kenburns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease forwards",
        kenburns: "kenburns 18s ease-out forwards",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
