"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

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
      className={cn(
        "h-4 w-4 mt-1.5 shrink-0 rounded-md border border-primary [&>svg]:!mr-0",
        completed && "bg-primary text-primary-foreground",
      )}
    >
      <AnimatePresence>
        {completed && (
          <motion.svg
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
            <motion.polyline
              initial={{ pathLength: -0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              points="20 6 9 17 4 12"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </Button>
  );
};
export { TaskCheck };
