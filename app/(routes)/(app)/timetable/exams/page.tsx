import {
  BasicTable,
  Breadcrumbs,
  Heading,
  TableCell,
  TableHeading,
  TableRow,
} from "@/ui";
import examsTimetable from "@/data/exam-timetable.json";
import { cn } from "@/util";

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
      <Breadcrumbs pages={["Timetables", "Exam timetable"]} />
      <Heading>Exam Timetable</Heading>

      <BasicTable className="!w-auto">
        <TableRow>
          <TableHeading colSpan={2}>Date</TableHeading>
          <TableHeading colSpan={3}>Exam details</TableHeading>
        </TableRow>
        <tbody>
          {examsTimetable.exams.map((exam, key) => {
            const date = new Date(exam.date);
            const dateString = `${weekday[date.getDay()]} ${date.getDate()} ${
              monthNames[date.getMonth()]
            }`;

            const completed = new Date() > new Date(exam.date);

            return (
              <TableRow key={key} className={cn(completed && "bg-muted")}>
                <TableCell className="capitalize py-4 w-60">
                  {dateString}
                </TableCell>
                <TableCell className="uppercase py-4 w-[3.375rem]">
                  {exam.session}
                </TableCell>
                <TableCell className="capitalize font-medium py-4 w-44">
                  {exam.subject}
                </TableCell>
                <TableCell className="py-4 w-32">Unit {exam.unit}</TableCell>
                <TableCell className="py-4 w-28">
                  {toHoursAndMinutes(exam.length)}
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </BasicTable>
    </>
  );
};

export default ExamsTimetable;
