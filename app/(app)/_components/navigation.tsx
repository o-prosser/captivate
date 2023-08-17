"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/ui/button";

const Navigation = () => {
  const router = useRouter();

  return (
    <>
      <Button variant="ghost" size="icon" onClick={router.back}>
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={router.forward}
        className="md:!ml-0"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </>
  );
};

export default Navigation;
