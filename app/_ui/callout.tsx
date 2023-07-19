import { cn } from "@/util/cn";

const Callout = ({
  emoji,
  children,
  className,
  ...props
}: { emoji: string } & React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "bg-muted space-x-2 font-medium rounded-2xl px-4 py-2 flex items-start leading-7 [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    >
      <span>{emoji}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export { Callout };
