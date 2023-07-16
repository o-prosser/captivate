"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/ui/button";

const MarkdownLink = ({ href, ref, ...props }: React.ComponentProps<"a">) => {
  const pathname = usePathname();

  return (
    <Button asChild variant="link" size={null}>
      <Link
        href={href?.includes("/") ? href : `${pathname}/${href}` || ""}
        {...props}
      />
    </Button>
  );
};

export { MarkdownLink };
