import type { Config } from "tailwindcss";
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hoover: "var(--hoover-font), sans serif",
      },
      boxShadow: {
        "white-Glow": "0px 4px 40px 0px rgba(128, 128, 128, 0.25);",
        "faint-Glow": "0px 4px 20px 0px rgba(128, 128, 128, 0.25);",
      },
    },
  },
  plugins: [tailwindScrollbar({ nocompatible: true })],
} satisfies Config;
