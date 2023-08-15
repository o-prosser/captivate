import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/util/cn";

const pillVariants = cva(
  "rounded-full px-2 py-px font-medium text-xs uppercase inline-flex mr-1 mt-1.5",
  {
    variants: {
      color: {
        muted: "bg-muted text-muted-foreground",
        maths: "bg-maths/10 text-maths",
        chemistry: "bg-chemistry/10 text-chemistry",
        physics: "bg-physics/10 text-physics",
      },
      fill: {
        muted: "bg-muted text-muted-foreground",
        maths: "bg-maths/10 text-maths",
        chemistry: "bg-chemistry/10 text-chemistry",
        physics: "bg-physics/10 text-physics",
        subject: "bg-subject/10 text-subject",
      },
      outline: {
        muted: "border-muted text-muted-foreground",
        maths: "border-maths text-maths",
        chemistry: "border-chemistry text-chemistry",
        physics: "border-physics text-physics",
        subject: "border border-subject text-subject",
      },
    },
    defaultVariants: {
      color: "muted",
      fill: null,
      outline: null,
    },
  },
);

const Pill = React.forwardRef<
  HTMLSpanElement,
  Omit<React.ComponentPropsWithoutRef<"span">, "color"> &
    VariantProps<typeof pillVariants>
>(({ className, color, outline, fill, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(pillVariants({ color, outline, fill }), className)}
      {...props}
    />
  );
});
Pill.displayName = "Pill";

export { Pill };
