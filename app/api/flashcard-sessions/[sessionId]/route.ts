import { NextResponse } from "next/server";
import * as z from "zod";

import { getCurrentUser } from "@/util/session";
import { getScope } from "@/models/flashcard";
import { getFlashcardGroup } from "@/models/flashcard-group";
import { createFlashcardStudy } from "@/models/flashcard-study";
import { getSessionWithFlashcards } from "@/models/flashcard-study-session";
import { prisma } from "@/app/_lib/prisma";

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
  context: z.infer<typeof contextSchema>
) => {
  try {
    const user = await getCurrentUser();
    if (!user) return new Response("Unauthorised", { status: 422 });

    const json = await req.json();
    const body = schema.parse(json);
    const { params } = contextSchema.parse(context);

    const session = await getSessionWithFlashcards(params.sessionId);
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
      const viewed = session.flashcardsStudies.find(
        (study) => study.flashcardId === f.id
      );
      if (viewed) return false;
      if (f.id === body.flashcardId) return false;
      return true;
    });

    if (flashcardsToStudy.length === 0) {
      await prisma.flashcardStudySession.update({
        where: { id: session?.id },
        data: {
          end: new Date(),
        },
      });

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
