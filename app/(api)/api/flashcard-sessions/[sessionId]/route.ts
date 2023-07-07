import { getCurrentUser } from "@/util/session";
import * as z from "zod";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

    const session = await prisma.flashcardStudySession.findUnique({
      where: {
        id: params.sessionId,
      },
      select: {
        id: true,
        scopeId: true,
        flashcardsStudies: {
          select: {
            id: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });
    if (!session) throw new Error("No session found");

    if (!session.scopeId) throw new Error("No scope ID");
    const flashcardGroup = await prisma.flashcardGroup.findUnique({
      where: {
        id: session.scopeId,
      },
      select: {
        id: true,
        flashcards: {
          select: {
            id: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });
    if (!flashcardGroup) throw new Error("Flashcard group not found");

    const flashcard = await prisma.flashcard.findUnique({
      where: {
        id: body.flashcardId,
      },
      select: { id: true },
    });
    if (!flashcard) throw new Error("No flashcard found");

    // Create flashcard study record
    const record = await prisma.flashcardStudy.create({
      data: {
        flashcardId: flashcard.id,
        sessionId: session.id,
        score: body.score,
      },
    });

    // Get next flashcard
    const ids = flashcardGroup.flashcards.map((f) => f.id);
    const currentIndex = ids.indexOf(flashcard.id);
    const nextFlashcard = flashcardGroup.flashcards[currentIndex + 1];
    if (!nextFlashcard) return NextResponse.json({});

    return NextResponse.json({
      next: nextFlashcard.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    return NextResponse.json(null, { status: 500 });
  }
};
