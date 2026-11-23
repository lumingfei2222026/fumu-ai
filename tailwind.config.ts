import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary - minimal black
        primary: {
          DEFAULT: "#111111",
          hover: "#333333",
          light: "#F5F5F5",
        },
        // Neutrals
        ink: {
          900: "#0F172A",
          700: "#334155",
          500: "#64748B",
          300: "#CBD5E1",
          100: "#F1F5F9",
        },
        bg: {
          page: "#FAFAFA",
          surface: "#FFFFFF",
          subtle: "#F5F5F5",
        },
        // Semantic
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
      },
      fontFamily: {
        display: ["PingFang SC", "Helvetica Neue", "sans-serif"],
        body: ["PingFang SC", "Microsoft YaHei", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
      },
      spacing: {
        4: "1rem",
        8: "2rem",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(17, 17, 17, 0.06)",
        md: "0 4px 12px rgba(17, 17, 17, 0.1)",
        lg: "0 12px 32px rgba(17, 17, 17, 0.14)",
        xl: "0 20px 48px rgba(17, 17, 17, 0.18)",
      },
      maxWidth: {
        "mobile": "480px",
      },
    },
  },
  plugins: [],
};

export default config;
