import * as React from "react";

import { cn } from "@/util/cn";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    [key: string]: string;
  };
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-10 w-full rounded-2xl border border-border bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      >
        {Object.entries(options).map((option) => (
          <option
            value={option[0] === "DEFAULT" ? "" : option[0]}
            key={option[0]}
          >
            {option[1]}
          </option>
        ))}
      </select>
    );
  },
);
Select.displayName = "Select";

export { Select };
