import Link from "next/link";
import { notFound } from "next/navigation";
import clsx from "clsx";
import { format } from "date-fns";

import { displayCurrentWeek } from "@/util/weeks";
import { Button } from "@/ui/button";
import { Heading, Text } from "@/ui/typography";

import Tabs from "../../_components/tabs";

export const metadata = {
  title: "Timetable",
};

const TimetableLayout = ({
  params,
  children,
}: {
  params: { week: string };
  children: React.ReactNode;
}) => {
  if (params.week !== "1" && params.week !== "2") notFound();

  return (
    <>
      <Heading>
        <span className="print:hidden">Timetable</span>
        <span className="hidden print:inline">Week {params.week}</span>
      </Heading>
      <Text className="text-muted-foreground !mt-2 print:hidden">
        It&apos;s {format(new Date(), "EEEE, 'the' do 'of' MMMM y")} &mdash;{" "}
        {displayCurrentWeek()}
      </Text>

      <div className="flex gap-2 my-6 print:hidden">
        <Button
          variant="outline"
          asChild
          aria-selected={params.week === "1"}
          className="aria-selected:border-primary aria-selected:hover:bg-transparent aria-selected:hover:text-foreground"
        >
          <Link href={`/calendar/timetable/1`}>Week 1</Link>
        </Button>
        <Button
          variant="outline"
          asChild
          aria-selected={params.week === "2"}
          className="aria-selected:border-primary aria-selected:hover:bg-transparent aria-selected:hover:text-foreground"
        >
          <Link href={`/calendar/timetable/2`}>Week 2</Link>
        </Button>
      </div>

      <Tabs active="timetable" />

      <div className="mt-6">{children}</div>
    </>
  );
};

export default TimetableLayout;
