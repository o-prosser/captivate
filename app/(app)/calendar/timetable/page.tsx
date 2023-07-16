import { Fragment } from "react";

import timetable from "@/data/timetable.json";
import * as Table from "@/ui/table";
import { Heading } from "@/ui/typography";

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
        <p className="text-muted-foreground">
          {lesson.room} <span className="opacity-50 px-px">&bull;</span>{" "}
          {lesson.teacher}
        </p>
      </>
    ) : (
      ""
    )}
  </Table.Cell>
);

const Timetable = () => {
  return (
    <>
      <Heading>Timetable</Heading>

      {timetable.weeks.map((week, key) => (
        <div key={key} className="mt-6">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head className="min-w-[9rem]"></Table.Head>
                {days.map((day) => (
                  <Table.Head
                    key={day}
                    className="capitalize min-w-[10rem] w-[calc((100%-10rem)/5)] text-center font-semibold text-foreground"
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
                  lesson.lesson.includes(key + 1)
                );
                const tuesday = week.tuesday.find((lesson) =>
                  lesson.lesson.includes(key + 1)
                );
                const wednesday = week.wednesday.find((lesson) =>
                  lesson.lesson.includes(key + 1)
                );
                const thursday = week.thursday.find((lesson) =>
                  lesson.lesson.includes(key + 1)
                );
                const friday = week.friday.find((lesson) =>
                  lesson.lesson.includes(key + 1)
                );

                return (
                  <Fragment key={key}>
                    <Table.Row>
                      <Table.Cell>
                        <p className="font-medium">Lesson {key + 1}</p>
                        <p className="font-muted-foreground">{time}</p>
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
                            className="py-2 text-center bg-muted/20"
                            colSpan={6}
                          >
                            <p className="font-medium">
                              {key === 1 ? "Break" : "Lunch"}
                            </p>
                            <p className="font-muted-foreground">
                              {key === 1 ? "10:35 – 11:10" : "13:05 – 13:40"}
                            </p>
                          </Table.Cell>
                        </Table.Row>
                        {key === 3 ? (
                          <Table.Row>
                            <Table.Cell
                              className="py-2 text-center bg-muted/20"
                              colSpan={6}
                            >
                              <p className="font-medium">Worship</p>
                              <p className="font-muted-foreground">
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
        </div>
      ))}
    </>
  );
};

export default Timetable;
