"use client";

import { useTransition } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Loader2Icon, XIcon } from "lucide-react";

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
        startTransition(() => end(sessionId, params.science as string))
      }
      variant="ghost"
      size="icon"
      className="mr-11"
    >
      {isPending ? <Loader2Icon className="animate-spin" /> : <XIcon />}
    </Button>
  );
};

export default End;
