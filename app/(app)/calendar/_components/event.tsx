import { Markdown } from "@/components/markdown";
import { Event } from "@/drizzle/schema";
import { format } from "date-fns";

const Event =  ({ event }: { event: Pick<Event, "title"|"description"|"start"> }) => {
  return (
    <>
      <p className="text-muted-foreground text-sm mt-3">{format(event.start, "d MMMM y")}</p>

      <div className="mt-4">
        <Markdown source={event.description || ""} />
      </div>
    </>
  );
};

export default Event;
