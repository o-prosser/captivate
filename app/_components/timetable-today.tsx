import isWeekend from "date-fns/isWeekend";
import { FileText } from "lucide-react";

import timetable from "@/data/timetable.json";
import { lessonHasPassed } from "@/util/timetable";
import { getCurrentWeek, getNextWeek } from "@/util/weeks";
import { Pill } from "@/ui/pill";
import { Placeholder } from "@/ui/placeholder";
import { SubjectCard } from "@/ui/subject-card";

import { TimetablePlaceholder } from "../(app)/dashboard/@calendar/placeholder";

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
    <SubjectCard subject={lesson.subject}>
      <SubjectCard.Header>
        <SubjectCard.Title>{lesson.subject}</SubjectCard.Title>

        <SubjectCard.Description>
          {lessonTimes[lesson.lesson[0] - 1].start} &ndash;{" "}
          {
            lessonTimes[
              lesson.lesson.length === 2
                ? lesson.lesson[1] - 1
                : lesson.lesson[0] - 1
            ].end
          }
        </SubjectCard.Description>
      </SubjectCard.Header>

      <SubjectCard.Footer>
        <SubjectCard.Caption className="text-subject text-sm brightness-50">
          {lesson.teacher} &bull; {lesson.room}
        </SubjectCard.Caption>
        <Pill outline="subject" color={null} className="!m-0">
          Lesson {lesson.lesson.join(" & ")}
        </Pill>
      </SubjectCard.Footer>
    </SubjectCard>
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
    <div className="relative">
      <TimetablePlaceholder />
      <TimetablePlaceholder />
      <TimetablePlaceholder />
      <Placeholder>
        <FileText />
        <Placeholder.Title>Enjoy your half term!</Placeholder.Title>
        <Placeholder.Text>
          You&apos;ve got no lessons today. Check your calendar and tasks if
          you&apos;re bored.
        </Placeholder.Text>
      </Placeholder>
    </div>
  );
};

export { TimetableToday };
