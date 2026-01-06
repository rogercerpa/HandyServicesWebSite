import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette - Bold & Modern
        charcoal: {
          DEFAULT: "#1a1a1a",
          50: "#f7f7f7",
          100: "#e3e3e3",
          200: "#c8c8c8",
          300: "#a4a4a4",
          400: "#818181",
          500: "#666666",
          600: "#515151",
          700: "#434343",
          800: "#383838",
          900: "#1a1a1a",
          950: "#0d0d0d",
        },
        electric: {
          DEFAULT: "#FFD60A",
          50: "#FFFEF0",
          100: "#FFFACC",
          200: "#FFF599",
          300: "#FFED66",
          400: "#FFE433",
          500: "#FFD60A",
          600: "#D4B000",
          700: "#A38700",
          800: "#705D00",
          900: "#3D3300",
        },
        accent: {
          orange: "#FF6B35",
          teal: "#00CED1",
          purple: "#8B5CF6",
        },
      },
      fontFamily: {
        heading: ["var(--font-instrument)", "system-ui", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "pulse-glow": "pulseGlow 2s infinite",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 214, 10, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 214, 10, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern":
          "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
        "electric-gradient":
          "linear-gradient(135deg, #FFD60A 0%, #FF6B35 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

