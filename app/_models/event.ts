import { cache } from "react";
import { Event, eventsTable } from "@/drizzle/schema";
import { endOfMonth, startOfDay, startOfMonth } from "date-fns";

import { and, db, eq, gte, ilike, lte, or } from "@/lib/db";
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

const selectEvents = cache(
  async ({ search, activeDate }: { search?: string; activeDate: Date }) => {
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
          gte(eventsTable.date, startOfMonth(activeDate)),
          lte(eventsTable.date, endOfMonth(activeDate)),
          search
            ? or(
                ilike(eventsTable.title, `%${search.toLowerCase()}%`),
                ilike(eventsTable.subjectId, `%${search.toLowerCase()}%`),
              )
            : undefined,
        ),
      );
  },
);

export { selectEvents };
