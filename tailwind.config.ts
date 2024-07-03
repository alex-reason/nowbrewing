import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      "heading1": [
        "3rem",
        {
          lineHeight: "100%",
          fontWeight: "400",
        },
      ],
      "heading2": [
        "2rem",
        {
          lineHeight: "100%",
          fontWeight: "500",
        },
      ],
      "heading3-bold": [
        "1.6rem",
        {
          lineHeight: "100%",
          fontWeight: "700",
        },
      ],
      "heading4-bold": [
        "1.5rem",
        {
          lineHeight: "100%",
          fontWeight: "700",
        },
      ],
      "body-bold": [
        "1.2rem",
        {
          lineHeight: "100%",
          fontWeight: "700",
        },
      ],
      "body-semibold": [
        "1.2rem",
        {
          lineHeight: "100%",
          fontWeight: "600",
        },
      ],
      "body-medium": [
        "1.2rem",
        {
          lineHeight: "100%",
          fontWeight: "500",
        },
      ],
      "base-bold": [
        "1rem",
        {
          lineHeight: "100%",
          fontWeight: "600",
        },
      ],
      "base-medium": [
        "1rem",
        {
          lineHeight: "100%",
          fontWeight: "500",
        },
      ],
      "small": [
        "0.8rem",
        {
          lineHeight: "140%",
        },
      ],  
      "small-medium": [
        "14px",
        {
          lineHeight: "140%",
          fontWeight: "500",
        },
      ],
    },
    extend: {
      colors: {
        "white-1": "#F8F8F8",
        "grey-1": "#616161",
        "grey-2": "#f0f0f0",
        "grey-3": "#7a7a7a",
        "blue-1": "#005EBE",
        "blue-2": "#E9F5FE",
        "blue-3": "#F5F7F9",
        "blue-4": "#0E46A3",
        "red-1": "#FF0000",
        "red-2": "#DD5746",
        "lightblue-1": "#EEF7FF",
        "lightblue-2": "#CDE8E5",
        "black-1": "#242424"
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;