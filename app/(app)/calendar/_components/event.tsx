import { EventCategory, Subject } from "@prisma/client";

import { parseSubjectName } from "@/util/subjects";
import { Button } from "@/ui/button";
import * as Dialog from "@/ui/dialog";
import { Pill } from "@/ui/pill";

import DeleteEvent from "./delete-event";
import EditEvent from "./edit-event";

const Event = ({
  event,
}: {
  event: {
    id: string;
    date: Date;
    title: string;
    subject: Subject | null;
    category: EventCategory;
    description: string | null;
    markdown: React.ReactNode;
  };
}) => {
  return (
    <div className="px-1 pt-1">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button
            variant="link"
            className="justify-start text-sm text-left"
            size={null}
          >
            {event.title}
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
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
            <Dialog.Title className="mt-2">{event.title}</Dialog.Title>
            <Dialog.Description>{event.markdown}</Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <DeleteEvent id={event.id} />
            <EditEvent event={event} />
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default Event;
