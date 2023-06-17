import { cn } from "@/util";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const headingVariants = cva("scroll-m-20", {
  variants: {
    level: {
      1: "text-3xl font-bold lg:text-4xl",
      2: "text-2xl font-semibold [&:not(:first-child)]:mt-10",
      3: "text-xl font-semibold [&:not(:first-child)]:mt-8 -mb-4",
      4: "text-lg font-semibold tracking-tight [&:not(:first-child)]:mt-6 -mb-5",
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

export const BasicTable = ({
  center = false,
  ...props
}: React.ComponentProps<"table"> & { center?: boolean }) => (
  <div
    className={cn(
      "my-6 w-full overflow-y-auto",
      center ? "!text-center" : "text-left",
    )}
  >
    <table className="w-full" {...props} />
  </div>
);

export const TableRow = (props: React.ComponentProps<"tr">) => (
  <tr className="m-0 border-t p-0 even:bg-muted" {...props} />
);

export const TableHeading = (props: React.ComponentProps<"th">) => (
  <th className="border px-4 py-2 font-bold" {...props} />
);

export const TableCell = (props: React.ComponentProps<"td">) => (
  <td className="border px-4 py-2" {...props} />
);

export const OrderedList = ({ children }: React.ComponentProps<"ol">) => (
  <ol className="leading-7 [&:not(:first-child)]:mt-6 pl-4 [&>li:not(:first-child)]:mt-4 list-decimal marker:font-normal marker:text-muted-foreground [&>li]:pl-4  [&>li>ul]:!mt-0  [&>li>ol]:!mt-0">
    {children}
  </ol>
);

export const UnorderedList = ({ children }: React.ComponentProps<"ul">) => (
  <ul className="leading-7 [&:not(:first-child)]:mt-6 pl-4 [&>li:not(:first-child)]:mt-1 list-disc marker:font-normal marker:text-muted-foreground [&>li]:pl-4 [&>li:has(ul)]:!mt-0 [&>li>ul]:!mt-0 [&>li:has(ol)]:!mt-0 [&>li>ol]:!mt-0">
    {children}
  </ul>
);
