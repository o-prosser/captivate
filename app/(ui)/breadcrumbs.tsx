import { cn } from "@/util";
import { ChevronRightIcon } from "lucide-react";
import { Fragment } from "react";

const Breadcrumbs = ({ pages }: { pages: string[] }) => {
  const hasSidebar = pages.find(
    (page) => page === "Physics" || page === "Chemistry" || page === "Maths",
  );

  return (
    <div
      className={cn(
        "flex items-center space-x-1.5 text-muted-foreground text-sm",
        hasSidebar
          ? "fixed md:static md:mb-3 top-16 h-12 md:h-auto left-14 z-[11]"
          : "mb-2",
      )}
    >
      {pages.map((page, key) => (
        <Fragment key={key}>
          <span
            className={cn(
              pages.length == key + 1 && "text-foreground font-medium",
            )}
          >
            {page}
          </span>
          {pages.length !== key + 1 && <ChevronRightIcon className="h-3 w-3" />}
        </Fragment>
      ))}
    </div>
  );
};

export { Breadcrumbs };
