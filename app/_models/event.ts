import { cache } from "react";
import { Event, eventsTable } from "@/drizzle/schema";
import { addDays, endOfMonth, startOfDay, startOfMonth } from "date-fns";

import { and, asc, db, eq, gte, ilike, lte, or } from "@/lib/db";
import { getValidSession } from "@/util/session";

export const selectEvent = cache(async ({ id }: { id: Event["id"] }) => {
  const { user } = await getValidSession();

  return (
    await db
      .select({
        id: eventsTable.id,
        start: eventsTable.start,
        end: eventsTable.end,
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

const selectEvents = async ({
  search,
  activeDate,
  area = "month",
  subjectId,
}: {
  search?: string;
  activeDate: Date;
  area?: "month" | "week";
  subjectId?: string;
}) => {
  const { user } = await getValidSession();

  return await db
    .select({
      id: eventsTable.id,
      start: eventsTable.start,
      end: eventsTable.end,
      title: eventsTable.title,
      subject: eventsTable.subjectId,
      category: eventsTable.category,
      description: eventsTable.description,
    })
    .from(eventsTable)
    .where(
      and(
        eq(eventsTable.userId, user.id),
        gte(
          eventsTable.start,
          area === "month" ? startOfMonth(activeDate) : startOfDay(activeDate),
        ),
        lte(
          eventsTable.start,
          area === "month"
            ? endOfMonth(activeDate)
            : addDays(startOfDay(activeDate), 3),
        ),
        search ?
          or(
            ilike(eventsTable.title, `%${search?.toLowerCase()}%`),
            ilike(eventsTable.subjectId, `%${search?.toLowerCase()}%`),
          ) : undefined,
        subjectId ? eq(eventsTable.subjectId, subjectId) : undefined,
      ),
    )
    .orderBy(asc(eventsTable.start))
    .limit(area === "month" ? 100 : 4);
};

export { selectEvents };
