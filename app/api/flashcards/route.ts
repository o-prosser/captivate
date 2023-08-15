import { NextResponse } from "next/server";
import { flashcardGroupsTable, flashcardsTable } from "@/drizzle/schema";
import { z } from "zod";

import { db } from "@/lib/db";
import { getValidSession } from "@/util/session";

const createFlashcardSchema = z.object({
  unit: z.string(),
  topic: z.string(),
  subject: z.string().min(1),
  flashcards: z.array(z.object({ front: z.string(), back: z.string() })),
});

const getSubject = (value: string) => {
  if (value === "maths") return "Maths";
  if (value === "Maths") return "Maths";
  if (value === "chemistry") return "Chemistry";
  if (value === "Chemistry") return "Chemistry";
  if (value === "physics") return "Physics";
  if (value === "Physics") return "Physics";

  throw new Error("Invalid subject provided: " + value);
};

export const POST = async (req: Request) => {
  try {
    const session = await getValidSession();

    if (!session) return new Response("Unauthorised", { status: 403 });

    const json = await req.json();
    const body = createFlashcardSchema.parse(json);

    const flashcardGroup = (
      await db
        .insert(flashcardGroupsTable)
        .values({
          unit: parseInt(body.unit),
          topic: parseInt(body.topic),
          subjectId: getSubject(body.subject).toLowerCase(),
        })
        .returning({ id: flashcardGroupsTable.id })
    )[0];

    const flashcards = await db.insert(flashcardsTable).values(
      body.flashcards.map((flashcard) => ({
        groupId: flashcardGroup.id,
        front: flashcard.front,
        back: flashcard.back,
      })),
    );

    if (!flashcardGroup) throw new Error("Unable to create");

    return NextResponse.json(flashcardGroup);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    return NextResponse.json(
      { lol: "There was an error", error },
      { status: 500 },
    );
  }
};
