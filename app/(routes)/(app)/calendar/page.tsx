import { Button, Card, Checkbox, Heading, Pill, Text } from "@/ui";
import { getCurrentWeek } from "@/util/weeks";
import format from "date-fns/format";
import { CalendarRangeIcon, FileTextIcon } from "lucide-react";
import Link from "next/link";
import Calendar from "./calendar";
import { getEvents } from "@/app/(models)/event";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { Markdown } from "@/components/markdown";
import isWeekend from "date-fns/isWeekend";
import { TimetableToday } from "@/components/timetable-today";

const CalendarPage = async () => {
  const events = await getEvents();

  return (
    <div>
      <Heading>Calendar</Heading>

      <div className="flex space-x-2"></div>

      <div className="grid gap-6 mt-6 xl:grid-cols-[21.5rem,1fr]">
        <Card.Root>
          <Card.Header>
            <Card.Description>
              It&apos;s {getCurrentWeek() === 0 ? "half term" : ""}
              {isWeekend(new Date()) ? (
                <>
                  {getCurrentWeek() === 1 ? "the weekend" : ""}
                  {getCurrentWeek() === 2 ? "the weekend" : ""}
                </>
              ) : (
                <>
                  {getCurrentWeek() === 1 ? "a week 1" : ""}
                  {getCurrentWeek() === 2 ? "a week 1" : ""}
                </>
              )}
            </Card.Description>
            <Card.Title className="text-primary text-xl pb-2">
              {format(new Date(), "EEEE, 'the' do 'of' MMMM y")}.
            </Card.Title>
          </Card.Header>
          <Card.Content>
            <TimetableToday />

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
