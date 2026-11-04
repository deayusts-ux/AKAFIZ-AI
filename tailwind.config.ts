import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--c-canvas) / <alpha-value>)",
        cell: "rgb(var(--c-cell) / <alpha-value>)",
        elevated: "rgb(var(--c-elevated) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        muted: "rgb(var(--c-muted) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        iris: "#6366f1",
        plasma: "#a855f7",
        aqua: "#22d3ee",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-jakarta)", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        card: "inset 0 1px 0 0 rgb(255 255 255 / 0.05), 0 24px 48px -32px rgb(0 0 0 / 0.9)",
        glow: "0 20px 60px -24px rgb(99 102 241 / 0.55)",
        "glow-sm": "0 12px 32px -18px rgb(99 102 241 / 0.5)",
      },
      backgroundImage: {
        grid:
          "linear-gradient(to right, rgb(var(--c-line) / 0.055) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--c-line) / 0.055) 1px, transparent 1px)",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(6px, -18px)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "33%": { transform: "translate3d(5%, -6%, 0) scale(1.08)" },
          "66%": { transform: "translate3d(-4%, 4%, 0) scale(0.96)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scan: {
          "0%": { transform: "translateY(-120%)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": { transform: "translateY(560%)", opacity: "0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%, 100%": { transform: "scale(1.8)", opacity: "0" },
        },
        shine: {
          "0%": { transform: "translateX(-120%) skewX(-18deg)" },
          "100%": { transform: "translateX(220%) skewX(-18deg)" },
        },
        "heart-pop": {
          "0%": { transform: "scale(1)" },
          "35%": { transform: "scale(1.35)" },
          "60%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.5s ease both",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float-slow 11s ease-in-out infinite",
        aurora: "aurora 22s ease-in-out infinite",
        marquee: "marquee 48s linear infinite",
        scan: "scan 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.8s ease-out infinite",
        shine: "shine 0.9s ease",
        "heart-pop": "heart-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "spin-slow": "spin-slow 26s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
