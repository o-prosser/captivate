import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import shadcnPlugin from "./shadcn-tailwindcss";

export default {
  content: ["./app/**/*.{tsx,mdx}"],
  darkMode: "class",
  plugins: [shadcnPlugin, tailwindcssAnimate],
} satisfies Config;
