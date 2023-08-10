"use client";

import { useTransition } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Loader2, X } from "lucide-react";

import { Button } from "@/ui/button";

import { end } from "../actions";

const End = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const sessionId = searchParams.get("sessionId");

  if (typeof sessionId !== "string") return null;

  return (
    <Button
      onClick={() =>
        startTransition(() => end(sessionId, params.subject as string))
      }
      variant="ghost"
      size="icon"
      className="mr-11"
    >
      {isPending ? <Loader2 className="animate-spin" /> : <X />}
    </Button>
  );
};

export default End;
