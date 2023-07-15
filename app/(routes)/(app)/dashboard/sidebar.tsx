import { Card, Checkbox, Pill, Text } from "@/ui";
import { format } from "date-fns";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Weather from "./weather";
import { getCurrentWeek } from "@/util/weeks";
import { Loader2Icon } from "lucide-react";
import { lessonHasPassed } from "@/util/timetable";
import { cn } from "@/util";
import { parseSubjectName } from "@/util/subjects";
import timetable from "@/data/timetable.json";
import { TimetableToday } from "@/components/timetable-today";
import isWeekend from "date-fns/isWeekend";

const LESSONS = [
  {
    lesson: [1],
    subject: "Maths",
    teacher: "Mrs Teacher",
    room: "X12",
  },
  {
    lesson: [3, 4],
    subject: "Chemistry",
    teacher: "Mr Teacher",
    room: "X13",
  },
  {
    lesson: [5],
    subject: "Physics",
    teacher: "Ms Teacher",
    room: "X14",
  },
];

const TASKS = [
  {
    title: "A12 Coursework",
    subject: "Physics",
    due: "2023-07-02",
    completed: false,
  },
  {
    title: "Unit 1.3 Questions",
    subject: "Maths",
    due: "2023-07-02",
    completed: false,
  },
  {
    title: "3.4 Mock",
    subject: "Maths",
    due: "2023-07-02",
    completed: true,
  },
];

const EVENTS = [
  {
    title: "1.2 Mock",
    subject: "Physics",
  },
  {
    title: "Important meeting",
    subject: "Maths",
  },
  {
    title: "3.4 Mock",
    subject: "Chemistry",
  },
];

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
          <span className="pr-2">📌</span>Tasks due today
        </Card.Description>

        {TASKS.map((task, key) => (
          <div
            className={cn(
              task.completed && "opacity-50",
              "flex space-x-3 mb-3",
            )}
            key={key}
          >
            <Checkbox
              className="mt-1.5 disabled:cursor-text disabled:opacity-100"
              checked={task.completed}
            />
            <div>
              <Text>{task.title}</Text>
              <Pill color={parseSubjectName(task.subject) || undefined}>
                {task.subject}
              </Pill>
            </div>
          </div>
        ))}

        <Card.Description className="pb-2 pt-5">
          <span className="pr-2">🗓️</span>On today&apos;s calendar
        </Card.Description>

        {EVENTS.map((event, key) => (
          <div className="mb-3 border-l-2 border-primary pl-[26px]" key={key}>
            <Text>{event.title}</Text>
            <Pill
              className="mt-1"
              color={parseSubjectName(event.subject) || undefined}
            >
              {event.subject}
            </Pill>
          </div>
        ))}
      </Card.Content>
    </Card.Root>
  );
};

export default Sidebar;
