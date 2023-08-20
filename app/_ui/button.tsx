import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/util/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-2xl text-sm font-medium transition-colors font-sans relative group",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-muted/50 hover:bg-muted hover:text-muted-foreground",
        ghost:
          "hover:bg-muted [&>svg]:text-muted-foreground [&.group:hover>svg]:text-foreground [&>svg]:transition-colours",
        link: "underline-offset-4 hover:underline text-primary !h-auto !p-1 -m-1 text-base focus-visible:!ring-offset-0",
        arrow:
          "!h-auto !p-1 -m-1 text-base focus-visible:!ring-offset-0 [&>svg]:ml-2 [&:hover>svg]:translate-x-1 [&>svg]:transition-all",
      },
      size: {
        default: "h-10 [&>svg]:h-4 [&>svg]:w-4 gap-2 py-2 px-4",
        xs: "h-7 px-2 rounded-xl [&>svg]:h-3 [&>svg]:h-3 gap-2 text-xs",
        sm: "h-9 px-3 rounded-2xl [&>svg]:h-4 [&>svg]:w-4 gap-2",
        lg: "h-11 px-8 rounded-3xl",
        icon: "h-10 w-10 [&>svg]:h-4 [&>svg]:w-4",
      },
      pending: {
        true: "",
        false: "disabled:opacity-50",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  pending?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, pending, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return asChild ? (
      <Slot
        className={cn(buttonVariants({ variant, size, pending }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Slot>
    ) : (
      <button
        className={cn(buttonVariants({ variant, size, pending }), className)}
        ref={ref}
        disabled={pending}
        {...props}
      >
        {pending ? (
          <div className="absolute rounded-xl inset-0 grid place-items-center bg-white/50">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          ""
        )}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
