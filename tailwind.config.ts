import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import shadcnPlugin from "./shadcn-tailwindcss";

export default {
  content: ["./app/**/*.{tsx,ts,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        "below-md": {
          raw: "(max-width: 767px)",
        },
      },
    },
  },
  plugins: [shadcnPlugin, tailwindcssAnimate],
} satisfies Config;
