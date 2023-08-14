import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";

import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import { RouteSheet } from "@/ui/route-sheet";
import { Heading } from "@/ui/typography";
import { selectEvent } from "@/models/event";
import DeleteEvent from "@/app/(app)/calendar/_components/delete-event";
import Event from "@/app/(app)/calendar/_components/event";

const EventPage = async ({ params }: { params: { id: string } }) => {
  const event = await selectEvent(params);
  if (!event) notFound();

  return (
    <RouteSheet>
      <div className="h-full flex flex-col space-y-4">
        <div className="flex-1">
          <Heading level={2}>{event.title}</Heading>
          <Event event={event} />
        </div>
        <Button asChild className="w-full">
          <Link
            href={`/calendar/${format(new Date(), "yyyy-MM-dd")}/month/edit/${
              event.id
            }/`}
          >
            Edit event
          </Link>
        </Button>
        <DeleteEvent id={event.id} />
      </div>
      {/* <Suspense fallback={<>Loading</>}> */}
      {/* </Suspense> */}
    </RouteSheet>
  );
};

export default EventPage;
