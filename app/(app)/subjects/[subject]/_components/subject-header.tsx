"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/ui/button";
import * as Sheet from "@/ui/sheet";

const SubjectHeader = ({
  title,
  subTitle,
  links,
}: {
  title: string;
  subTitle: string;
  links: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setOpen(false);
  }, [router]);

  return (
    <nav className="fixed h-16 ml-1.5 top-0 left-36 flex items-center z-10 md:hidden print:!hidden">
      <Sheet.Root open={open} onOpenChange={setOpen}>
        <Sheet.Trigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="[&>svg]:h-5 [&>svg]:w-5"
          >
            <Menu />
          </Button>
        </Sheet.Trigger>
        <Sheet.Content side="left">
          <Sheet.Header>
            <Sheet.Title className="mb-0 capitalize">{title}</Sheet.Title>
            <Sheet.Description>{subTitle}</Sheet.Description>
          </Sheet.Header>

          {links}
        </Sheet.Content>
      </Sheet.Root>
    </nav>
  );
};

export default SubjectHeader;
