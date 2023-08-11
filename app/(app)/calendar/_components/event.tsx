import { parseSubjectName } from "@/util/subjects";
import { Button } from "@/ui/button";
import { Pill } from "@/ui/pill";
import * as Sheet from "@/ui/sheet";

import DeleteEvent from "./delete-event";
import EditEvent from "./edit-event";

const Event = ({
  event,
}: {
  event: {
    id: string;
    date: Date;
    title: string;
    subject: string | null;
    category: "Test" | "Meeting" | "School" | "Other";
    description: string | null;
    markdown: React.ReactNode;
  };
}) => {
  return (
    <div className="px-1 pt-1 w-full">
      <Sheet.Root>
        <Sheet.Trigger asChild>
          <Button
            variant={null}
            style={
              {
                "--subject": `var(--${event.subject || "muted"}) ${
                  event.subject ? "/ 0.2" : ""
                }`,
              } as React.CSSProperties
            }
            className="justify-start w-full py-1 px-2 text-sm text-left bg-[hsl(var(--subject))] hover:opacity-90 transition"
            size={null}
          >
            {event.title}
          </Button>
        </Sheet.Trigger>
        <Sheet.Content>
          <Sheet.Header>
            <div className="inline-flex pb-1">
              {event.subject ? (
                <Pill color={parseSubjectName(event.subject) || undefined}>
                  {event.subject}
                </Pill>
              ) : (
                ""
              )}
              <Pill>{event.category}</Pill>
            </div>
            <Sheet.Title className="mt-2">{event.title}</Sheet.Title>
            <Sheet.Description>{event.markdown}</Sheet.Description>
          </Sheet.Header>
          <Sheet.Footer>
            <DeleteEvent id={event.id} />
            <EditEvent event={event} />
          </Sheet.Footer>
        </Sheet.Content>
      </Sheet.Root>
    </div>
  );
};

export default Event;
