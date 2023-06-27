"use client";

import { Button } from "@/ui";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="ghost"
      className="-ml-3"
      size="sm"
    >
      <ArrowLeftIcon />
      Back
    </Button>
  );
};
