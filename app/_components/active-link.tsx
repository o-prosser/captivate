"use client";

import { usePathname } from "next/navigation";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

const ActiveLink = ({
  active,
  children,
  match = "startsWith",
}: {
  active: string;
  children: React.ReactNode;
  match?: "startsWith" | "includes" | "equals";
}) => {
  const pathname = usePathname();

  const isActive =
    match === "startsWith"
      ? pathname.startsWith(active)
      : match === "includes"
      ? pathname.includes(active)
      : pathname === active;

  return (
    <Slot
      data-active={isActive}
      className={clsx(isActive && "bg-muted [&>svg]:!text-foreground")}
    >
      {children}
    </Slot>
  );
};

export default ActiveLink;
