import clsx from "clsx";
import { AlertCircle } from "lucide-react";

const Title = ({ className, ...props }: React.ComponentProps<"h4">) => (
  <h4
    className={clsx("font-semibold brightness-50 dark:brightness-25 mt-3 mb-1")}
    {...props}
  />
);

const Icon = () => <AlertCircle className="h-6 w-6" />;

const Text = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p className={clsx("text-sm brightness-75", className)} {...props} />
);

const Error = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={clsx(
      "bg-destructive/20 rounded-2xl py-4 px-4 text-destructive",
      className,
    )}
    {...props}
  />
);

Error.Title = Title;
Error.Icon = Icon;
Error.Text = Text;

export { Error };
