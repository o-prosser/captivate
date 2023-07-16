"use client";

import { Flashcard, FlashcardStudy } from "@prisma/client";
import format from "date-fns/format";
import { InfoIcon } from "lucide-react";

import { Button } from "@/ui/button";
import * as Dialog from "@/ui/dialog";

export const getScore = (score: number) => {
  const scores = [
    "Skipped",
    "Forgot",
    "Partially recalled",
    "Recalled with effort",
    "Easily recalled",
  ];

  return scores[score - 1];
};

const Information = ({
  flashcard,
}: {
  flashcard: Flashcard & {
    studies: FlashcardStudy[];
  };
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon">
          <InfoIcon />
          <span className="sr-only">Information</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Flashcard statistics</Dialog.Title>
          <Dialog.Description>
            Information about your flashcard.
          </Dialog.Description>
        </Dialog.Header>
        <div className="divide-y">
          {flashcard.studies.map((study, key) => (
            <div key={key} className="flex items-center justify-between py-2">
              <p className="text-sm font-medium">
                {format(study.createdAt, "dd/LL/Y HH:mm")}
              </p>
              <p className="text-muted-foreground text-sm">
                {getScore(study.score)}
              </p>
            </div>
          ))}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export { Information };
