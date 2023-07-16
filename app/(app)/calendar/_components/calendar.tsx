"use client";

import { ReactNode, useEffect, useState } from "react";
import { useCalendar } from "@h6s/calendar";
import { EventCategory, Subject } from "@prisma/client";
import addMonths from "date-fns/addMonths";
import format from "date-fns/format";
import isToday from "date-fns/isToday";
import subMonths from "date-fns/subMonths";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/util/cn";
import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import { Heading, Text } from "@/ui/typography";

import Event from "./event";

const Calendar = ({
  events,
}: {
  events: {
    id: string;
    date: Date;
    title: string;
    subject: Subject | null;
    category: EventCategory;
    description: string | null;
    markdown: ReactNode;
  }[];
}) => {
  const [activeDate, setActiveDate] = useState(new Date());
  const [selected, setSelected] = useState<Date | null>(null);

  const nextMonth = () => setActiveDate((prev) => addMonths(prev, 1));
  const prevMonth = () => setActiveDate((prev) => subMonths(prev, 1));
  const goToday = () => setActiveDate(new Date());

  const { headers, body, navigation } = useCalendar({
    defaultDate: activeDate,
    defaultWeekStart: 1,
  });

  useEffect(() => {
    navigation.setDate(activeDate);
  }, [navigation, activeDate]);

  return (
    <Card.Root className="text-sm overflow-hidden border-collapse">
      <Card.Header className="flex-row space-y-0">
        <Heading level={4} className="mb-0 flex-1">
          {format(activeDate, "MMMM y")}
        </Heading>

        <Button
          variant="outline"
          size="icon"
          onClick={prevMonth}
          className="rounded-r-none -mr-px"
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="outline"
          onClick={goToday}
          className="rounded-none disabled:cursor-not-allowed disabled:pointer-events-auto"
          disabled={activeDate.toDateString() == new Date().toDateString()}
        >
          Today
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextMonth}
          className="rounded-l-none -ml-px"
        >
          <ChevronRightIcon />
        </Button>
      </Card.Header>

      <div className="grid-rows-[auto,repeat(6,1fr)] pt-px grid grid-cols-7 bg-border gap-px h-full">
        {headers.weekDays.map(({ key, value }) => (
          <div
            key={key}
            className="h-12 px-4 grid place-items-center font-medium bg-muted"
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
                    : day.value
                )
              }
              key={day.key}
              className={cn(
                "flex p-1 items-center justify-center min-h-[3rem] sm:hidden",
                selected?.toDateString() === day.value.toDateString()
                  ? "bg-muted"
                  : "bg-background transition hover:bg-muted"
              )}
            >
              <p
                className={cn(
                  "inline-flex justify-center",
                  isToday(day.value)
                    ? "p-1 bg-primary/10 text-primary rounded-full h-7"
                    : "text-muted-foreground m-1",
                  day.value.getDate() !== 1 && "w-7"
                )}
              >
                {day.value.getDate() === 1
                  ? format(day.value, "MMM d")
                  : day.value.getDate()}
              </p>
            </button>
          ))
        )}

        {/* Desktop only */}
        {body.value.map((week) =>
          week.value.map((day, index) => (
            <div
              key={day.key}
              className={cn(
                "sm:flex flex-col p-1 items-start min-h-[6rem] hidden",
                isToday(day.value)
                  ? "bg-muted"
                  : "bg-background transition hover:bg-muted"
              )}
            >
              <p
                className={cn(
                  "inline-flex",
                  isToday(day.value)
                    ? "p-1 bg-primary/10 text-primary rounded-full justify-center h-7"
                    : "text-muted-foreground m-1",
                  day.value.getDate() !== 1 && "w-7"
                )}
              >
                {day.value.getDate() === 1
                  ? format(day.value, "MMM d")
                  : day.value.getDate()}
              </p>

              {events
                .filter(
                  (event) =>
                    event.date.toDateString() === day.value.toDateString()
                )
                .map((event, key) => (
                  <Event key={key} event={event} />
                ))}
            </div>
          ))
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
              (event) => event.date.toDateString() === selected.toDateString()
            ).length > 0 ? (
              events
                .filter(
                  (event) =>
                    event.date.toDateString() === selected.toDateString()
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
    </Card.Root>
  );
};

export default Calendar;
