import Link from "next/link";
import { Calendar, CheckCircle2, Clock, Inbox } from "lucide-react";

import { SubjectPageProps } from "@/types/subjects";
import { getSubject } from "@/util/subjects";
import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import { Heading } from "@/ui/typography";

const SubjectDashboardLayout = ({
  params,
  children,
  calendar,
  flashcards,
  tasks,
  views,
}: SubjectPageProps & {
  children: React.ReactNode;
  calendar: React.ReactNode;
  flashcards: React.ReactNode;
  tasks: React.ReactNode;
  views: React.ReactNode;
}) => {
  const subject = getSubject(params.subject);

  return (
    <div className="xl:min-h-[calc(100dvh-128px)] grid grid-rows-[auto,1fr]">
      <Heading className="mb-6">{subject.name}</Heading>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 max-h-full gap-6 h-full">
        {/* Calendar */}
        <Card.Root>
          <Card.Header className="flex-row justify-between space-y-0 pb-3">
            <Card.Title className="flex items-center">
              <Calendar className="text-muted-foreground h-5 w-5 mr-2" />
              Schedule
            </Card.Title>
            <Button variant="outline" asChild size="sm">
              <Link href="/calendar">Show all</Link>
            </Button>
          </Card.Header>

          <Card.Content>{calendar}</Card.Content>
        </Card.Root>

        {/* Tasks */}
        <Card.Root>
          <Card.Header className="flex-row justify-between space-y-0 pb-3">
            <Card.Title className="flex items-center">
              <CheckCircle2 className="text-muted-foreground h-5 w-5 mr-2" />
              Tasks
            </Card.Title>
            <Button variant="outline" asChild size="sm">
              <Link href="/tasks">Show all</Link>
            </Button>
          </Card.Header>
          <Card.Content>{tasks}</Card.Content>
        </Card.Root>

        {/* Views */}
        <Card.Root>
          <Card.Header className="flex-row justify-between space-y-0 pb-3">
            <Card.Title className="flex items-center h-9">
              <Clock className="text-muted-foreground h-5 w-5 mr-2" />
              Recent pages
            </Card.Title>
          </Card.Header>
          <Card.Content>{views}</Card.Content>
        </Card.Root>

        {/* Flashcards */}
        <Card.Root>
          <Card.Header className="flex-row justify-between space-y-0 pb-3">
            <Card.Title className="flex items-center h-9">
              <Inbox className="text-muted-foreground h-5 w-5 mr-2" />
              Flashcards
            </Card.Title>
          </Card.Header>
          <Card.Content>{flashcards}</Card.Content>
        </Card.Root>

        {children}
      </div>
    </div>
  );
};

export default SubjectDashboardLayout;
