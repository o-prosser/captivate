"use client";

import { useState } from "react";
import type { Event } from "@/drizzle/schema";
import { format } from "date-fns";
import { ArrowRight, Clock } from "lucide-react";

import { isAllDay } from "@/util/time";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Switch } from "@/ui/switch";

const Time = ({ event }: { event: Pick<Event, "start" | "end"> }) => {
  const [allDay, setAllDay] = useState(isAllDay(event.start, event.end));

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Input
          icon={Clock}
          type="time"
          name="start"
          placeholder="Start time"
          disabled={allDay}
          defaultValue={
            isAllDay(event.start, event.end) ? "" : format(event.start, "HH:mm")
          }
        />
        <Input
          icon={ArrowRight}
          type="time"
          name="end"
          placeholder="End time"
          disabled={allDay}
          defaultValue={
            isAllDay(event.start, event.end) ? "" : format(event.end, "HH:mm")
          }
        />
      </div>

      <Label htmlFor="allDay" className="flex items-center gap-2">
        <Switch
          checked={allDay}
          onCheckedChange={setAllDay}
          name="allDay"
          id="allDay"
        />
        All day
      </Label>
    </>
  );
};

export default Time;
