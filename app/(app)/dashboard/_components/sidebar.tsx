import { Suspense } from "react";
import { format } from "date-fns";
import isWeekend from "date-fns/isWeekend";
import { Loader2Icon } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";

import { getCurrentWeek } from "@/util/weeks";
import * as Card from "@/ui/card";
import { EventsToday } from "@/components/events-today";
import { TasksToday } from "@/components/tasks-today";
import { TimetableToday } from "@/components/timetable-today";

import Weather from "./weather";

const Sidebar = () => {
  return (
    <Card.Root className="area-[sidebar]">
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
        <ErrorBoundary
          fallback={
            <Card.Description className="text-destructive">
              Unable to load weather 😢. It&apos;s probably going to rain 🌧️.
            </Card.Description>
          }
        >
          <Suspense
            fallback={
              <Card.Description className="flex items-center">
                <Loader2Icon className="h-3 w-3 animate-spin mr-2" />
                Loading weather...
              </Card.Description>
            }
          >
            <Weather />
          </Suspense>
        </ErrorBoundary>
      </Card.Header>

      <Card.Content>
        <TimetableToday />

        <Card.Description className="pb-1 pt-5">
          <span className="pr-2">📌</span>Tasks due and to do today
        </Card.Description>

        <Suspense fallback={<>Unable to load events</>}>
          <TasksToday />
        </Suspense>

        <Card.Description className="pb-2 pt-5">
          <span className="pr-2">🗓️</span>On today&apos;s calendar
        </Card.Description>

        <Suspense fallback={<>Unable to load events</>}>
          <EventsToday />
        </Suspense>
      </Card.Content>
    </Card.Root>
  );
};

export default Sidebar;
