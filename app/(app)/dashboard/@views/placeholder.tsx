import clsx from "clsx";

export const ViewPlaceholder = ({ animate = false }: { animate?: boolean }) => {
  return (
    <div
      className={clsx(
        "bg-muted rounded-2xl py-3 px-4 mb-2",
        animate && "animate-pulse",
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="h-4 my-1.5 w-28 bg-muted-foreground/20 rounded-lg" />
          <div className="h-3.5 mb-[3px] mt-[9px] w-32 bg-muted-foreground/20 rounded-lg" />
        </div>
        <div className="h-5 w-5 bg-muted-foreground/20 rounded-lg mr-1 mt-1.5" />
      </div>
      <div className="flex items-center justify-between mt-[14px]">
        <div className="h-3.5 my-[3px] w-28 bg-muted-foreground/20 rounded-lg" />
        <div className="h-4 w-20 bg-muted-foreground/20 rounded-lg mr-1" />
      </div>
    </div>
  );
};
