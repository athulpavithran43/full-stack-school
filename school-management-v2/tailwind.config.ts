import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lamaSky: "#4A90E2",
        lamaSkyLight: "#E3F2FD",
        lamaGreen: "#7ED321",
        lamaGreenLight: "#F0F9E8",
        lamaRed: "#D0021B",
        lamaRedLight: "#FFEBEE",
        lamaYellow: "#F5A623",
        lamaYellowLight: "#FFF8E1",
        lamaPurple: "#9013FE",
        lamaPurpleLight: "#F3E5F5",
        lamaGray: "#9B9B9B",
        lamaGrayLight: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
export default config;