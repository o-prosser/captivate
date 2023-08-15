import { flashcardStudySessionsTable } from "@/drizzle/schema";

import { and, db, desc, eq } from "@/lib/db";
import { getValidSession } from "@/util/session";
import { Callout } from "@/ui/callout";
import { Text } from "@/ui/typography";

const FlashcardsToday = async ({ subject }: { subject?: string }) => {
  const { user } = await getValidSession();

  const sessions = await db
    .select({ type: flashcardStudySessionsTable.type })
    .from(flashcardStudySessionsTable)
    .where(
      subject
        ? and(
            eq(flashcardStudySessionsTable.subjectId, subject),
            eq(flashcardStudySessionsTable.userId, user.id),
          )
        : eq(flashcardStudySessionsTable.userId, user.id),
    )
    .orderBy(desc(flashcardStudySessionsTable.end))
    .limit(3);

  return sessions.length > 0 ? (
    sessions.map((session, key) => (
      <div key={key} className="mb-3">
        <Text>{session.type}</Text>
      </div>
    ))
  ) : (
    <Callout className="mt-0" emoji="📚">
      No recent flashcard sessions.
    </Callout>
  );
};

export { FlashcardsToday };
