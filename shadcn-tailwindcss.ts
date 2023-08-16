import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const shadcnPlugin = plugin(
  ({ addBase, addUtilities }) => {
    addBase({
      ":root": {
        "--background": "0 0% 255%", // white
        "--foreground": "240 10% 4%", // zinc-950
        "--muted": "0 0% 98%", // zinc-100
        "--muted-foreground": "240 4% 46%", // zinc-500
        "--primary": "226 56% 35%", // primary-7
        "--primary-foreground": "0 0% 98%", // zinc-50
        "--success": "153 51.8% 21.8%", // green-7,
        "--success-foreground": "137 72.0% 94.0%", // green-12
        "--destructive": "8 71% 50%", // red
        "--destructive-foreground": "0 0% 98%", // zinc-50
        "--border": "240 6% 90%", // zinc-200
        "--ring": "var(--primary)",
        "--maths": "358 75% 59%", // red9
        "--chemistry": "292 45% 51%", // plum9
        "--physics": "190 95% 39%", // cyan9
      },
      ".dark": {
        "--background": "240 10% 4%", // zinc-950
        "--foreground": "0 0% 255%", // white
        "--muted": "240 6% 10%", // zinc-800
        "--muted-foreground": "240 4% 46%", // zinc-500
        "--primary": "226 56% 35%", // primary-7
        "--primary-foreground": "0 0% 98%", // zinc-50
        "--destructive": "8 71% 50%", // red
        "--destructive-foreground": "240 10% 4%", // zinc-950
        "--border": "240 4% 16%", // zinc-800
        "--ring": "var(--primary)",
        // "--maths": "358 65% 49%", // red11
        // "--chemistry": "92 60% 43%", // plum11
        // "--physics": "192 85% 31%", // cyan11
      },
    });

    addUtilities({
      ".text-wrap": { "text-wrap": "wrap" },
      ".text-nowrap": { "text-wrap": "nowrap" },
      ".text-balance": { "text-wrap": "balance" },
    });
  },
  {
    theme: {
      extend: {
        fontFamily: {
          headings: ["var(--font-headings)", ...fontFamily.sans],
          sans: [
            ["var(--font-sans)", ...fontFamily.sans],
            {
              fontFeatureSettings: "'salt' on",
            },
          ],
        },
        borderColor: ({ theme }) => ({
          DEFAULT: theme("colors.border"),
        }),
        colors: {
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          success: {
            DEFAULT: "hsl(var(--success))",
            foreground: "hsl(var(--success-foreground))",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          border: "hsl(var(--border))",
          ring: "hsl(var(--primary))",
          maths: "hsl(var(--maths))",
          chemistry: "hsl(var(--chemistry))",
          physics: "hsl(var(--physics))",
          subject: "hsl(var(--subject))",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
      },
    },
  },
);

export default shadcnPlugin;
