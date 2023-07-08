import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/util/session";
import { StudyScope, StudyType } from "@prisma/client";
import { redirect } from "next/navigation";

export const getOrCreateSession = async ({
  id,
  data,
}: {
  id?: string;
  data: {
    scope: StudyScope;
    scopeId?: string;
    type: StudyType;
  };
}) => {
  if (id) {
    return {
      session: await prisma.flashcardStudySession.findUnique({
        where: {
          id,
        },
        include: {
          _count: {
            select: { flashcardsStudies: true },
          },
        },
      }),
      created: false,
    };
  }

  const user = await getCurrentUser();
  if (!user?.email) redirect("/login");

  const userId = await prisma.user.findUnique({
    where: { email: user?.email },
    select: { id: true },
  });
  if (!userId) redirect("/login");

  return {
    session: await prisma.flashcardStudySession.create({
      data: {
        userId: userId.id,
        start: new Date(),
        ...data,
      },
      select: {
        id: true,
        scope: true,
        scopeId: true,
        _count: {
          select: { flashcardsStudies: true },
        },
      },
    }),
    created: true,
  };
};

export const getSessionWithFlashcards = async (id: string) => {
  return await prisma.flashcardStudySession.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      scopeId: true,
      flashcardsStudies: {
        select: {
          id: true,
          flashcardId: true,
          score: true,
        },
        orderBy: {
          id: "asc",
        },
      },
    },
  });
};
