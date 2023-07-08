"use client";

import { end } from "@/actions/flashcard-study-sessions";
import { Button } from "@/ui";
import { Loader2Icon, XIcon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const End = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const sessionId = searchParams.get("sessionId");

  if (typeof sessionId !== "string") return null;

  return (
    <Button
      onClick={() => startTransition(() => end(sessionId, params.science))}
      variant="ghost"
      size="icon"
      className="mr-11"
    >
      {isPending ? <Loader2Icon className="animate-spin" /> : <XIcon />}
    </Button>
  );
};

export default End;
