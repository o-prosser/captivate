"use client";

import { experimental_useOptimistic, useRef } from "react";
import { Subject } from "@prisma/client";
import { isPast, isToday } from "date-fns";
import isFuture from "date-fns/isFuture";

import * as Accordion from "@/ui/accordion";
import { Button } from "@/ui/button";
import { Callout } from "@/ui/callout";
import * as Card from "@/ui/card";
import { Input } from "@/ui/input";

import { quickCreate } from "../actions";
import Task from "./task";

const Tasks = ({
  tasks,
}: {
  tasks: {
    id: string;
    completed: boolean;
    dueDate: Date | null;
    doDate: Date | null;
    title: string;
    subject: Subject | null;
    description: string | null;
    markdown: React.ReactNode;
  }[];
}) => {
  const [optimisticTasks, addOptimisticTask] = experimental_useOptimistic<
    {
      id?: string;
      completed?: boolean;
      dueDate?: Date | null;
      doDate?: Date | null;
      title: string;
      subject?: Subject | null;
      description?: string | null;
      markdown?: React.ReactNode | null;
    }[],
    unknown
  >(tasks, (state, newTask) => [
    ...state,
    { id: undefined, title: newTask as string },
  ]);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <form
        className="flex items-center mt-6"
        action={async (formData) => {
          const title = formData.get("title");
          formRef.current?.reset();
          addOptimisticTask(title);
          await quickCreate(title as string);
        }}
        ref={formRef}
      >
        <Input
          type="text"
          name="title"
          id="title"
          required
          className="w-full max-w-sm mr-4"
        />
        <Button type="submit">Add task</Button>
      </form>

      <Card.Root className="mt-6">
        <Card.Header>
          <Card.Title>Do today</Card.Title>
        </Card.Header>
        <Card.Content>
          {optimisticTasks.filter(
            (task) =>
              task.doDate && (isPast(task.doDate) || isToday(task.doDate))
          ).length > 0 ? (
            <Accordion.Root type="single" collapsible>
              {optimisticTasks
                .filter(
                  (task) =>
                    task.doDate && (isPast(task.doDate) || isToday(task.doDate))
                )
                .map((task, key) => (
                  <Task task={task} key={key} />
                ))}
            </Accordion.Root>
          ) : (
            <Callout emoji="🎉">
              No tasks left to do today. Sit back and relax &mdash; or add a new
              task.
            </Callout>
          )}
        </Card.Content>
      </Card.Root>

      <Card.Root className="mt-6">
        <Card.Header>
          <Card.Title>Due today</Card.Title>
        </Card.Header>
        <Card.Content>
          {optimisticTasks.filter(
            (task) =>
              task.dueDate && (isPast(task.dueDate) || isToday(task.dueDate))
          ).length > 0 ? (
            <Accordion.Root type="single" collapsible>
              {optimisticTasks
                .filter(
                  (task) =>
                    task.dueDate &&
                    (isPast(task.dueDate) || isToday(task.dueDate))
                )
                .map((task, key) => (
                  <Task task={task} key={key} />
                ))}
            </Accordion.Root>
          ) : (
            <Callout emoji="🎉">
              No tasks are due today. Check your to do list ⬆️
            </Callout>
          )}
        </Card.Content>
      </Card.Root>

      <Card.Root className="mt-6">
        <Card.Header>
          <Card.Title>Future</Card.Title>
        </Card.Header>
        <Card.Content>
          {optimisticTasks.filter(
            (task) =>
              (task.dueDate && isFuture(task.dueDate)) ||
              (task.doDate && isFuture(task.doDate)) ||
              (!task.doDate && !task.dueDate)
          ).length > 0 ? (
            <Accordion.Root type="single" collapsible>
              {optimisticTasks
                .filter(
                  (task) =>
                    (task.dueDate && isFuture(task.dueDate)) ||
                    (task.doDate && isFuture(task.doDate)) ||
                    (!task.doDate && !task.dueDate)
                )
                .map((task, key) => (
                  <Task task={task} key={key} timing="future" />
                ))}
            </Accordion.Root>
          ) : (
            <Callout emoji="🎉">
              No future tasks. Check your to do list ⬆️
            </Callout>
          )}
        </Card.Content>
      </Card.Root>
    </>
  );
};

export default Tasks;
