import { Fragment } from "react";
import Link from "next/link";
import type { Event as EventType } from "@/drizzle/schema";
import clsx from "clsx";
import {
  addDays,
  addWeeks,
  eachDayOfInterval,
  format,
  getHours,
  getMinutes,
  intervalToDuration,
  isSameDay,
  startOfWeek,
  subWeeks,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { createVar } from "@/util/cn";
import { isAllDay } from "@/util/time";
import { Button } from "@/ui/button";
import { Text } from "@/ui/typography";

const Week = ({
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
  const startOfWeekDate = startOfWeek(activeDate, { weekStartsOn: 1 });
  const endOfWeekDate = addDays(startOfWeekDate, 4);

  const days = eachDayOfInterval({
    start: startOfWeekDate,
    end: endOfWeekDate,
  });

  const times = [
    9999, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23,
  ];

  return (
    <>
      <div className="overflow-scroll rounded-2xl border">
        <div className="grid-cols-[4.75rem,repeat(5,1fr)] grid bg-border gap-px">
          <div className="bg-background p-1 space-x-1">
            <Button variant="ghost" asChild size="icon" className="h-8 w-8">
              <Link
                href={`/calendar/${format(
                  subWeeks(startOfWeekDate, 1),
                  "yyyy-MM-dd",
                )}/week`}
              >
                <ChevronLeft />
              </Link>
            </Button>
            <Button variant="ghost" asChild size="icon" className="h-8 w-8">
              <Link
                href={`/calendar/${format(
                  addWeeks(startOfWeekDate, 1),
                  "yyyy-MM-dd",
                )}/week`}
              >
                <ChevronRight />
              </Link>
            </Button>
          </div>
          {days.map((value, key) => (
            <div
              key={key}
              className="h-10 uppercase px-4 grid place-items-center font-semibold bg-muted text-xs text-muted-foreground"
            >
              <span className="hidden sm:inline">
                {format(value, "dd EEE")}
              </span>
              <span className="sm:hidden">{format(value, "dd EEEEE")}</span>
            </div>
          ))}
        </div>

        <div className="grid-cols-[4.75rem,repeat(5,1fr)] grid bg-border gap-px">
          <div className="bg-background px-2 text-sm text-foreground/80 uppercase text-center">
            <div className="h-full flex items-center">All day</div>
          </div>
          {days.map((date, key) => {
            const allDayEvents = events.filter(
              (event) =>
                isSameDay(date, event.start) &&
                isAllDay(event.start, event.end),
            );

            return (
              <div
                key={key}
                className="bg-background p-1 space-y-1 min-h-[2rem]"
              >
                {allDayEvents.map((event, key) => {
                  return (
                    <Button
                      key={key}
                      variant={null}
                      style={createVar({
                        "--subject": `var(--${
                          event.subject || "muted-foreground"
                        })`,
                      })}
                      className="bg-gradient-to-b from-subject/30 to-subject/10 py-1.5 px-3 hover:opacity-90 transition font-normal block w-full"
                      size={null}
                      asChild
                    >
                      <Link
                        href={`/calendar/${format(
                          activeDate,
                          "yyyy-MM-dd",
                        )}/week/events/${event.id}`}
                      >
                        <Text className="font-semibold leading-5 text-subject capitalize brightness-50">
                          {event.title}
                        </Text>
                      </Link>
                    </Button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* <InitialScroll initialScroll={1350}> */}
        <div className="grid-cols-[4.75rem,repeat(5,1fr)] grid-rows-[2rem,repeat(24,6.25rem)] grid bg-border border-t gap-px h-96 overflow-auto">
          {times.map((time, key) => (
            <Fragment key={key}>
              {key !== 0 ? (
                <>
                  <div className="bg-background">
                    <div className="bg-background px-2 text-sm -mt-[9px] text-foreground/80 uppercase text-center">
                      {time === 12
                        ? "12 pm"
                        : time > 12
                        ? `${time - 12} pm`
                        : `${time} am`}
                    </div>
                  </div>
                  {days.map((date, key) => {
                    const timeEvents = events.filter(
                      (event) =>
                        isSameDay(date, event.start) &&
                        !isAllDay(event.start, event.end) &&
                        getHours(event.start) == time,
                    );

                    return (
                      <div key={key} className="bg-background p-1 space-y-1">
                        {timeEvents.map((event, key) => {
                          const duration = intervalToDuration({
                            start: event.start,
                            end: event.end,
                          });

                          return (
                            <Button
                              autoFocus={key === 0}
                              key={key}
                              variant={null}
                              style={{
                                ...createVar({
                                  "--subject": `var(--${
                                    event.subject || "muted-foreground"
                                  })`,
                                }),
                                marginTop:
                                  timeEvents.length > 1
                                    ? undefined
                                    : getMinutes(event.start) === 0
                                    ? undefined
                                    : `${
                                        (getMinutes(event.start) * 96) / 60
                                      }px`,
                                height:
                                  duration.minutes !== 0
                                    ? `${
                                        ((duration.minutes as number) * 100) /
                                        60
                                      }%`
                                    : undefined,
                              }}
                              className={clsx(
                                "bg-gradient-to-b from-subject/30 to-subject/10 py-1.5 px-3 hover:opacity-90 transition font-normal block w-full min-h-[3rem]",
                                intervalToDuration({
                                  start: event.start,
                                  end: event.end,
                                }).hours === 1
                                  ? "h-full"
                                  : "",
                              )}
                              size={null}
                              asChild
                            >
                              <Link
                                href={`/calendar/${format(
                                  activeDate,
                                  "yyyy-MM-dd",
                                )}/week/events/${event.id}`}
                              >
                                <Text className="font-semibold leading-5 text-subject capitalize brightness-50">
                                  {event.title}
                                </Text>
                                <p className="text-subject text-xs brightness-75">
                                  {format(event.start, `h:mm`)} &ndash;{" "}
                                  {format(event.end, "h:mm aa")}
                                </p>
                                {/* <div className="flex gap-2 items-center">
                                  {event.subject ? (
                                    <Pill
                                      className="!m-0"
                                      outline="subject"
                                      color={null}
                                    >
                                      {event.subject}
                                    </Pill>
                                  ) : (
                                    ""
                                  )}
                                  <span className="text-xs text-subject">
                                    {event.category}
                                  </span>
                                </div> */}
                              </Link>
                            </Button>
                          );
                        })}
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="bg-background" />
                  <div className="bg-background" />
                  <div className="bg-background" />
                  <div className="bg-background" />
                  <div className="bg-background" />
                  <div className="bg-background" />
                </>
              )}
            </Fragment>
          ))}
        </div>
        {/* </InitialScroll> */}
      </div>
    </>
  );
};

export default Week;
