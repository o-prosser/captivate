"use client";

import { useState } from "react";
import { Subject } from "@prisma/client";
import { AccordionHeader, AccordionTrigger } from "@radix-ui/react-accordion";
import { isTomorrow } from "date-fns";
import { differenceInDays } from "date-fns/esm";
import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";
import isPast from "date-fns/isPast";
import isToday from "date-fns/isToday";
import { AnimatePresence, m } from "framer-motion";
import {
  CalendarIcon,
  CheckIcon,
  CircleEllipsisIcon,
  MessageCircleIcon,
} from "lucide-react";

import { cn } from "@/util/cn";
import { parseSubjectName } from "@/util/subjects";
import * as Accordion from "@/ui/accordion";
import { Button } from "@/ui/button";
import { Pill } from "@/ui/pill";
import * as Sheet from "@/ui/sheet";
import { Text } from "@/ui/typography";

import DeleteTask from "./delete-task";
import EditTask from "./edit-task";

const Task = ({
  task,
  timing = "past",
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
  timing?: string;
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
      <Button
        size={null}
        variant="outline"
        className="block bg-muted/30 w-full hover:text-foreground"
      >
        <div className="flex flex-col space-y-1 items-start py-3 px-4">
          <h5 className="font-medium">{task.title}</h5>
          {task.subject ? (
            <Pill color={parseSubjectName(task.subject) || undefined}>
              {task.subject}
            </Pill>
          ) : (
            ""
          )}
        </div>
        <div className="border-t flex items-center py-2 px-4">
          <MessageCircleIcon className="h-4 w-4 text-muted-foreground mr-1" />
          <span className="text-sm flex-1 text-left">1</span>

          <span className="text-xs">
            {task.dueDate ? (
              <>
                {isToday(task.dueDate) ? (
                  <span className="text-destructive">Today</span>
                ) : (
                  ""
                )}
                {isTomorrow(task.dueDate) ? (
                  <span className="text-[hsl(24_92.4%_24.0%)]">Tomorrow</span>
                ) : (
                  ""
                )}
                {!isToday(task.dueDate) && !isTomorrow(task.dueDate) ? (
                  <span>{formatDistance(task.dueDate, new Date())}</span>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </span>
        </div>
      </Button>
    );

  return (
    <Sheet.Root>
      <Sheet.Trigger asChild>
        <Button
          size={null}
          variant="outline"
          className="block bg-muted/30 w-full hover:text-foreground"
        >
          <div className="flex flex-col space-y-1 items-start py-3 px-4">
            <h5 className="font-medium">{task.title}</h5>
            {task.subject ? (
              <Pill color={parseSubjectName(task.subject) || undefined}>
                {task.subject}
              </Pill>
            ) : (
              ""
            )}
          </div>
          <div className="border-t flex items-center py-2 px-4">
            <MessageCircleIcon className="h-4 w-4 text-muted-foreground mr-1" />
            <span className="text-sm flex-1 text-left">1</span>

            <span className="text-xs">
              {task.dueDate ? (
                <>
                  {isToday(task.dueDate) ? (
                    <span className="text-destructive">Today</span>
                  ) : (
                    ""
                  )}
                  {isTomorrow(task.dueDate) ? (
                    <span className="text-[hsl(24_92.4%_24.0%)]">Tomorrow</span>
                  ) : (
                    ""
                  )}
                  {!isToday(task.dueDate) && !isTomorrow(task.dueDate) ? (
                    <span>{formatDistance(task.dueDate, new Date())}</span>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </span>
          </div>
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="right" className="flex flex-col">
        <Sheet.Header>
          <Sheet.Title>{task.title}</Sheet.Title>
          <div>
            {task.subject ? (
              <Pill color={parseSubjectName(task.subject) || undefined}>
                {task.subject}
              </Pill>
            ) : (
              ""
            )}
          </div>
        </Sheet.Header>

        <div className="flex-1">
          {task.dueDate ? (
            <p className="text-sm flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>Due</span>
              <>
                {isToday(task.dueDate) ? (
                  <span className="text-destructive">Today</span>
                ) : (
                  ""
                )}
                {isTomorrow(task.dueDate) ? (
                  <span className="text-[hsl(24_92.4%_24.0%)]">Tomorrow</span>
                ) : (
                  ""
                )}
                {!isToday(task.dueDate) && !isTomorrow(task.dueDate) ? (
                  <span>{formatDistance(task.dueDate, new Date())}</span>
                ) : (
                  ""
                )}
              </>
            </p>
          ) : (
            ""
          )}

          {task.doDate ? (
            <p className="text-sm flex items-center space-x-2 mt-3">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span>Do</span>
              <>
                {isToday(task.doDate) ? (
                  <span className="text-destructive">Today</span>
                ) : (
                  ""
                )}
                {isTomorrow(task.doDate) ? (
                  <span className="text-[hsl(24_92.4%_24.0%)]">Tomorrow</span>
                ) : (
                  ""
                )}
                {!isToday(task.doDate) && !isTomorrow(task.doDate) ? (
                  <span>{formatDistance(task.doDate, new Date())}</span>
                ) : (
                  ""
                )}
              </>
            </p>
          ) : (
            ""
          )}

          <hr className="my-6" />

          <Text className="!mt-0">{task.markdown}</Text>
        </div>

        <Sheet.Footer>
          <Button variant="outline" className="w-full" onClick={toggle}>
            <CheckIcon />
            Mark as completed
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  );
};

export default Task;
