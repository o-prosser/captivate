import lightFormat from "date-fns/lightFormat";

import examsTimetable from "@/data/exam-timetable.json";
import { cn } from "@/util/cn";
import { minutesToHoursAndMinutes } from "@/util/time";
import * as Table from "@/ui/table";
import { Heading } from "@/ui/typography";

const ExamsTimetable = () => {
  return (
    <>
      <Heading>Exam Timetable</Heading>

      <div className="max-w-[44.375rem] mt-6">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head colSpan={2}>Date</Table.Head>
              <Table.Head colSpan={3}>Exam details</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {examsTimetable.exams.map((exam, key) => {
              const date = new Date(exam.date);

              const completed = new Date() > new Date(exam.date);

              return (
                <Table.Row key={key} className={cn(completed && "bg-muted")}>
                  <Table.Cell className="capitalize py-4 w-60">
                    {lightFormat(date, "EEEE d LLLL")}
                  </Table.Cell>
                  <Table.Cell className="uppercase py-4 w-[3.375rem]">
                    {exam.session}
                  </Table.Cell>
                  <Table.Cell className="capitalize font-medium py-4 w-44">
                    {exam.subject}
                  </Table.Cell>
                  <Table.Cell className="py-4 w-32">
                    Unit {exam.unit}
                  </Table.Cell>
                  <Table.Cell className="py-4 w-28">
                    {minutesToHoursAndMinutes(exam.length)}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </div>
    </>
  );
};

export default ExamsTimetable;
