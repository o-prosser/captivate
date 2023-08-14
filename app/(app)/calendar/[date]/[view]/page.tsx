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
}: {
  params: { date: string; view: string };
}) => {
  const events = await selectEvents();

  const activeDate = parse(params.date, "yyyy-MM-dd", new Date());

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
