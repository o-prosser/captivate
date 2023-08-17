"use client";

import { usePathname } from "next/navigation";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

const ActiveLink = ({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <Slot
      data-active={pathname.startsWith(active)}
      className={clsx(
        pathname.startsWith(active) && "bg-muted [&>svg]:!text-foreground",
      )}
    >
      {children}
    </Slot>
  );
};

export default ActiveLink;
