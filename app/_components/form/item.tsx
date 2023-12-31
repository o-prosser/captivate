"use client";

import React from "react";

import { cn } from "@/util/cn";

export type ItemContextValue = {
  id: string;
};

export const ItemContext = React.createContext<ItemContextValue>(
  {} as ItemContextValue
);

export const Item = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <ItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </ItemContext.Provider>
  );
});
Item.displayName = "Item";
