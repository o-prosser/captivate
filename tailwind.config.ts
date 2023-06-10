import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: ["./app/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
      },
      borderColor: ({ theme }) => ({
        DEFAULT: theme("colors.border"),
      }),
      colors: {
        base: {
          background: "hsl(var(--background) / <alpha-value>)",
          foreground: "hsl(var(--foreground) / <alpha-value>)",
        },
        muted: {
          background: "hsl(var(--muted-background) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        primary: {
          accent: "hsl(var(--primary-accent) / <alpha-value>)",
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
