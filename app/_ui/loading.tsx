import { cva, type VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";

import { cn } from "@/util/cn";

const loadingVariants = cva("[&>svg]:animate-spin flex items-center", {
  variants: {
    size: {
      default:
        "flex-col justify-center [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-muted-foreground [&>span]:font-medium space-y-4",
      sm: "text-sm text-muted-foreground [&>svg]:h-3 [&>svg]:w-3 [&>svg]:mr-2",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const Loading = ({
  text = "Loading...",
  className,
  size,
  ...props
}: { text?: string } & React.ComponentProps<"div"> &
  VariantProps<typeof loadingVariants>) => {
  return (
    <div className={cn(loadingVariants({ size }), className)} {...props}>
      <Loader2Icon />
      <span>{text}</span>
    </div>
  );
};

export { Loading };
