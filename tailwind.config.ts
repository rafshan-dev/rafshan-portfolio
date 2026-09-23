import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#0E1013",
          deep: "#0A0B0E",
          elevated: "#15181D",
          card: "#181B21",
        },
        line: {
          DEFAULT: "#242830",
          soft: "#1C1F26",
        },
        ink: {
          DEFAULT: "#E9ECEF",
          muted: "#8B93A0",
          faint: "#5B6270",
        },
        accent: {
          DEFAULT: "#3FD6C6",
          dim: "#2AA79B",
          bright: "#7EEFE2",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(2.75rem, 6vw, 6rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "h2": ["clamp(2rem, 4vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "h3": ["clamp(1.4rem, 2.4vw, 1.9rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        content: "72rem",
        prose: "40rem",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(63,214,198,0.08), transparent 60%)",
        "noise": "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.4%22/></svg>')",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
