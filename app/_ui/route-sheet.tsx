"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import * as Sheet from "@/ui/sheet";

export const RouteSheet = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const onClose = () => {
    setOpen(false);
    setTimeout(() => router.back(), 300);
  };

  return (
    <Sheet.Root defaultOpen={open} open={open} onOpenChange={onClose}>
      <Sheet.Content>{children}</Sheet.Content>
    </Sheet.Root>
  );
};
