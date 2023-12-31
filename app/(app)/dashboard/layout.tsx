import Link from "next/link";
import { format } from "date-fns";
import { Calendar, CheckCircle2, Clock, FileText, Inbox } from "lucide-react";

import { getValidSession } from "@/util/session";
import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import Tabs, { Tab } from "@/ui/tabs";
import { Heading, Text } from "@/ui/typography";

function getRandom(min: number, max: number) {
  const floatRandom = Math.random();

  const difference = max - min;

  // random between 0 and the difference
  const random = Math.round(difference * floatRandom);

  const randomWithinRange = random + min;

  return randomWithinRange;
}

export const metadata = {
  title: "Dashboard",
};

const DashboardLayout = async ({
  children,
  calendar,
  tasks,
  flashcards,
  views,
  weather,
}: {
  children: React.ReactNode;
  calendar: React.ReactNode;
  tasks: React.ReactNode;
  flashcards: React.ReactNode;
  views: React.ReactNode;
  weather: React.ReactNode;
}) => {
  const { user } = await getValidSession();

  return (
    <div className="xl:min-h-[calc(100dvh-128px)] grid grid-rows-[auto,1fr]">
      <div className="mb-6">
        <Heading>Hello {user.name?.split(" ")[0]}</Heading>
        <Text className="!mt-1 text-muted-foreground">
          Welcome back to Captivate
        </Text>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 max-h-full gap-6 h-full">
        {/* Calendar */}
        <Card.Root className="xl:row-span-2">
          <Card.Header className="flex-row justify-between space-y-0 pb-3">
            <Card.Title className="flex items-center">
              <Calendar className="text-muted-foreground h-5 w-5 mr-2" />
              Schedule
            </Card.Title>
            <Button variant="outline" asChild size="sm">
              <Link href="/calendar">Show all</Link>
            </Button>
          </Card.Header>

          <div className="px-4 pb-3">
            <div className="bg-muted rounded-2xl py-1.5 flex items-center justify-center text-sm font-medium">
              {format(new Date(), "dd MMM, yyyy")}
            </div>
          </div>

          <Tabs className="px-2">
            <Tab segment="calendar" active="page$">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/">
                  <FileText /> Timetable
                </Link>
              </Button>
            </Tab>
            <Tab segment="calendar" active="children">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/calendar">
                  <Calendar /> Calendar
                </Link>
              </Button>
            </Tab>
          </Tabs>
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

        <div className="xl:row-span-2 space-y-6 xl:grid grid-rows-[auto,1fr]">
          {/* Weather */}
          {weather}

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
        </div>

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

export default DashboardLayout;

export const runtime = "edge";
export const preferredRegion = "lhr1";
