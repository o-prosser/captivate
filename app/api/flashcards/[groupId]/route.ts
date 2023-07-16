import { NextResponse } from "next/server";
import * as z from "zod";

import { prisma } from "@/lib/prisma";

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
    })
  ),
});

export const PATCH = async (
  req: Request,
  context: z.infer<typeof routeContextSchema>
) => {
  try {
    const { params } = routeContextSchema.parse(context);

    const json = await req.json();
    const body = editFlashcardSchema.parse(json);

    // Flashcards already in DB
    const flashcardsToUpdate = body.flashcards.filter(
      (flashcard) => flashcard.id !== "" || flashcard.id !== null
    );
    flashcardsToUpdate.forEach(async (flashcard) => {
      await prisma.flashcard.update({
        where: { id: flashcard.id },
        data: {
          front: flashcard.front,
          back: flashcard.back,
        },
      });
    });

    // Flashcards deleted
    const allOldFlashcards = await prisma.flashcard.findMany({
      where: {
        groupId: params.groupId,
      },
      select: {
        id: true,
      },
    });

    const flashcardsToUpdateIds = flashcardsToUpdate.map((f) => f.id);

    // foreach allOldFlashcards, map over and see if it exists on a body.flashcards
    allOldFlashcards.forEach(async (oldFlashcard) => {
      if (!flashcardsToUpdateIds.includes(oldFlashcard.id))
        await prisma.flashcard.delete({ where: { id: oldFlashcard.id } });
    });

    // Flashcards not in DB
    const flashcardsToCreate = body.flashcards.filter(
      (flashcard) => flashcard.id === null || flashcard.id === ""
    );

    const flashcardGroup = await prisma.flashcardGroup.update({
      where: {
        id: params.groupId,
      },
      data: {
        unit: parseInt(body.unit),
        topic: parseInt(body.topic),
        flashcards:
          body.flashcards.length > 0
            ? {
                createMany: {
                  data: flashcardsToCreate.map((flashcard) => ({
                    front: flashcard.front,
                    back: flashcard.back,
                  })),
                },
              }
            : {},
      },
      select: {
        id: true,
      },
    });
    return NextResponse.json(flashcardGroup);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
};
