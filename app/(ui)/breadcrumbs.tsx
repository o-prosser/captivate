import { cn } from "@/util";
import { ChevronRightIcon } from "lucide-react";
import { Fragment } from "react";

const Breadcrumbs = ({ pages }: { pages: string[] }) => {
  return (
    <div className="flex items-center space-x-1.5 text-muted-foreground text-sm mb-6">
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
