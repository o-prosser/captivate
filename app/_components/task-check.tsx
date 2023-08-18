"use client";

import * as React from "react";

import { cn } from "@/util/cn";
import { Button } from "@/ui/button";

const TaskCheck = ({ task }: { task: { id: string; completed: boolean } }) => {
  const [completed, setCompleted] = React.useState(task.completed);

  const toggle = async () => {
    try {
      setCompleted(!completed);

      const response = await fetch(`/api/tasks/${task.id}/toggle`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      variant={null}
      size={null}
      onClick={toggle}
      data-completed={completed}
      className={cn(
        "h-4 w-4 mt-1.5 shrink-0 rounded-md border border-primary [&>svg]:!mr-0 group",
        completed && "bg-primary text-primary-foreground",
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline
          className="group-data-[completed=false]:[pathlength:0] transition-all group-data-[completed=true]:[pathLength:1]"
          points="20 6 9 17 4 12"
        />
      </svg>
    </Button>
  );
};
export { TaskCheck };
