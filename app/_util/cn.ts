import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const createVar = (vars: { [key: string]: string }) => {
  return vars as React.CSSProperties;
};
