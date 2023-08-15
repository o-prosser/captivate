import { NextResponse } from "next/server";
import { flashcardGroupsTable, flashcardsTable } from "@/drizzle/schema";
import * as z from "zod";

import { db, eq } from "@/lib/db";

const routeContextSchema = z.object({
  params: z.object({
    groupId: z.string(),
  }),
});

const editFlashcardSchema = z.object({
  unit: z.string(),
  topic: z.string(),
  subject: z.string().min(1),
  flashcards: z.array(
    z.object({
      id: z.string().optional(),
      front: z.string(),
      back: z.string(),
    }),
  ),
});

export const PATCH = async (
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) => {
  try {
    const { params } = routeContextSchema.parse(context);

    const json = await req.json();
    const body = editFlashcardSchema.parse(json);

    // Flashcards already in DB
    const flashcardsToUpdate = body.flashcards.filter(
      (flashcard) => flashcard.id !== "" || flashcard.id !== null,
    );
    flashcardsToUpdate.forEach(async (flashcard) => {
      if (!flashcard.id)
        throw new Error(
          "No ID for flashcard set to update - this should never throw",
        );
      await db
        .update(flashcardsTable)
        .set({
          front: flashcard.front,
          back: flashcard.back,
        })
        .where(eq(flashcardsTable.id, flashcard.id));
    });

    // Flashcards deleted
    const allOldFlashcards = await db
      .select({ id: flashcardsTable.id })
      .from(flashcardsTable)
      .where(eq(flashcardsTable.groupId, params.groupId));

    const flashcardsToUpdateIds = flashcardsToUpdate.map((f) => f.id);

    // foreach allOldFlashcards, map over and see if it exists on a body.flashcards
    allOldFlashcards.forEach(async (oldFlashcard) => {
      if (!flashcardsToUpdateIds.includes(oldFlashcard.id))
        await db
          .delete(flashcardsTable)
          .where(eq(flashcardsTable.id, oldFlashcard.id));
    });

    // Flashcards not in DB
    const flashcardsToCreate = body.flashcards.filter(
      (flashcard) => flashcard.id === null || flashcard.id === "",
    );

    const flashcardGroup = await db
      .update(flashcardGroupsTable)
      .set({
        unit: parseInt(body.unit),
        topic: parseInt(body.topic),
      })
      .where(eq(flashcardGroupsTable.id, params.groupId));

    if (flashcardsToCreate.length > 0)
      await db.insert(flashcardsTable).values(
        flashcardsToCreate.map((flashcard) => ({
          groupId: params.groupId,
          front: flashcard.front,
          back: flashcard.back,
        })),
      );

    return NextResponse.json({ id: params.groupId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    throw error;
    return NextResponse.json(error, { status: 500 });
  }
};
