"use client";

import { useState } from "react";
import { ArrowRight, ChevronsUpDown, Clock, Hourglass } from "lucide-react";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Switch } from "@/ui/switch";

const Time = () => {
  const [allDay, setAllDay] = useState(true);

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Input
          icon={Clock}
          type="time"
          name="start"
          placeholder="Start time"
          disabled={allDay}
        />
        <Input
          icon={ArrowRight}
          type="time"
          name="end"
          placeholder="End time"
          disabled={allDay}
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
