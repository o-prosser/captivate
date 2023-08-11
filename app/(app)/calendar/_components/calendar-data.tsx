import { Markdown } from "@/components/markdown";
import { selectEvents } from "@/models/event";

import Calendar from "./calendar";

const CalendarData = async () => {
  const events = await selectEvents();

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
