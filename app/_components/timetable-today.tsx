import isWeekend from "date-fns/isWeekend";

import timetable from "@/data/timetable.json";
import { cn, createVar } from "@/util/cn";
import { parseSubjectName } from "@/util/subjects";
import { lessonHasPassed } from "@/util/timetable";
import { getCurrentWeek, getNextWeek } from "@/util/weeks";
import * as Card from "@/ui/card";
import { Checkbox } from "@/ui/checkbox";
import { Pill } from "@/ui/pill";
import { Text } from "@/ui/typography";

const lessonTimes = [
  {
    start: "08:40",
    end: "09:35",
  },
  {
    start: "09:40",
    end: "10:35",
  },
  {
    start: "11:10",
    end: "12:05",
  },
  {
    start: "12:10",
    end: "13:05",
  },
  {
    start: "14:05",
    end: "15:00",
  },
];

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
    <div
      style={createVar({ "--subject": `var(--${lesson.subject})` })}
      className="bg-gradient-to-b from-subject/30 to-subject/10 rounded-2xl py-3 px-4"
    >
      <Text className="font-semibold text-subject capitalize brightness-50">
        {lesson.subject}
      </Text>

      <p className="text-subject text-sm brightness-75">
        {lessonTimes[lesson.lesson[0] - 1].start} &ndash;{" "}
        {
          lessonTimes[
            lesson.lesson.length === 2
              ? lesson.lesson[1] - 1
              : lesson.lesson[0] - 1
          ].end
        }
      </p>

      <div className="flex items-end justify-between mt-2">
        <div className="text-subject text-sm brightness-50">
          {lesson.teacher} &bull; {lesson.room}
        </div>
        <Pill outline="subject" color={null}>
          Lesson {lesson.lesson.join(" & ")}
        </Pill>
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

const TimetableToday = () => {
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
    <div className="space-y-2">
      {timetable.weeks[week - 1][day].map((lesson, key) => (
        <Lesson next={isWeekend(new Date())} lesson={lesson} key={key} />
      ))}
    </div>
  ) : (
    <>It&apos;s half term!</>
  );
};

export { TimetableToday };
