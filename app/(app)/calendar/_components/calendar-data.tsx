import { Markdown } from "@/components/markdown";
import { getEvents } from "@/models/event";

import Calendar from "./calendar";

const CalendarData = async () => {
  const events = await getEvents();

  return (
    <Calendar
      events={events.map((event) => ({
        markdown: <Markdown source={event.description || ""} />,
        ...event,
      }))}
    />
  );
};

export default CalendarData;
