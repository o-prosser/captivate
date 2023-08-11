import { Suspense } from "react";
import { parse } from "date-fns";

import { Loading } from "@/ui/loading";
import { Markdown } from "@/components/markdown";
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
        <Calendar
          events={events.map((event) => ({
            markdown: <Markdown source={event.description || ""} />,
            ...event,
          }))}
          activeDate={activeDate}
        />
      </Suspense>
    );
};

export default MonthPage;
