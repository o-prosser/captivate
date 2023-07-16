import localFont from "next/font/local";

// export const generalSans = localFont({
//   variable: "--font-sans",
//   src: [
//     {
//       path: "./fonts/GeneralSans-Bold.woff2",
//       weight: "bold",
//       style: "normal",
//     },
//     {
//       path: "./fonts/GeneralSans-BoldItalic.woff2",
//       weight: "bold",
//       style: "italic",
//     },
//     {
//       path: "./fonts/GeneralSans-Extralight.woff2",
//       weight: "200",
//       style: "normal",
//     },
//     {
//       path: "./fonts/GeneralSans-ExtraLightItalic.woff2",
//       weight: "200",
//       style: "italic",
//     },
//     {
//       path: "./fonts/GeneralSans-Italic.woff2",
//       weight: "400",
//       style: "italic",
//     },
//     {
//       path: "./fonts/GeneralSans-Light.woff2",
//       weight: "300",
//       style: "normal",
//     },
//     {
//       path: "./fonts/GeneralSans-LightItalic.woff2",
//       weight: "300",
//       style: "italic",
//     },
//     {
//       path: "./fonts/GeneralSans-Medium.woff2",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "./fonts/GeneralSans-MediumItalic.woff2",
//       weight: "500",
//       style: "italic",
//     },
//     {
//       path: "./fonts/GeneralSans-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./fonts/GeneralSans-Semibold.woff2",
//       weight: "600",
//       style: "normal",
//     },
//     {
//       path: "./fonts/GeneralSans-SemiboldItalic.woff2",
//       weight: "600",
//       style: "italic",
//     },
//   ],
// });

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
