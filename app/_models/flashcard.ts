import { prisma } from "@/app/_lib/prisma";
import { StudyScope } from "@prisma/client";

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

const getScope = async ({
  type,
  id,
  science,
}: {
  type: StudyScope;
  id?: string | null;
  science: {
    units: {
      number: number;
      name: string;
      topics: string[];
    }[];
  };
}) => {
  if (!id) return { scope: null, type: null };

  if (type === "Group") {
    const group = await prisma.flashcardGroup.findUnique({
      where: { id },
      include: {
        _count: {
          select: { flashcards: true },
        },
      },
    });

    if (!group) return { scope: null, type: null };

    return {
      scope: {
        title: science.units[group.unit - 1].topics[group.topic - 1],
        ...group,
      },
      type: "Group",
    };
  }

  return { scope: null, type: null };
};

export { getFlashcard, getScore, getScope };
