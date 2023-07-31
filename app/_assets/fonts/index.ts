import localFont from "next/font/local";

export const openRunde = localFont({
  variable: "--font-sans",
  src: [
    {
      path: "./OpenRunde-Bold.woff2",
      weight: "bold",
      style: "normal",
    },

    {
      path: "./OpenRunde-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./OpenRunde-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./OpenRunde-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});

export const generalSans = localFont({
  display: "swap",
  variable: "--font-sans",
  src: [
    {
      path: "./GeneralSans-Variable.ttf",
      style: "normal",
    },
    {
      path: "./GeneralSans-VariableItalic.ttf",
      style: "italic",
    },
  ],
});
