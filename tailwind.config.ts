import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#030406",
          900: "#07090d",
          850: "#0b0f15",
          800: "#10141b",
          700: "#161c25",
        },
        platinum: "#e8edf4",
        volt: "#78f7d4",
        signal: "#66e3ff",
        iris: "#a58cff",
        ember: "#ffb86b",
      },
      boxShadow: {
        aurora: "0 0 80px rgba(102, 227, 255, 0.18)",
        glass: "inset 0 1px 0 rgba(255,255,255,0.11), 0 24px 80px rgba(0,0,0,0.36)",
        line: "0 0 0 1px rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at 50% 0%, rgba(102,227,255,0.24), transparent 38%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      animation: {
        "slow-spin": "slowSpin 20s linear infinite",
        "float-soft": "floatSoft 7s ease-in-out infinite",
        "scan-line": "scanLine 3.8s ease-in-out infinite",
        shimmer: "shimmer 5s linear infinite",
      },
      keyframes: {
        slowSpin: { to: { transform: "rotate(360deg)" } },
        floatSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        scanLine: {
          "0%, 100%": { transform: "translateY(-12%)", opacity: "0" },
          "18%, 82%": { opacity: "1" },
          "50%": { transform: "translateY(112%)" },
        },
        shimmer: {
          from: { backgroundPosition: "0% 50%" },
          to: { backgroundPosition: "200% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
