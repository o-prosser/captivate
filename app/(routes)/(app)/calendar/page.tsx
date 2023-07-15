import { Button, Card, Checkbox, Heading, Pill, Text } from "@/ui";
import { getCurrentWeek } from "@/util/weeks";
import format from "date-fns/format";
import { CalendarRangeIcon, FileTextIcon } from "lucide-react";
import Link from "next/link";
import timetable from "@/data/timetable.json";
import { lessonHasPassed } from "@/util/timetable";
import { cn } from "@/util";
import Calendar from "./calendar";
import { getEvents } from "@/app/(models)/event";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { Markdown } from "@/components/markdown";

const days: ["monday", "tuesday", "wednesday", "thursday", "friday"] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

const CalendarPage = async () => {
  const currentWeek = getCurrentWeek();

  const day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" =
    days[new Date().getDay() - 1];

  const events = await getEvents();

  return (
    <div>
      <Heading>Calendar</Heading>

      <div className="flex space-x-2"></div>

      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-[21.5rem,1fr]">
        <Card.Root>
          <Card.Header>
            <Card.Description>
              It&apos;s {getCurrentWeek() === 0 ? "half term" : ""}
              {getCurrentWeek() === 1 ? "a week 1" : ""}
              {getCurrentWeek() === 2 ? "a week 1" : ""}
            </Card.Description>
            <Card.Title className="text-primary text-xl pb-2">
              {format(new Date(), "EEEE, 'the' do 'of' MMMM y")}.
            </Card.Title>
          </Card.Header>
          <Card.Content>
            {(currentWeek === 1 || currentWeek === 2) &&
            timetable.weeks[currentWeek - 1][day]?.length > 0 ? (
              <>
                <Card.Description className="pb-1">
                  <span className="pr-2">👩🏻‍🏫</span>Lessons today
                </Card.Description>

                {timetable.weeks[currentWeek - 1][day].map((lesson, key) => {
                  const passed = lessonHasPassed(
                    lesson.lesson.length > 1
                      ? lesson.lesson[1]
                      : lesson.lesson[0],
                  );
                  return (
                    <div
                      className={cn(
                        passed && "opacity-50",
                        "flex space-x-3 mb-3",
                      )}
                      key={key}
                    >
                      <Checkbox
                        disabled
                        className="mt-1.5 disabled:cursor-text disabled:opacity-100"
                        checked={passed}
                      />
                      <div>
                        <Text>
                          <span className="rounded-full bg-primary text-primary-foreground px-2 py-0.5 font-medium text-sm inline-flex mr-2">
                            {lesson.lesson.length > 1
                              ? `Lessons ${lesson.lesson[0]} & ${lesson.lesson[1]}`
                              : `Lesson ${lesson.lesson}`}
                          </span>
                          {lesson.subject.charAt(0).toUpperCase()}
                          {lesson.subject.substring(1)}
                        </Text>
                        <Pill>{lesson.teacher}</Pill>
                        <Pill>{lesson.room}</Pill>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              ""
            )}

            <div className="flex flex-col space-y-3 mt-6">
              <Button asChild>
                <Link href="/calendar/timetable">
                  <CalendarRangeIcon />
                  Timetable
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/calendar/exams">
                  <FileTextIcon />
                  Exam timetable
                </Link>
              </Button>
            </div>
          </Card.Content>
        </Card.Root>
        <div>
          <ErrorBoundary fallback={<>Unable to load events</>}>
            <Suspense fallback={<>Loading events...</>}>
              <Calendar
                events={events.map((event) => ({
                  markdown: <Markdown source={event.description || ""} />,
                  ...event,
                }))}
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
