import { eventsTable } from "@/drizzle/schema";
import { isTomorrow, startOfDay } from "date-fns";
import formatDistance from "date-fns/formatDistance";
import isToday from "date-fns/isToday";

import { and, asc, db, eq, gte } from "@/lib/db";
import { getValidSession } from "@/util/session";
import { parseSubjectName } from "@/util/subjects";
import { Callout } from "@/ui/callout";
import { Pill } from "@/ui/pill";
import { Text } from "@/ui/typography";

const EventsToday = async ({ subject }: { subject?: string }) => {
  const { user } = await getValidSession();

  const events = await db
    .select({
      id: eventsTable.id,
      start: eventsTable.start,
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
          ? gte(eventsTable.start, startOfDay(new Date()))
          : eq(eventsTable.start, startOfDay(new Date())),
        eq(eventsTable.userId, user.id),
      ),
    )
    .orderBy(asc(eventsTable.start))
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
              {isToday(event.start)
                ? "today"
                : isTomorrow(event.start)
                ? "tomorrow"
                : "in " + formatDistance(new Date(), event.start)}
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
