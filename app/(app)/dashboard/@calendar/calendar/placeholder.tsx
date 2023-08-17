import clsx from "clsx";

export const EventPlaceholder = ({
  animate = false,
}: {
  animate?: boolean;
}) => {
  return (
    <div
      className={clsx(
        "bg-muted rounded-2xl py-3 px-4 mb-2",
        animate && "animate-pulse",
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="h-4 my-1.5 w-40 bg-muted-foreground/20 rounded-lg" />
          <div className="h-3.5 my-[3px] w-32 bg-muted-foreground/20 rounded-lg" />
        </div>
        <div className="h-3 w-28 bg-muted-foreground/20 rounded-lg" />
      </div>
    </div>
  );
};
