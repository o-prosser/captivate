import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import shadcnPlugin from "./shadcn-tailwindcss";

export default {
  content: ["./app/**/*.tsx"],
  darkMode: "class",
  plugins: [tailwindcssAnimate, shadcnPlugin],
} satisfies Config;
