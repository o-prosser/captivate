import { prisma } from "@/app/_lib/prisma";

const createFlashcardStudy = async (data: {
  flashcardId: string;
  sessionId: string;
  score: number;
}) => {
  return await prisma.flashcardStudy.create({
    data,
    select: {
      id: true,
    },
  });
};

const SCORES = [
  "⏩ Skipped",
  "❌ Forgot",
  "😬 Partially recalled",
  "😄 Recalled with effort",
  "👑 Easily recalled",
];

export { createFlashcardStudy, SCORES };
