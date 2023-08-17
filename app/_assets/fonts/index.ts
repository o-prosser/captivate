import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const openRunde = localFont({
  variable: "--font-headings",
  src: [
    {
      path: "./OpenRunde-Bold.woff2",
      weight: "bold",
      style: "normal",
    },
    {
      path: "./OpenRunde-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});

export const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});
