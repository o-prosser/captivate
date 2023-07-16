import timetable from "@/data/timetable.json";
import { Card, Checkbox, Pill, Text } from "@/ui";
import { cn } from "@/util";
import { lessonHasPassed } from "@/util/timetable";
import { getCurrentWeek, getNextWeek } from "@/util/weeks";
import isWeekend from "date-fns/isWeekend";

const Lesson = ({
  lesson,
  next,
}: {
  lesson: {
    lesson: number[];
    subject: string;
    teacher: string;
    room: string;
  };
  next: boolean;
}) => {
  const passed = next
    ? false
    : lessonHasPassed(
        lesson.lesson.length > 1 ? lesson.lesson[1] : lesson.lesson[0],
      );
  return (
    <div className={cn(passed && "opacity-50", "flex space-x-3 mb-3")}>
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
};

const days: [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const TimetableToday = () => {
  const week = isWeekend(new Date()) ? getNextWeek() : getCurrentWeek();
  const actualDay:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday" = days[new Date().getDay()];
  const day =
    actualDay === "saturday" || actualDay === "sunday" ? "monday" : actualDay;

  return (getCurrentWeek() === 1 ||
    getCurrentWeek() === 2 ||
    getNextWeek() === 1 ||
    getNextWeek() === 2) &&
    week ? (
    <>
      <Card.Description className="pb-1">
        <span className="pr-2">👩🏻‍🏫</span>Lessons{" "}
        {isWeekend(new Date()) ? "Monday" : "today"}
      </Card.Description>
      {timetable.weeks[week - 1][day].map((lesson, key) => (
        <Lesson next={isWeekend(new Date())} lesson={lesson} key={key} />
      ))}
    </>
  ) : (
    <>It&apos;s half term!</>
  );
};
