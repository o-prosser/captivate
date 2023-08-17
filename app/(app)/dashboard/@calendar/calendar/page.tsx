import { format, isToday, isTomorrow } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { createVar } from "@/util/cn";
import { isAllDay } from "@/util/time";
import { Pill } from "@/ui/pill";
import { Placeholder } from "@/ui/placeholder";
import { Text } from "@/ui/typography";
import { selectEvents } from "@/models/event";

import { EventPlaceholder } from "./placeholder";

const Calendar = async () => {
  const events = await selectEvents({ activeDate: new Date(), area: "days" });

  return events.length > 0 ? (
    <div className="space-y-2">
      {events.map((event, key) => (
        <div
          key={key}
          style={createVar({
            "--subject": `var(--${event.subject || "muted-foreground"})`,
          })}
          className="bg-gradient-to-b from-subject/30 to-subject/10 rounded-2xl py-3 px-4"
        >
          <div className="flex items-start justify-between">
            <Text className="font-semibold leading-6 text-subject capitalize brightness-50">
              {event.title}
            </Text>
            {event.subject ? (
              <Pill className="!m-0" outline="subject" color={null}>
                {event.subject}
              </Pill>
            ) : (
              ""
            )}
          </div>
          <div className="text-subject text-sm brightness-50">
            {isToday(event.start)
              ? "Today"
              : isTomorrow(event.start)
              ? "Tomorrow"
              : format(event.start, "dd MMM, yyyy")}{" "}
            {!isAllDay(event.start, event.end) ? (
              <>
                {format(event.start, `h:mm`)} &ndash;{" "}
                {format(event.end, "h:mm aa")}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="relative">
      <EventPlaceholder />
      <EventPlaceholder />
      <EventPlaceholder />
      <EventPlaceholder />
      <Placeholder>
        <CalendarIcon />
        <Placeholder.Title>Nothing to do?</Placeholder.Title>
        <Placeholder.Text>
          Lucky thing! You&apos;ve got nothing important to do today &emdash;
          unless you look at your tasks...
        </Placeholder.Text>
      </Placeholder>
    </div>
  );
};

export default Calendar;
export const runtime = "edge";
