import {
  Flashcard,
  FlashcardGroup,
  flashcardsTable,
  FlashcardStudySession,
} from "@/drizzle/schema";

import { db, inArray } from "@/lib/db";
import { getSubject } from "@/util/subjects";

export const selectFlashcard = async ({ id }: { id: Flashcard["id"] }) => {
  return await db.query.flashcardsTable.findFirst({
    where: (fields, { eq }) => eq(fields.id, id),
    with: {
      studies: true,
    },
  });
};

export const getScore = (score: number) => {
  const scores = [
    "Skipped",
    "Forgot",
    "Partially recalled",
    "Recalled with effort",
    "Easily recalled",
  ];

  return scores[score - 1];
};

export const getScope = async (session: {
  scope: FlashcardStudySession["scope"];
  group?: (FlashcardGroup & { flashcards: Flashcard[] }) | null;
  unit?: FlashcardStudySession["unit"];
  subject?: FlashcardStudySession["subjectId"];
}) => {
  const subject = session.subject
    ? getSubject(session.subject)
    : session.group?.subjectId
    ? getSubject(session.group.subjectId)
    : undefined;

  if (session.scope === "Group") {
    if (!session.group)
      throw new Error("Group must be provided when using a unit type");

    return {
      title:
        subject?.units[session.group.unit - 1].topics[session.group.topic - 1],
      ...session.group,
    };
  }
  if (session.scope === "Unit") {
    if (!session.subject)
      throw new Error("Subject must be provided when using a unit type");
    if (!session.unit)
      throw new Error("Unit must be provided when using a unit type");

    const flashcardGroups = await db.query.flashcardGroupsTable.findMany({
      where: (fields, { and, eq }) =>
        and(
          // @ts-expect-error
          eq(fields.subjectId, session.subject),
          // @ts-expect-error
          eq(fields.unit, session.unit),
        ),
      columns: {
        id: true,
      },
    });
    const flashcardGroupIds = flashcardGroups.map(({ id }) => id);
    const flashcards = await db
      .select()
      .from(flashcardsTable)
      .where(inArray(flashcardsTable.groupId, flashcardGroupIds));

    return {
      title: subject?.units[session.unit - 1].name,
      flashcards,
    };
  }
  if (session.scope === "Subject") {
    if (!session.subject)
      throw new Error("Subject must be provided when using a unit type");

    const flashcardGroups = await db.query.flashcardGroupsTable.findMany({
      // @ts-expect-error
      where: (fields, { and, eq }) => eq(fields.subjectId, session.subject),
      columns: {
        id: true,
      },
    });
    const flashcardGroupIds = flashcardGroups.map(({ id }) => id);
    const flashcards = await db
      .select()
      .from(flashcardsTable)
      .where(inArray(flashcardsTable.groupId, flashcardGroupIds));

    return { title: session.subject, flashcards };
  }

  return undefined;
};
