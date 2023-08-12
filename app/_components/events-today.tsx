import { eventsTable } from "@/drizzle/schema";
import { Subject } from "@prisma/client";
import { isTomorrow, startOfDay } from "date-fns";
import formatDistance from "date-fns/formatDistance";
import isToday from "date-fns/isToday";

import { and, asc, db, eq, gte } from "@/lib/db";
import { getValidSession } from "@/lib/session";
import { parseSubjectName } from "@/util/subjects";
import { Callout } from "@/ui/callout";
import { Pill } from "@/ui/pill";
import { Text } from "@/ui/typography";

const EventsToday = async ({ subject }: { subject?: Subject }) => {
  const { user } = await getValidSession();

  const events = await db
    .select({
      id: eventsTable.id,
      date: eventsTable.date,
      title: eventsTable.title,
      category: eventsTable.category,
      description: eventsTable.description,
      subject: eventsTable.subjectId,
    })
    .from(eventsTable)
    .where(
      and(
        subject ? eq(eventsTable.subjectId, subject) : undefined,
        subject
          ? gte(eventsTable.date, startOfDay(new Date()))
          : eq(eventsTable.date, startOfDay(new Date())),
        eq(eventsTable.userId, user.id),
      ),
    )
    .orderBy(asc(eventsTable.date))
    .limit(4);

  return events.length ? (
    events.map((event, key) => (
      <div
        className="mb-3 border-l-2 border-primary pl-[26px] flex items-start justify-between"
        key={key}
      >
        <div>
          <Text>{event.title}</Text>
          {event.subject ? (
            <Pill
              className="mt-1"
              color={parseSubjectName(event.subject) || undefined}
            >
              {event.subject}
            </Pill>
          ) : (
            ""
          )}
          {event.category ? <Pill className="mt-1">{event.category}</Pill> : ""}
        </div>
        <div className="text-sm text-muted-foreground">
          {subject ? (
            <>
              {isToday(event.date)
                ? "today"
                : isTomorrow(event.date)
                ? "tomorrow"
                : "in " + formatDistance(new Date(), event.date)}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    ))
  ) : (
    <Callout className="!mt-0" emoji="🗓️">
      No upcoming events.
    </Callout>
  );
};

export { EventsToday };
