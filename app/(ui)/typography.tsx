import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const headingVariants = cva("scroll-m-20", {
  variants: {
    level: {
      1: "text-3xl font-bold lg:text-4xl",
      2: "text-2xl font-semibold",
      3: "text-xl font-semibold",
      4: "text-lg font-semibold tracking-tight",
    },
  },
  defaultVariants: {
    level: 1,
  },
});

interface HeadingProps
  extends React.ComponentProps<"h1">,
    VariantProps<typeof headingVariants> {}

export const Heading = ({ level, className, ...props }: HeadingProps) => {
  const headingProps = {
    className: twMerge(headingVariants({ level }), className),
    ...props,
  };

  if (level == 1) return <h1 {...headingProps} />;
  if (level == 2) return <h2 {...headingProps} />;
  if (level == 3) return <h3 {...headingProps} />;
  if (level == 4) return <h4 {...headingProps} />;
  if (!level) return <h1 {...headingProps} />;
};

export const Text = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p
    className={twMerge("leading-7 [&:not(:first-child)]:mt-6", className)}
    {...props}
  />
);
