import { prisma } from "@/app/_lib/prisma";
import { getCurrentUser } from "@/app/_util/session";
import { StudyScope, StudyType } from "@prisma/client";
import { redirect } from "next/navigation";

const getOrCreateSession = async ({
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

const getSessionWithFlashcards = async (id: string) => {
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

const getSessionSummary = async (id: string) => {
  return await prisma.flashcardStudySession.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      scopeId: true,
      start: true,
      end: true,
      scope: true,
      flashcardsStudies: {
        select: {
          id: true,
          score: true,
          createdAt: true,
          flashcard: {
            select: {
              front: true,
              back: true,
            },
          },
        },
        orderBy: {
          id: "asc",
        },
      },
    },
  });
};

export { getOrCreateSession, getSessionWithFlashcards, getSessionSummary };
