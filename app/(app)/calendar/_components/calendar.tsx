import Link from "next/link";
import type { Event as EventType } from "@/drizzle/schema";
import {
  eachDayOfInterval,
  endOfMonth,
  getDay,
  isSameDay,
  parse,
} from "date-fns";
import format from "date-fns/format";
import isToday from "date-fns/isToday";

import { cn, createVar } from "@/util/cn";
import { Button } from "@/ui/button";
import { Pill } from "@/ui/pill";
import { Text } from "@/ui/typography";

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

const Calendar = ({
  events,
  activeDate,
}: {
  events: Array<
    Pick<
      EventType,
      "id" | "start" | "end" | "title" | "category" | "description"
    > & {
      subject: string | null;
    }
  >;
  activeDate: Date;
}) => {
  const firstDayCurrentMonth = parse(
    format(activeDate, "MMM-yyyy"),
    "MMM-yyyy",
    new Date(),
  );

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  return (
    <div className="overflow-hidden rounded-2xl border">
      <div className="grid-rows-[auto,repeat(6,1fr)] grid grid-cols-7 bg-border gap-px">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((value, key) => (
          <div
            key={key}
            className="h-10 uppercase px-4 grid place-items-center font-semibold bg-muted text-xs text-muted-foreground"
          >
            <span className="hidden sm:inline">{value}</span>
            <span className="sm:hidden">{value.charAt(0)}</span>
          </div>
        ))}

        {/* Mobile!! */}
        {days.map((day, key) => (
          <Link
            href={`/calendar/${format(day, "yyyy-MM-dd")}/month`}
            key={key}
            className={cn(
              "flex p-1 items-center justify-center min-h-[3rem] sm:hidden",
              key === 0 && colStartClasses[getDay(day) - 1],
              isSameDay(activeDate, day)
                ? "bg-muted"
                : "bg-background transition hover:bg-muted",
            )}
          >
            <p
              className={cn(
                "inline-flex justify-center",
                isToday(day)
                  ? "p-1 bg-primary/10 text-primary rounded-full h-7"
                  : "text-muted-foreground m-1",
                day.getDate() !== 1 && "w-7",
              )}
            >
              {day.getDate() === 1 ? format(day, "MMM d") : day.getDate()}
            </p>
          </Link>
        ))}

        {/* Desktop only */}
        {days.map((day, key) => (
          <div
            key={key}
            className={cn(
              "sm:flex flex-col p-1 items-end min-h-[6rem] hidden",
              key === 0 && colStartClasses[getDay(day) - 1],
              isToday(day) ? "bg-muted" : "bg-background",
            )}
          >
            <p
              className={cn(
                "inline-flex text-sm mt-1.5 mr-2",
                isToday(day)
                  ? "text-primary font-semibold"
                  : "text-muted-foreground",
              )}
            >
              {day.getDate() === 1 ? format(day, "MMM d") : day.getDate()}
            </p>

            <div className="space-y-2 w-full p-1">
              {events
                .filter(
                  (event) => event.start.toDateString() === day.toDateString(),
                )
                .map((event, key) => (
                  <Button
                    key={key}
                    variant={null}
                    style={createVar({
                      "--subject": `var(--${
                        event.subject || "muted-foreground"
                      })`,
                    })}
                    className="bg-gradient-to-b from-subject/30 to-subject/10 py-3 px-4 hover:opacity-90 transition font-normal block w-full"
                    size={null}
                    asChild
                  >
                    <Link
                      href={`/calendar/${format(
                        activeDate,
                        "yyyy-MM-dd",
                      )}/month/events/${event.id}`}
                    >
                      <Text className="font-semibold leading-6 text-subject capitalize brightness-50">
                        {event.title}
                      </Text>
                      <div className="flex gap-2 items-center">
                        {event.subject ? (
                          <Pill className="!m-0" outline="subject" color={null}>
                            {event.subject}
                          </Pill>
                        ) : (
                          ""
                        )}
                        <span className="text-xs text-subject">
                          {event.category}
                        </span>
                      </div>
                    </Link>
                  </Button>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile only events */}
      <div className="sm:hidden flex flex-col p-6 border-t">
        <div>
          {events.filter((event) => isSameDay(event.start, activeDate)).length >
          0 ? (
            events
              .filter((event) => isSameDay(event.start, activeDate))
              .map((event, key) => (
                <Button
                  key={key}
                  variant={null}
                  style={
                    {
                      "--subject": `var(--${event.subject || "muted"}) ${
                        event.subject ? "/ 0.2" : ""
                      }`,
                    } as React.CSSProperties
                  }
                  className="justify-start w-full py-1 px-2 text-sm text-left bg-[hsl(var(--subject))] hover:opacity-90 transition"
                  size={null}
                  asChild
                >
                  <Link
                    href={`/calendar/${format(
                      activeDate,
                      "yyyy-MM-dd",
                    )}/month/events/${event.id}`}
                  >
                    {event.title}
                  </Link>
                </Button>
              ))
          ) : (
            <Text className="text-sm text-center text-muted-foreground">
              No events
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
