import Link from "next/link";
import { notFound } from "next/navigation";
import clsx from "clsx";
import { addMonths, parse, subMonths } from "date-fns";
import format from "date-fns/format";
import {
  Calendar as CalendarIcon,
  CalendarRange,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

import { displayCurrentWeek } from "@/util/weeks";
import { Button } from "@/ui/button";
import * as DropdownMenu from "@/ui/dropdown-menu";
import { Heading, Text } from "@/ui/typography";

import Tabs from "../../_components/tabs";
import Search from "./_components/search";

export const metadata = {
  title: "Calendar",
};

const CalendarLayout = async ({
  params,
  children,
  modal,
}: {
  params: { view: string; date: string };
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  if (params.view !== "week" && params.view !== "month") notFound();

  const activeDate = parse(params.date, "yyyy-MM-dd", new Date());

  return (
    <div
      className={clsx(
        params.view === "week" &&
          "flex flex-col max-h-[calc(100dvh-13rem)] md:max-h-[calc(100dvh-8rem)]",
      )}
    >
      <Heading>Calendar</Heading>
      <Text className="text-muted-foreground !mt-2">
        It&apos;s {format(new Date(), "EEEE, 'the' do 'of' MMMM y")} &mdash;{" "}
        {displayCurrentWeek()}
      </Text>

      <div className="flex gap-2 my-6 flex-wrap">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline" className="capitalize">
              {params.view === "month" ? <CalendarIcon /> : <CalendarRange />}
              {params.view}
              <ChevronDown className="text-muted-foreground" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item asChild>
              <Link
                href={`/calendar/${format(activeDate, "yyyy-MM-dd")}/month`}
              >
                <CalendarIcon />
                Month
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <Link href={`/calendar/${format(activeDate, "yyyy-MM-dd")}/week`}>
                <CalendarRange />
                Week
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <Button variant="outline" asChild>
          <Link
            href={`/calendar/${format(new Date(), "yyyy-MM-dd")}/${
              params.view
            }`}
          >
            Today
          </Link>
        </Button>
        <Button
          variant="outline"
          asChild
          size="icon"
          className="rounded-r-none"
        >
          <Link
            href={`/calendar/${format(
              subMonths(activeDate, 1),
              "yyyy-MM-dd",
            )}/${params.view}`}
          >
            <ChevronLeft />
          </Link>
        </Button>
        <Button
          variant="outline"
          asChild
          size="icon"
          className="-ml-[9px] rounded-l-none"
        >
          <Link
            href={`/calendar/${format(
              addMonths(activeDate, 1),
              "yyyy-MM-dd",
            )}/${params.view}`}
          >
            <ChevronRight />
          </Link>
        </Button>

        <div className="flex-1" />

        <Search />

        <Button asChild>
          <Link href={`/calendar/${params.date}/${params.view}/events/create`}>
            <Plus />
            Add event
          </Link>
        </Button>
      </div>

      <Tabs active="calendar" />

      <div
        className={clsx(
          params.view === "week" && "h-full overflow-hidden flex-1",
        )}
      >
        {children}
      </div>
      {modal}
    </div>
  );
};

export default CalendarLayout;
export const revalidate = "edge";
