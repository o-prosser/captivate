import { Fragment } from "react";

import timetable from "@/data/timetable.json";
import * as Table from "@/ui/table";

export const metadata = {
  title: "Timetable",
};

const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const lessonTimes = [
  "08:40 – 09:35",
  "09:40 – 10:35",
  "11:10 – 12:05",
  "12:10 – 13:05",
  "14:05 – 15:00",
];

const Day = ({
  lesson,
}: {
  lesson?: {
    lesson: number[];
    subject: string;
    teacher: string;
    room: string;
  };
}) => (
  <Table.Cell
    rowSpan={lesson?.lesson.length === 2 ? 2 : 1}
    className="text-center"
  >
    {lesson ? (
      <>
        <p className="font-medium capitalize">{lesson.subject}</p>
        <p className="text-muted-foreground pt-px">
          {lesson.room} <span className="opacity-50 px-px">&bull;</span>{" "}
          {lesson.teacher}
        </p>
      </>
    ) : (
      ""
    )}
  </Table.Cell>
);

const Timetable = ({ params }: { params: { week: string } }) => {
  const week = timetable.weeks[parseInt(params.week) - 1];

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head className="min-w-[9rem]"></Table.Head>
          {days.map((day) => (
            <Table.Head
              key={day}
              className="uppercase h-10 min-w-[10rem] w-[calc((100%-10rem)/5)] text-center font-semibold text-xs text-muted-foreground bg-muted"
            >
              {day}
            </Table.Head>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {lessonTimes.map((time, key) => {
          const shouldHideIfDouble = key === 1 || key === 3;

          const monday = week.monday.find((lesson) =>
            lesson.lesson.includes(key + 1),
          );
          const tuesday = week.tuesday.find((lesson) =>
            lesson.lesson.includes(key + 1),
          );
          const wednesday = week.wednesday.find((lesson) =>
            lesson.lesson.includes(key + 1),
          );
          const thursday = week.thursday.find((lesson) =>
            lesson.lesson.includes(key + 1),
          );
          const friday = week.friday.find((lesson) =>
            lesson.lesson.includes(key + 1),
          );

          return (
            <Fragment key={key}>
              <Table.Row className="hover:bg-background">
                <Table.Cell className="bg-muted/25">
                  <p className="font-medium text-center">Lesson {key + 1}</p>
                  <p className="text-muted-foreground text-center pt-px">
                    {time}
                  </p>
                </Table.Cell>
                {monday?.lesson.length === 2 && shouldHideIfDouble ? (
                  ""
                ) : (
                  <Day lesson={monday} />
                )}
                {tuesday?.lesson.length === 2 && shouldHideIfDouble ? (
                  ""
                ) : (
                  <Day lesson={tuesday} />
                )}
                {wednesday?.lesson.length === 2 && shouldHideIfDouble ? (
                  ""
                ) : (
                  <Day lesson={wednesday} />
                )}
                {thursday?.lesson.length === 2 && shouldHideIfDouble ? (
                  ""
                ) : (
                  <Day lesson={thursday} />
                )}
                {friday?.lesson.length === 2 && shouldHideIfDouble ? (
                  ""
                ) : (
                  <Day lesson={friday} />
                )}
              </Table.Row>
              {key === 1 || key === 3 ? (
                <>
                  <Table.Row>
                    <Table.Cell
                      className="py-2 text-center bg-muted/25"
                      colSpan={6}
                    >
                      <p className="font-medium">
                        {key === 1 ? "Break" : "Lunch"}
                      </p>
                      <p className="text-muted-foreground pt-px">
                        {key === 1 ? "10:35 – 11:10" : "13:05 – 13:40"}
                      </p>
                    </Table.Cell>
                  </Table.Row>
                  {key === 3 ? (
                    <Table.Row>
                      <Table.Cell
                        className="py-2 text-center bg-muted/25"
                        colSpan={6}
                      >
                        <p className="font-medium">Worship</p>
                        <p className="text-muted-foreground pt-px">
                          13:40 – 14:00
                        </p>
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </Fragment>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

export default Timetable;

export const runtime = "edge";
export const preferredRegion = "lhr1";
