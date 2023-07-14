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

const days: ["monday", "tuesday", "wednesday", "thursday", "friday"] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

const Sidebar = () => {
  const currentWeek = getCurrentWeek();

  const day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" =
    days[new Date().getDay() - 1];

  return (
    <Card.Root className="area-[sidebar]">
      <Card.Header>
        <Card.Description>
          It&apos;s {currentWeek === 0 ? "half term" : ""}
          {currentWeek === 1 ? "a week 1" : ""}
          {currentWeek === 2 ? "a week 1" : ""}
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
        {(currentWeek === 1 || currentWeek === 2) &&
        timetable.weeks[currentWeek - 1][day]?.length > 0 ? (
          <>
            <Card.Description className="pb-1">
              <span className="pr-2">👩🏻‍🏫</span>Lessons today
            </Card.Description>

            {timetable.weeks[currentWeek - 1][day].map((lesson, key) => {
              const passed = lessonHasPassed(
                lesson.lesson.length > 1 ? lesson.lesson[1] : lesson.lesson[0],
              );
              return (
                <div
                  className={cn(passed && "opacity-50", "flex space-x-3 mb-3")}
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
