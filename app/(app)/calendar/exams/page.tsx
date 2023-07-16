import examsTimetable from "@/data/exam-timetable.json";
import { cn } from "@/util/cn";
import * as Table from "@/ui/table";
import { Heading } from "@/ui/typography";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function toHoursAndMinutes(totalMinutes: number) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours}h ${padTo2Digits(minutes)}m`;
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

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
              const dateString = `${weekday[date.getDay()]} ${date.getDate()} ${
                monthNames[date.getMonth()]
              }`;

              const completed = new Date() > new Date(exam.date);

              return (
                <Table.Row key={key} className={cn(completed && "bg-muted")}>
                  <Table.Cell className="capitalize py-4 w-60">
                    {dateString}
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
                    {toHoursAndMinutes(exam.length)}
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
