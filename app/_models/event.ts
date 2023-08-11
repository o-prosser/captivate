import { cache } from "react";
import { eventsTable } from "@/drizzle/schema";
import { startOfDay } from "date-fns";

import { and, db, eq, gte } from "@/lib/db";
import { getSession } from "@/lib/session";

const selectEvents = cache(async () => {
  const { user } = await getSession();

  return await db
    .select({
      id: eventsTable.id,
      date: eventsTable.date,
      title: eventsTable.title,
      subject: eventsTable.subjectId,
      category: eventsTable.category,
      description: eventsTable.description,
    })
    .from(eventsTable)
    .where(
      and(
        eq(eventsTable.userId, user.id),
        gte(eventsTable.date, startOfDay(new Date())),
      ),
    );
});

export { selectEvents };
