"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

const Tabs = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={clsx("mb-6 flex print:hidden border-b", className)}
      {...props}
    />
  );
};

export const Tab = ({
  active,
  segment,
  children,
}: {
  active: boolean | string | null;
  segment?: string;
  children: React.ReactNode;
}) => {
  const selectedLayoutSegment = useSelectedLayoutSegment(segment);

  const isActive =
    typeof active === "boolean" ? active : selectedLayoutSegment === active;

  return (
    <Slot
      className={clsx(
        "mb-1.5 relative",
        isActive &&
          "after:bg-primary after:absolute after:h-0.5 after:w-[calc(100%-1rem)] after:mx-2 after:-bottom-[7px] after:inset-x-0 [&>svg]:!text-primary",
      )}
    >
      {children}
    </Slot>
  );
};

export default Tabs;
