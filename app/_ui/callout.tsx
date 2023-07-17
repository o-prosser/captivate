const Callout = ({
  emoji,
  children,
  ...props
}: { emoji: string } & React.ComponentProps<"div">) => {
  return (
    <div className="bg-muted space-x-2 font-medium rounded-2xl px-4 py-2 flex items-start leading-7 [&:not(:first-child)]:mt-6">
      <span>{emoji}</span>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export { Callout };
