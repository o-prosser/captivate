import plugin from "tailwindcss/plugin";
import { fontFamily } from "tailwindcss/defaultTheme";

const shadcnPlugin = plugin(
  ({ addBase }) => {
    addBase({
      ":root": {
        "--background": "0 0% 255%", // white
        "--foreground": "229 84% 5%", // slate-950
        "--muted": "210 40% 96%", // slate-100
        "--muted-foreground": "215 16% 47%", // slate-500
        "--primary": "226 56% 35%", // primary-7
        "--primary-foreground": "210 40% 98%", // slate-50
        "--destructive": "8 71% 50%", // red
        "--destructive-foreground": "210 40% 98%", // slate-50
        "--border": "214 32% 91%", // slate-200
        "--ring": "var(--primary)",
        "--maths": "358 75% 59%", // red9
        "--chemistry": "292 45% 51%", // plum9
        "--physics": "190 95% 39%", // cyan9
      },
      ".dark": {
        "--background": "229 84% 5%", // slate-950
        "--foreground": "0 0% 255%", // white
        "--muted": "219 33% 17%", // slate-800
        "--muted-foreground": "215 16% 47%", // slate-500
        "--primary": "226 56% 35%", // primary-7
        "--primary-foreground": "210 40% 98%", // slate-50
        "--destructive": "8 71% 50%", // red
        "--destructive-foreground": "229 84% 5%", // slate-950
        "--border": "217 33% 17%", // slate-800
        "--ring": "var(--primary)",
      },
    });
  },
  {
    theme: {
      extend: {
        fontFamily: {
          sans: [
            ["var(--font-sans)", ...fontFamily.sans],
            {
              fontFeatureSettings: "'ss01' on",
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
          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },
          border: "hsl(var(--border))",
          ring: "hsl(var(--ring))",
          maths: "hsl(var(--maths))",
          chemistry: "hsl(var(--chemistry))",
          physics: "hsl(var(--physics))",
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
