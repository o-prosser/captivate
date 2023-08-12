import clsx from "clsx";

const Progress = ({ step }: { step: number }) => {
  return (
    <div className="my-6">
      <p className="text-sm font-medium text-muted-foreground">
        Step {step} of 5
      </p>
      <div className="grid grid-cols-5 mt-2 gap-2">
        {Array.from({ length: 5 }).map((_, key) => (
          <div
            key={key}
            className={clsx(
              "h-1.5 rounded-full",
              key + 1 <= 3 ? "bg-muted-foreground" : "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Progress;
