import { prisma } from "@/lib/prisma";

export const createFlashcardStudy = async (data: {
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

export const SCORES = [
  "⏩ Skipped",
  "❌ Forgot",
  "😬 Partially recalled",
  "😄 Recalled with effort",
  "👑 Easily recalled",
];
