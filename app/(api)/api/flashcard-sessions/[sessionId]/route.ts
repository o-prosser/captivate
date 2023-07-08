import { getCurrentUser } from "@/util/session";
import * as z from "zod";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSessionWithFlashcards } from "@/app/(models)/flashcard-study-session";
import { getFlashcardGroup } from "@/app/(models)/flashcard-group";
import { createFlashcardStudy } from "@/app/(models)/flashcard-study";

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
    const user = await getCurrentUser();
    if (!user) return new Response("Unauthorised", { status: 422 });

    const json = await req.json();
    const body = schema.parse(json);
    const { params } = contextSchema.parse(context);

    const session = await getSessionWithFlashcards(params.sessionId);
    if (!session) throw new Error("No session found");
    if (!session.scopeId) throw new Error("No scope ID");

    const flashcardGroup = await getFlashcardGroup(session.scopeId);
    if (!flashcardGroup) throw new Error("Flashcard group not found");

    const flashcard = await prisma.flashcard.findUnique({
      where: {
        id: body.flashcardId,
      },
      select: { id: true },
    });
    if (!flashcard) throw new Error("No flashcard found");

    // Create flashcard study record
    const record = await createFlashcardStudy({
      flashcardId: flashcard.id,
      sessionId: session.id,
      score: body.score,
    });

    const flashcardsToStudy = flashcardGroup.flashcards.filter((f) => {
      const viewed = session.flashcardsStudies.find(
        (study) => study.flashcardId === f.id,
      );
      if (viewed) return false;
      if (f.id === flashcard.id) return false;
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
