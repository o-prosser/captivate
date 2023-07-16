"use client";

import { Accordion, Button, Pill, Text } from "@/ui";
import { Subject } from "@prisma/client";
import { parseSubjectName } from "@/util/subjects";
import { AccordionHeader, AccordionTrigger } from "@radix-ui/react-accordion";
import { CalendarIcon, CircleEllipsisIcon } from "lucide-react";
import format from "date-fns/format";
import { useState } from "react";
import { cn } from "@/util";
import { AnimatePresence, motion } from "framer-motion";
import DeleteTask from "./delete-task";
import EditTask from "./edit-task";

const Task = ({
  task,
}: {
  task: {
    id?: string;
    completed?: boolean;
    dueDate?: Date | null;
    doDate?: Date | null;
    title: string;
    subject?: Subject | null;
    description?: string | null;
    markdown?: React.ReactNode;
  };
}) => {
  const [completed, setCompleted] = useState(task.completed);

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

  if (typeof task.id === "undefined")
    return (
      <div className="flex items-center h-16 space-x-3">
        <Button
          variant={null}
          size={null}
          disabled
          onClick={toggle}
          className={cn(
            "h-4 w-4 shrink-0 rounded-md border border-primary [&>svg]:!mr-0",
          )}
        ></Button>
        <p className="font-medium text-sm flex-1">{task.title}</p>
      </div>
    );

  return (
    <Accordion.Item value={task.id}>
      <AccordionHeader className="flex items-center h-16 space-x-3">
        <Button
          variant={null}
          size={null}
          onClick={toggle}
          className={cn(
            "h-4 w-4 shrink-0 rounded-md border border-primary [&>svg]:!mr-0",
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
        {task.subject ? (
          <Pill
            color={parseSubjectName(task.subject.toLowerCase()) || undefined}
            className="mt-0"
          >
            {task.subject}
          </Pill>
        ) : (
          ""
        )}
        <p className="font-medium text-sm flex-1">{task.title}</p>
        <AccordionTrigger asChild>
          <Button variant="ghost" size="icon">
            <CircleEllipsisIcon />
          </Button>
        </AccordionTrigger>
      </AccordionHeader>
      <Accordion.Content className="pl-7 pb-4">
        {task.description ? <Text>{task.markdown}</Text> : ""}

        <div className="flex items-center mt-3 space-x-1">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Do date:</span>
          <span>
            {task.doDate
              ? format(task.doDate, "E do LLLL, y")
              : "No do date specified."}
          </span>
        </div>
        <div className="flex items-center mt-2 space-x-1">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">Due date:</span>
          <span>
            {task.dueDate
              ? format(task.dueDate, "E do LLLL, y")
              : "No due date specified."}
          </span>
        </div>

        <div className="flex space-x-2 mt-4">
          <EditTask task={task} />
          <DeleteTask id={task.id} />
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
};

export default Task;
