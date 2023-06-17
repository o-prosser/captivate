import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/util";
import { Loader2Icon } from "lucide-react";

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
          "border border-input hover:bg-muted hover:text-muted-foreground",
        ghost:
          "hover:bg-muted [&>svg]:text-muted-foreground [&.group:hover>svg]:text-foreground [&>svg]:transition-colours",
        link: "underline-offset-4 hover:underline text-primary !h-auto !p-1 -m-1 text-base focus-visible:!ring-offset-0",
      },
      size: {
        default: "h-10 [&>svg]:h-4 [&>svg]:w-4",
        sm: "h-9 px-3 rounded-xl",
        lg: "h-11 px-8 rounded-3xl",
      },
      pending: {
        true: "",
        false: "disabled:opacity-50",
      },
      iconOnly: {
        true: "",
        false: "[&>svg]:mr-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      iconOnly: false,
    },
    compoundVariants: [
      {
        iconOnly: true,
        size: "default",
        className: "p-3",
      },
      {
        iconOnly: false,
        size: "default",
        className: "py-2 px-4",
      },
    ],
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
    {
      className,
      variant,
      size,
      iconOnly,
      asChild = false,
      pending,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return asChild ? (
      <Slot
        className={cn(
          buttonVariants({ variant, size, pending, iconOnly }),
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Slot>
    ) : (
      <button
        className={cn(
          buttonVariants({ variant, size, pending, iconOnly }),
          className,
        )}
        ref={ref}
        disabled={pending}
        {...props}
      >
        {pending ? (
          <div className="absolute rounded-xl inset-0 grid place-items-center bg-white/50">
            <Loader2Icon className="animate-spin" />
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
