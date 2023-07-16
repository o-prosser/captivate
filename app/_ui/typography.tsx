import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import GithubSlugger from "github-slugger";
import { twMerge } from "tailwind-merge";

import { cn } from "@/util/cn";

const headingVariants = cva("scroll-m-20", {
  variants: {
    level: {
      1: "text-3xl font-semibold lg:text-4xl [&:not(:first-child)]:mt-5 print:!text-[40px] print:!leading-[36px] print:text-primary",
      2: "text-2xl font-semibold [&:not(:first-child)]:mt-10 print:!text-[32px] print:text-primary",
      3: "text-xl font-semibold [&:not(:first-child)]:pt-8 -mb-4 print:!uppercase print:!text-[19px] print:!text-background print:!bg-primary/80 print:!py-0 print:mt-8",
      4: "text-lg font-semibold tracking-tight [&:not(:first-child)]:pt-6 -mb-5",
    },
  },
  defaultVariants: {
    level: 1,
  },
});

interface HeadingProps
  extends React.ComponentProps<"h1">,
    VariantProps<typeof headingVariants> {
  link?: boolean;
}

export const Heading = ({
  level,
  link = false,
  className,
  children,
  ...props
}: HeadingProps) => {
  const Component = `h${level || 1}`;

  if (link) {
    const slugs = new GithubSlugger();

    return (
      // @ts-expect-error
      <Component
        className={twMerge(headingVariants({ level }), className)}
        {...props}
        id={slugs.slug(children?.toString() || "")}
      >
        {children}
      </Component>
    );
  }

  return (
    // @ts-expect-error
    <Component
      className={twMerge(headingVariants({ level }), className)}
      {...props}
    >
      {children}
    </Component>
  );

  // if (level == 1) return <h1 {...headingProps} />;
  // if (level == 2) return <h2 {...headingProps} />;
  // if (level == 3) return <h3 {...headingProps} />;
  // if (level == 4) return <h4 {...headingProps} />;
  // if (!level) return <h1 {...headingProps} />;
};

export const Text = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p
    className={twMerge("leading-7 [&:not(:first-child)]:mt-6", className)}
    {...props}
  />
);

export const BasicTable = ({
  center = false,
  className,
  ...props
}: React.ComponentProps<"table"> & { center?: boolean }) => (
  <div
    className={cn(
      "my-6 w-full overflow-y-auto",
      center ? "!text-center" : "text-left"
    )}
  >
    <table className={twMerge("w-full", className)} {...props} />
  </div>
);

export const TableRow = ({
  className,
  ...props
}: React.ComponentProps<"tr">) => (
  <tr
    className={twMerge("m-0 border-t p-0 even:bg-muted/50", className)}
    {...props}
  />
);

export const TableHeading = (props: React.ComponentProps<"th">) => (
  <th className="border px-4 py-2 font-semibold" {...props} />
);

export const TableCell = ({
  className,
  ...props
}: React.ComponentProps<"td">) => (
  <td className={twMerge("border px-4 py-2", className)} {...props} />
);

export const OrderedList = ({ children }: React.ComponentProps<"ol">) => (
  <ol className="leading-7 [&:not(:first-child)]:mt-6 pl-4 [&>li:not(:first-child)]:mt-4 list-decimal marker:font-normal marker:text-muted-foreground [&>li]:pl-4  [&>li>ul]:!mt-0  [&>li>ol]:!mt-0">
    {children}
  </ol>
);

export const UnorderedList = ({ children }: React.ComponentProps<"ul">) => (
  <ul className="leading-7 [&:not(:first-child)]:mt-6 pl-4 list-disc marker:font-normal marker:text-muted-foreground [&>li]:pl-4 [&>li>ul]:!mt-0">
    {children}
  </ul>
);

export const Columns = ({
  left,
  children,
  ...props
}: { left: React.ReactNode } & React.ComponentProps<"div">) => (
  <div className="flex mt-4 leading-7" {...props}>
    <div className="mr-4 [&>p:not(:first-child)]:!mt-1">{left}</div>
    <div className="[&>p:not(:first-child)]:!mt-1">{children}</div>
  </div>
);
