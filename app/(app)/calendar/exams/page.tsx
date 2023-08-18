import Link from "next/link";
import format from "date-fns/format";
import { Download, Printer } from "lucide-react";

import examsTimetable from "@/data/exam-timetable.json";
import { cn } from "@/util/cn";
import { minutesToHoursAndMinutes } from "@/util/time";
import { displayCurrentWeek } from "@/util/weeks";
import { Button } from "@/ui/button";
import * as Table from "@/ui/table";
import { Heading, Text } from "@/ui/typography";

import Tabs from "../_components/tabs";

export const metadata = {
  title: "Exam timetable",
};

const ExamsTimetable = () => {
  return (
    <>
      <Heading>Exam timetable</Heading>
      <Text className="text-muted-foreground !mt-2">
        It&apos;s {format(new Date(), "EEEE, 'the' do 'of' MMMM y")} &mdash;{" "}
        {displayCurrentWeek()}
      </Text>

      <div className="flex gap-2 my-6">
        <Button variant="outline" asChild>
          <Link href={examsTimetable.link} download>
            Complete timetable
          </Link>
        </Button>
        <Button variant="outline">
          <Download />
          Download
        </Button>
        <Button variant="outline">
          <Printer />
          Print
        </Button>
      </div>

      <Tabs active="exams" />

      <div className="max-w-[44.375rem] mt-6">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head
                colSpan={2}
                className="uppercase text-xs font-semibold"
              >
                Date
              </Table.Head>
              <Table.Head
                colSpan={3}
                className="uppercase text-xs font-semibold"
              >
                Exam details
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {examsTimetable.exams.map((exam, key) => {
              const date = new Date(exam.date);

              const completed = new Date() > new Date(exam.date);

              return (
                <Table.Row key={key} className={cn(completed && "bg-muted")}>
                  <Table.Cell className="capitalize py-4 w-60">
                    {format(date, "EEEE d LLLL")}
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

export const runtime = "edge";
export const preferredRegion = "lhr1";
