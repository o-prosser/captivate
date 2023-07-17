import { Subject } from "@prisma/client";
import { isTomorrow } from "date-fns";
import formatDistance from "date-fns/formatDistance";
import isToday from "date-fns/isToday";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/util/session";
import { parseSubjectName } from "@/util/subjects";
import { Callout } from "@/ui/callout";
import { Pill } from "@/ui/pill";
import { Text } from "@/ui/typography";

const EventsToday = async ({ subject }: { subject?: Subject }) => {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error();

  const events = await prisma.event.findMany({
    where: {
      subject: subject,
      date: subject
        ? {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          }
        : { equals: new Date(new Date().setHours(0, 0, 0, 0)) },
      userId: user.id,
    },
    orderBy: {
      date: "asc",
    },
    select: {
      id: true,
      date: true,
      title: true,
      category: true,
      description: true,
      subject: true,
    },
    take: 4,
  });

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
    <Callout emoji="🗓️">No upcoming events.</Callout>
  );
};

export { EventsToday };
