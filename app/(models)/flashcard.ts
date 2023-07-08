import { prisma } from "@/lib/prisma";

export const getFlashcard = async (id: string) => {
  return await prisma.flashcard.findUnique({
    where: {
      id,
    },
    include: {
      studies: true,
    },
  });
};

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
