import { flashcardStudiesTable, FlashcardStudy } from "@/drizzle/schema";

import { db } from "@/lib/db";

const createFlashcardStudy = async (data: {
  flashcardId: FlashcardStudy["flashcardId"];
  sessionId: FlashcardStudy["sessionId"];
  score: FlashcardStudy["score"];
}) => {
  return await db
    .insert(flashcardStudiesTable)
    .values(data)
    .returning({ id: flashcardStudiesTable.id });
};

const SCORES = [
  "⏩ Skipped",
  "❌ Forgot",
  "😬 Partially recalled",
  "😄 Recalled with effort",
  "👑 Easily recalled",
];

export { createFlashcardStudy, SCORES };
