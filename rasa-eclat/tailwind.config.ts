import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      obsidian: "#0A0806",
      charcoal: "#141210",
      copper: "#B5712C",
      "copper-light": "#D4924A",
      ivory: "#F4ECE2",
      "ivory-dim": "#B8AFA6",
      gold: "#C9973F",
      smoke: "#1E1B18",
      warning: "#D66B4A",
      black: "#000000",
      white: "#ffffff"
    },
    extend: {
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Inter", "system-ui", "sans-serif"]
      },
      fontSize: {
        "hero-display": ["clamp(56px, 8vw, 120px)", { lineHeight: "0.9", letterSpacing: "0" }],
        "section-title": ["clamp(36px, 5vw, 72px)", { lineHeight: "0.95", letterSpacing: "0" }],
        "card-title": ["clamp(24px, 3vw, 40px)", { lineHeight: "1.05", letterSpacing: "0" }],
        body: ["17px", { lineHeight: "1.7" }],
        caption: ["12px", { lineHeight: "1.4", letterSpacing: "0.12em" }]
      },
      borderRadius: {
        brand: "2px"
      },
      borderColor: {
        copperline: "rgba(181, 113, 44, 0.2)"
      },
      backgroundImage: {
        "copper-cta": "linear-gradient(135deg, #2A1800 0%, #1A0F00 100%)",
        "vessel-glow":
          "radial-gradient(circle at 50% 32%, rgba(212,146,74,0.22), transparent 30%), linear-gradient(180deg, rgba(181,113,44,0.14), rgba(10,8,6,0.84))"
      },
      boxShadow: {
        copper: "0 24px 80px rgba(181, 113, 44, 0.16)",
        insetline: "inset 0 0 0 1px rgba(181, 113, 44, 0.16)"
      },
      keyframes: {
        lineDrop: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top", opacity: "0" },
          "35%": { opacity: "1" },
          "100%": { transform: "scaleY(1)", transformOrigin: "top", opacity: "0" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        }
      },
      animation: {
        "line-drop": "lineDrop 1.8s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
