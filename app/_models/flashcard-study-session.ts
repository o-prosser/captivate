import { StudyType, Subject } from "@prisma/client";

import { getValidSession } from "@/lib/session";
import { prisma } from "@/app/_lib/prisma";

const getOrCreateSession = async ({
  id,
  data,
}: {
  id?: string;
  data: {
    groupId?: string;
    unit?: number;
    subject?: Subject;
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
          group: {
            include: { flashcards: true },
          },
        },
      }),
      created: false,
    };
  }

  const { user } = await getValidSession();

  return {
    session: await prisma.flashcardStudySession.create({
      data: {
        userId: user.id,
        start: new Date(),
        scope: data.groupId ? "Group" : data.unit ? "Unit" : "Subject",
        ...data,
      },
      select: {
        id: true,
        scope: true,
        unit: true,
        subject: true,
        _count: {
          select: { flashcardsStudies: true },
        },
        group: {
          include: { flashcards: true },
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
      scope: true,
      group: {
        include: { flashcards: true },
      },
      unit: true,
      subject: true,
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
      scope: true,
      start: true,
      end: true,
      group: {
        include: { flashcards: true },
      },
      subject: true,
      unit: true,
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

const SCORES = [
  {
    emoji: "⏩",
    label: "Skipped",
    short: "Skipped",
  },
  {
    emoji: "❌",
    label: "Forgot",
    short: "Forgot",
  },
  {
    emoji: "😬",
    label: "Partially recalled",
    short: "Partially",
  },
  {
    emoji: "😄",
    label: "Recalled with effort",
    short: "Recalled",
  },
  {
    emoji: "👑",
    label: "Easily recalled",
    short: "Easily",
  },
];

const getScores = (session: { flashcardsStudies: { score: number }[] }) =>
  SCORES.map(({ emoji, label, short }, key) => {
    const score = key + 1;

    const count = session.flashcardsStudies.filter(
      (study) => study.score == score,
    ).length;

    return {
      emoji,
      score,
      flashcards: count,
      label,
      short,
    };
  });

export {
  getOrCreateSession,
  getSessionWithFlashcards,
  getSessionSummary,
  SCORES,
  getScores,
};
