import { Suspense } from "react";
import { parse } from "date-fns";

import { Loading } from "@/ui/loading";
import { selectEvents } from "@/models/event";

import Calendar from "../../_components/calendar";

export const metadata = {
  title: "Calendar",
};

const MonthPage = async ({
  params,
  searchParams,
}: {
  params: { date: string; view: string };
  searchParams: Record<string, string>;
}) => {
  const activeDate = parse(params.date, "yyyy-MM-dd", new Date());

  const events = await selectEvents({
    search: searchParams.search,
    activeDate,
  });

  if (params.view === "month")
    return (
      <Suspense fallback={<Loading text="Loading calendar events..." />}>
        <Calendar events={events} activeDate={activeDate} />
      </Suspense>
    );
};

export default MonthPage;

export const runtime = "edge";
export const preferredRegion = "lhr1";
export const revalidate = 3600;
