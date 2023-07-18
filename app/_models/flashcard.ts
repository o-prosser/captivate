import { Flashcard, FlashcardGroup, StudyScope, Subject } from "@prisma/client";

import { getSubject, getSubjectEnum } from "@/util/subjects";
import { prisma } from "@/app/_lib/prisma";

const getFlashcard = async (id: string) => {
  return await prisma.flashcard.findUnique({
    where: {
      id,
    },
    include: {
      studies: true,
    },
  });
};

const getScore = (score: number) => {
  const scores = [
    "Skipped",
    "Forgot",
    "Partially recalled",
    "Recalled with effort",
    "Easily recalled",
  ];

  return scores[score - 1];
};

const getScope = async (session: {
  scope: StudyScope;
  group?: (FlashcardGroup & { flashcards: Flashcard[] }) | null;
  unit?: number | null;
  subject?: Subject | null;
}) => {
  const subject = session.subject
    ? getSubject(session.subject)
    : session.group?.subject
    ? getSubject(session.group.subject)
    : undefined;

  if (session.scope === "Group") {
    if (!session.group)
      throw new Error("Group must be provided when using a unit type");

    return {
      title:
        subject?.units[session.group.unit - 1].topics[session.group.topic - 1],
      ...session.group,
    };
  }
  if (session.scope === "Unit") {
    if (!session.subject)
      throw new Error("Subject must be provided when using a unit type");
    if (!session.unit)
      throw new Error("Unit must be provided when using a unit type");

    const flashcards = await prisma.flashcard.findMany({
      where: {
        group: {
          is: {
            subject: session.subject,
            unit: session.unit,
          },
        },
      },
    });

    return { title: subject?.units[session.unit - 1].name, flashcards };
  }
  if (session.scope === "Subject") {
    if (!session.subject)
      throw new Error("Subject must be provided when using a unit type");

    const flashcards = await prisma.flashcard.findMany({
      where: {
        group: {
          is: {
            subject: session.subject,
          },
        },
      },
    });

    return { title: session.subject, flashcards };
  }

  return undefined;
};

export { getFlashcard, getScore, getScope };
