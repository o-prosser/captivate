import { NextResponse } from "next/server";
import { Subject } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { getValidSession } from "@/lib/session";

const createFlashcardSchema = z.object({
  unit: z.string(),
  topic: z.string(),
  subject: z.string().min(1),
  flashcards: z.array(z.object({ front: z.string(), back: z.string() })),
});

const getSubject = (value: string) => {
  if (value === "maths") return Subject.Maths;
  if (value === "Maths") return Subject.Maths;
  if (value === "chemistry") return Subject.Chemistry;
  if (value === "Chemistry") return Subject.Chemistry;
  if (value === "physics") return Subject.Physics;
  if (value === "Physics") return Subject.Physics;

  throw new Error("Invalid subject provided: " + value);
};

export const POST = async (req: Request) => {
  try {
    const session = await getValidSession();

    if (!session) return new Response("Unauthorised", { status: 403 });

    const json = await req.json();
    const body = createFlashcardSchema.parse(json);

    const flashcardGroup = await prisma.flashcardGroup.create({
      data: {
        unit: parseInt(body.unit),
        topic: parseInt(body.topic),
        subject: getSubject(body.subject),
        flashcards:
          body.flashcards.length > 0
            ? {
                createMany: {
                  data: body.flashcards.map((flashcard) => ({
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
