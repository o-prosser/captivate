import {
  flashcardStudySessionsTable,
  type FlashcardStudySession,
} from "@/drizzle/schema";

import { db } from "@/lib/db";
import { getValidSession } from "@/util/session";

export const selectOrCreateSession = async ({
  id,
  data,
}: {
  id?: FlashcardStudySession["id"];
  data: {
    groupId?: FlashcardStudySession["groupId"];
    unit?: FlashcardStudySession["unit"];
    subject?: FlashcardStudySession["subjectId"];
    type: FlashcardStudySession["type"];
  };
}) => {
  if (id) {
    return {
      session: await db.query.flashcardStudySessionsTable.findFirst({
        where: (fields, { eq }) => eq(fields.id, id),
        with: {
          flashcardStudies: {
            columns: {
              id: true,
            },
          },
          group: {
            with: {
              flashcards: true,
            },
          },
        },
      }),
      created: false,
    };
  }

  const { user } = await getValidSession();

  const returning: {
    session: {
      id: FlashcardStudySession["id"];
      scope: FlashcardStudySession["scope"];
      unit: FlashcardStudySession["unit"];
      subject: FlashcardStudySession["subjectId"];
    };
    created: boolean;
  } = {
    session: (
      await db
        .insert(flashcardStudySessionsTable)
        .values({
          userId: user.id,
          start: new Date(),
          scope: data.groupId ? "Group" : data.unit ? "Unit" : "Subject",
          ...data,
        })
        .returning({
          id: flashcardStudySessionsTable.id,
          scope: flashcardStudySessionsTable.scope,
          unit: flashcardStudySessionsTable.unit,
          subject: flashcardStudySessionsTable.subjectId,
        })
    )[0],
    created: true,
  };

  return returning;
};

export const selectSessionWithFlashcards = async ({ id }: { id: string }) => {
  return await db.query.flashcardStudySessionsTable.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
    columns: {
      id: true,
      scope: true,
      unit: true,
      subjectId: true,
    },
    with: {
      group: {
        with: { flashcards: true },
      },
      flashcardStudies: {
        columns: {
          id: true,
          flashcardId: true,
          score: true,
        },
        orderBy: (fields, { asc }) => asc(fields.id),
      },
    },
  });
};

export const selectSessionForSummary = async ({ id }: { id: string }) => {
  return await db.query.flashcardStudySessionsTable.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
    with: {
      group: {
        with: { flashcards: true },
      },
      flashcardStudies: {
        with: { flashcard: true },
        orderBy: (fields, { asc }) => asc(fields.id),
      },
    },
  });
};

export const SCORES = [
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

export const getScores = (session: {
  flashcardsStudies: { score: number }[];
}) =>
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
