import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // saas.group primary accent — cinnabar
        brand: {
          50:  "#FDE8E3",
          100: "#FAD0C4",
          200: "#F5A98F",
          300: "#EE7D5C",
          400: "#F2622E",
          500: "#F04E23",
          600: "#F04E23",
          700: "#C44220",
          800: "#9E3418",
          900: "#7C2913",
        },
        // warm neutral palette — replaces slate with saas.group tones
        slate: {
          50:  "#F5F4F2",
          100: "#EDECEA",
          200: "#E8E6E2",
          300: "#D8D5D0",
          400: "#A8A49E",
          500: "#6B6760",
          600: "#6B6760",
          700: "#4A4742",
          800: "#2E2B27",
          900: "#2E2B27",
          950: "#1A1816",
        },
        // saas.group extended design tokens
        "sg-indigo":       "#7B6FCC",
        "sg-magenta":      "#B57DC8",
        "sg-bitter":       "#D95B6F",
        "sg-green":        "#0e7d51",
        "sg-ai":           "#EDE9FC",
        "sg-ai-text":      "#5B52B0",
        "sg-callout":      "#FDE8E3",
        "sg-callout-text": "#C44220",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
