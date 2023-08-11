"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Event as EventType } from "@/drizzle/schema";
import { useCalendar } from "@h6s/calendar";
import format from "date-fns/format";
import isToday from "date-fns/isToday";

import { cn } from "@/util/cn";
import { Text } from "@/ui/typography";

const Event = dynamic(() => import("./event"));

const Calendar = ({
  events,
  activeDate,
}: {
  events: Array<
    Pick<EventType, "id" | "date" | "title" | "category" | "description"> & {
      subject: string | null;
      markdown: React.ReactNode;
    }
  >;
  activeDate: Date;
}) => {
  const [selected, setSelected] = useState<Date | null>(null);

  const { headers, body, navigation } = useCalendar({
    defaultDate: activeDate,
    defaultWeekStart: 1,
  });

  return (
    <div className="overflow-hidden rounded-2xl border">
      <div className="grid-rows-[auto,repeat(6,1fr)] grid grid-cols-7 bg-border gap-px h-full">
        {headers.weekDays.map(({ key, value }) => (
          <div
            key={key}
            className="h-10 uppercase px-4 grid place-items-center font-semibold bg-muted text-xs text-muted-foreground"
          >
            {format(value, "E")}
          </div>
        ))}

        {/* Mobile!! */}
        {body.value.map((week) =>
          week.value.map((day, index) => (
            <button
              onClick={() =>
                setSelected(
                  selected?.toDateString() === day.value.toDateString()
                    ? null
                    : day.value,
                )
              }
              key={day.key}
              className={cn(
                "flex p-1 items-center justify-center min-h-[3rem] sm:hidden",
                selected?.toDateString() === day.value.toDateString()
                  ? "bg-muted"
                  : "bg-background transition hover:bg-muted",
              )}
            >
              <p
                className={cn(
                  "inline-flex justify-center",
                  isToday(day.value)
                    ? "p-1 bg-primary/10 text-primary rounded-full h-7"
                    : "text-muted-foreground m-1",
                  day.value.getDate() !== 1 && "w-7",
                )}
              >
                {day.value.getDate() === 1
                  ? format(day.value, "MMM d")
                  : day.value.getDate()}
              </p>
            </button>
          )),
        )}

        {/* Desktop only */}
        {body.value.map((week) =>
          week.value.map((day, index) => (
            <div
              key={day.key}
              className={cn(
                "sm:flex flex-col p-1 items-end min-h-[6rem] hidden",
                isToday(day.value) ? "bg-muted" : "bg-background",
              )}
            >
              <p
                className={cn(
                  "inline-flex text-sm mt-1.5 mr-2",
                  isToday(day.value)
                    ? "text-primary font-semibold"
                    : "text-muted-foreground",
                )}
              >
                {day.value.getDate() === 1
                  ? format(day.value, "MMM d")
                  : day.value.getDate()}
              </p>

              {events
                .filter(
                  (event) =>
                    event.date.toDateString() === day.value.toDateString(),
                )
                .map((event, key) => (
                  <Event key={key} event={event} />
                ))}
            </div>
          )),
        )}
        {body.value.length === 5 ? (
          <div className="col-span-7 bg-background" />
        ) : (
          ""
        )}
      </div>

      {/* Mobile only events */}
      <div className="sm:hidden flex flex-col p-6 border-t">
        {selected ? (
          <div>
            {events.filter(
              (event) => event.date.toDateString() === selected.toDateString(),
            ).length > 0 ? (
              events
                .filter(
                  (event) =>
                    event.date.toDateString() === selected.toDateString(),
                )
                .map((event, key) => <Event key={key} event={event} />)
            ) : (
              <Text className="text-sm text-center text-muted-foreground">
                No events
              </Text>
            )}
          </div>
        ) : (
          <Text className="text-sm text-center text-muted-foreground">
            Select a date to view events.
          </Text>
        )}
      </div>
    </div>
  );
};

export default Calendar;
