import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import shadcnPlugin from "./shadcn-tailwindcss";
import plugin from "tailwindcss/plugin";

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
  plugins: [
    shadcnPlugin,
    tailwindcssAnimate,
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          area: (value) => ({
            gridArea: value,
          }),
        },
        { values: theme("gridArea") },
      );
    }),
  ],
} satisfies Config;
