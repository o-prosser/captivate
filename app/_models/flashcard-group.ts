import { cache } from "react";
import type { FlashcardGroup } from "@/drizzle/schema";

import { db } from "@/lib/db";

export const selectFlashcardGroups = cache(
  async ({ subject }: { subject?: string }) => {
    const flashcardGroups = await db.query.flashcardGroupsTable.findMany({
      where: (fields, { eq }) =>
        subject ? eq(fields.subjectId, subject) : undefined,
      columns: {
        id: true,
        unit: true,
        topic: true,
      },
      with: {
        flashcards: {
          columns: {
            id: true,
          },
        },
      },
    });

    return flashcardGroups;
  },
);

export const selectFlashcardGroup = cache(
  async ({ id }: { id: FlashcardGroup["id"] }) => {
    const flashcardGroup = await db.query.flashcardGroupsTable.findFirst({
      where: (fields, { eq }) => eq(fields.id, id),
      columns: {
        id: true,
        unit: true,
        topic: true,
      },
      with: {
        flashcards: {
          with: {
            studies: true,
          },
        },
      },
    });

    return flashcardGroup;
  },
);
