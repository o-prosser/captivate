import clsx from "clsx";

const Placeholder = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={clsx(
      "absolute p-4 bg-background/50 inset-0 flex flex-col items-center justify-center text-muted-foreground [&>svg]:h-6 [&>svg]:w-6",
      className,
    )}
    {...props}
  />
);

const Title = ({ className, ...props }: React.ComponentProps<"h4">) => (
  <h4
    className={clsx(
      "font-semibold brightness-50 dark:brightness-100 mt-3 mb-1",
      className,
    )}
    {...props}
  />
);

const Text = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p
    className={clsx(
      "text-sm brightness-75 text-center text-balance",
      className,
    )}
    {...props}
  />
);

Placeholder.Title = Title;
Placeholder.Text = Text;

export { Placeholder };
