import { format, isToday, isTomorrow } from "date-fns";
import { CalendarIcon } from "lucide-react";

import type { SubjectPageProps } from "@/types/subjects";
import { isAllDay } from "@/util/time";
import { Pill } from "@/ui/pill";
import { Placeholder } from "@/ui/placeholder";
import { SubjectCard } from "@/ui/subject-card";
import { selectEvents } from "@/models/event";

import { EventPlaceholder } from "./placeholder";

const Calendar = async ({ params }: SubjectPageProps) => {
  const events = await selectEvents({
    activeDate: new Date(),
    area: "days",
    subjectId: params.subject,
  });

  return events.length > 0 ? (
    <div className="space-y-2">
      {events.map((event, key) => (
        <SubjectCard key={key} subject={event.subject}>
          <SubjectCard.Header>
            <div>
              <SubjectCard.Title>{event.title}</SubjectCard.Title>
              <SubjectCard.Description>
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
              </SubjectCard.Description>
            </div>
            {event.subject ? (
              <Pill className="!m-0" outline="subject" color={null}>
                {event.subject}
              </Pill>
            ) : (
              ""
            )}
          </SubjectCard.Header>
        </SubjectCard>
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
