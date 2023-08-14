import { cache } from "react";
import { Event, eventsTable } from "@/drizzle/schema";
import { startOfDay } from "date-fns";

import { and, db, eq, gte } from "@/lib/db";
import { getValidSession } from "@/util/session";

export const selectEvent = cache(async ({ id }: { id: Event["id"] }) => {
  const { user } = await getValidSession();

  return (
    await db
      .select({
        id: eventsTable.id,
        date: eventsTable.date,
        title: eventsTable.title,
        subject: eventsTable.subjectId,
        category: eventsTable.category,
        description: eventsTable.description,
      })
      .from(eventsTable)
      .where(and(eq(eventsTable.userId, user.id), eq(eventsTable.id, id)))
      .limit(1)
  )[0];
});

const selectEvents = cache(async () => {
  const { user } = await getValidSession();

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
