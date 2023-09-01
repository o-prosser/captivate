import { notFound } from "next/navigation";
import { endOfMonth, parse, startOfMonth } from "date-fns";

import { selectEvents } from "@/models/event";

import Calendar from "../../_components/calendar";
import Week from "./_components/week";

export const metadata = {
  title: "Calendar",
};

export const generateStaticParams = () => {
  return [
    {
      view: "month",
    },
    {
      view: "week",
    },
  ];
};

const MonthPage = async ({
  params,
  searchParams,
}: {
  params: { date: string; view: string };
  searchParams: Record<string, string>;
}) => {
  if (params.view !== "month" && params.view !== "week") notFound();
  const activeDate = parse(params.date, "yyyy-MM-dd", new Date());

  const events = await selectEvents({
    search: searchParams.search,
    activeDate,
    area: params.view,
  });

  if (params.view === "month")
    return <Calendar events={events} activeDate={activeDate} />;

  if (params.view === "week")
    return <Week events={events} activeDate={activeDate} />;
};

export default MonthPage;

export const runtime = "edge";
export const preferredRegion = "lhr1";
export const revalidate = 3600;
