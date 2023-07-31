"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { EyeIcon } from "lucide-react";

import { cn } from "@/util/cn";
import { Button } from "@/ui/button";
import { Pill } from "@/ui/pill";

const ScoreButton = ({
  emoji,
  score,
  time,
  label,
  id,
  className,
}: {
  emoji: string;
  score: number;
  time: string;
  label: string;
  id: string;
  className: string;
}) => {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  const setScore = async () => {
    const response = await fetch(
      `/api/flashcard-sessions/${searchParams.get("sessionId")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flashcardId: id,
          score,
        }),
      }
    );

    if (!response.ok) return;

    const data = await response.json();

    if (data.summary == true) {
      router.push(
        `/subjects/${params.subject}/flashcards/summary/${searchParams.get(
          "sessionId"
        )}`
      );
    } else {
      router.push(
        `/subjects/${params.subject}/flashcards/practise/${
          data.next
        }?sessionId=${searchParams.get("sessionId")}`
      );
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === score.toString()) setScore();
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [score]);

  return (
    <Button
      variant="outline"
      onClick={setScore}
      className={cn("flex-col h-auto", className)}
    >
      <span className="text-2xl pb-1">{emoji}</span>
      <span className="pb-1">{label}</span>
      <Pill className="mr-0">{time}</Pill>
    </Button>
  );
};

const Flashcard = ({
  flashcard,
  back,
}: {
  flashcard: { id: string; back: string; front: string };
  back: React.ReactNode;
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      {show ? (
        <>
          <div className="border rounded-2xl border-dashed w-full p-6 min-h-[8rem]">
            {back}
          </div>
          <div className="grid grid-cols-6 md:grid-cols-5 mt-6 gap-2">
            <ScoreButton
              emoji="⏩"
              score={1}
              time="1 hour"
              label="Skip"
              id={flashcard.id}
              className="col-span-3 sm:col-span-2 md:col-span-1"
            />
            <ScoreButton
              emoji="❌"
              score={2}
              time="later today"
              label="Forgot"
              id={flashcard.id}
              className="col-span-3 sm:col-span-2 md:col-span-1"
            />
            <ScoreButton
              emoji="😬"
              score={3}
              time="30 mins"
              label="Partially recalled"
              id={flashcard.id}
              className="col-span-3 sm:col-span-2 md:col-span-1"
            />
            <ScoreButton
              emoji="😄"
              score={4}
              time="24 hours"
              label="Recalled with effort"
              id={flashcard.id}
              className="col-span-3 sm:col-span-3 md:col-span-1"
            />
            <ScoreButton
              emoji="👑"
              score={5}
              time="4 days"
              label="Easily recalled"
              id={flashcard.id}
              className="col-span-6 sm:col-span-3 md:col-span-1"
            />
          </div>
        </>
      ) : (
        <Button
          type="button"
          className="w-full mt-6"
          onClick={() => setShow(true)}
        >
          <EyeIcon />
          Show answer
        </Button>
      )}
    </>
  );
};

export default Flashcard;
