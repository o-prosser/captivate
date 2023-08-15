import { NextResponse } from "next/server";
import { flashcardStudySessionsTable } from "@/drizzle/schema";
import * as z from "zod";

import { db, eq } from "@/lib/db";
import { getValidSession } from "@/util/session";
import { getScope } from "@/models/flashcard";
import { createFlashcardStudy } from "@/models/flashcard-study";
import { selectSessionWithFlashcards } from "@/models/flashcard-study-session";

const schema = z.object({
  flashcardId: z.string(),
  score: z.number(),
});

const contextSchema = z.object({
  params: z.object({
    sessionId: z.string(),
  }),
});

export const POST = async (
  req: Request,
  context: z.infer<typeof contextSchema>,
) => {
  try {
    const { user } = await getValidSession();
    if (!user) return new Response("Unauthorised", { status: 422 });

    const json = await req.json();
    const body = schema.parse(json);
    const { params } = contextSchema.parse(context);

    const session = await selectSessionWithFlashcards({ id: params.sessionId });
    if (!session) throw new Error("No session found");

    // Create flashcard study record
    const record = await createFlashcardStudy({
      flashcardId: body.flashcardId,
      sessionId: session.id,
      score: body.score,
    });

    const scope = await getScope(session);
    if (!scope) throw new Error("Invalid scope");

    const flashcardsToStudy = scope.flashcards.filter((f) => {
      const viewed = session.flashcardStudies.find(
        (study) => study.flashcardId === f.id,
      );
      if (viewed) return false;
      if (f.id === body.flashcardId) return false;
      return true;
    });

    if (flashcardsToStudy.length === 0) {
      await db
        .update(flashcardStudySessionsTable)
        .set({ end: new Date() })
        .where(eq(flashcardStudySessionsTable.id, session.id));

      return NextResponse.json({
        summary: true,
      });
    }

    return NextResponse.json({
      next: flashcardsToStudy[0].id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
};
