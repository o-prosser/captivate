import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/util/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, ...props }, ref) => {
    const inputElement = (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-2xl border border-border bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );

    return Icon ? (
      <div className="relative [&>input]:!pl-9">
        <Icon className="ml-3 absolute h-4 w-4 mt-3 text-muted-foreground" />
        {inputElement}
      </div>
    ) : (
      inputElement
    );
  },
);
Input.displayName = "Input";

export { Input };
