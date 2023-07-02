import { cn } from "@/util";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const pillVariants = cva(
  "rounded-full px-2 py-0.5 font-medium text-xs inline-flex mr-1 mt-1.5",
  {
    variants: {
      color: {
        muted: "bg-muted text-muted-foreground",
        maths: "bg-maths/10 text-maths",
        chemistry: "bg-chemistry/10 text-chemistry",
        physics: "bg-physics/10 text-physics",
      },
    },
    defaultVariants: {
      color: "muted",
    },
  },
);

const Pill = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span"> & VariantProps<typeof pillVariants>
>(({ className, color, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(pillVariants({ color }), className)}
      {...props}
    />
  );
});
Pill.displayName = "Pill";

export { Pill };
