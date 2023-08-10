import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import format from "date-fns/format";
import { Calendar, Clipboard, User } from "lucide-react";

import examTimetable from "@/data/exam-timetable.json";
import { getSubject } from "@/util/subjects";
import { minutesToHoursAndMinutes } from "@/util/time";
import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import { Heading, Text } from "@/ui/typography";
import { EventsToday } from "@/components/events-today";
import { FlashcardsToday } from "@/components/flashcards-today";
import { TasksToday } from "@/components/tasks-today";

const Index = (props: { subject: string }) => {
  const subject = getSubject(props.subject);
  if (!subject || !subject.enum) notFound();

  return (
    <>
      <Heading>{subject.name}</Heading>

      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card.Root>
          <Card.Header>
            <Card.Title>Upcoming events</Card.Title>
          </Card.Header>
          <Card.Content>
            <Suspense fallback={<>Loading events...</>}>
              <EventsToday subject={subject.enum} />
            </Suspense>
            <Button variant="outline" asChild className="w-full mt-3">
              <Link href="/calendar">
                <Calendar />
                View more
              </Link>
            </Button>
          </Card.Content>
        </Card.Root>
        <Card.Root>
          <Card.Header>
            <Card.Title>Tasks</Card.Title>
          </Card.Header>
          <Card.Content>
            <Suspense fallback={<>Loading tasks...</>}>
              <TasksToday subject={subject.enum} />
            </Suspense>
            <Button variant="outline" asChild className="w-full mt-3">
              <Link href="/tasks">
                <Clipboard />
                View more
              </Link>
            </Button>
          </Card.Content>
        </Card.Root>
        <Card.Root>
          <Card.Header>
            <Card.Title>Key information</Card.Title>
          </Card.Header>
          <Card.Content>
            {subject.teachers.length > 0
              ? subject.teachers.map((teacher, key) => (
                  <div key={key} className="flex items-center space-x-3 mb-3">
                    <div className="h-12 w-12 rounded-full bg-muted grid place-items-center">
                      <User className="text-muted-foreground h-6 w-6" />
                    </div>
                    <div>
                      <Text className="font-medium">{teacher.name}</Text>
                      <Text className="text-sm !mt-0 text-muted-foreground">
                        {teacher.email}
                      </Text>
                    </div>
                  </div>
                ))
              : "No teacher information"}

            <Heading level={4} className="!mb-1 border-t mt-5 pt-5">
              Exams
            </Heading>

            {examTimetable.exams
              .filter((exam) => exam.subject === subject.enum.toLowerCase())
              .map((exam, key) => (
                <div key={key} className="mb-3">
                  <Text className="font-medium">
                    {format(new Date(exam.date), "EEEE d LLLL")}{" "}
                    <span className="italic uppercase">({exam.session})</span>
                  </Text>
                  <Text className="text-sm !mt-0 text-muted-foreground">
                    Unit {exam.unit}{" "}
                    <span className="italic">
                      ({minutesToHoursAndMinutes(exam.length)})
                    </span>
                  </Text>
                </div>
              ))}
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>Recent flashcards</Card.Title>
          </Card.Header>

          <Card.Content>
            <Suspense fallback={<>Loading flashcards...</>}>
              <FlashcardsToday subject={subject.enum} />
            </Suspense>
          </Card.Content>
        </Card.Root>
      </div>
    </>
  );
};

export default Index;
