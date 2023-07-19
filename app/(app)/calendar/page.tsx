import { Suspense } from "react";
import Link from "next/link";
import format from "date-fns/format";
import isWeekend from "date-fns/isWeekend";
import { CalendarRangeIcon, FileTextIcon } from "lucide-react";

import { getCurrentWeek } from "@/util/weeks";
import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import { Loading } from "@/ui/loading";
import { Heading } from "@/ui/typography";
import { TimetableToday } from "@/components/timetable-today";

import CalendarData from "./_components/calendar-data";

export const metadata = {
  title: "Calendar",
};

const CalendarPage = () => {
  return (
    <div>
      <Heading>Calendar</Heading>

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
          <Suspense fallback={<Loading text="Loading calendar events..." />}>
            <CalendarData />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
