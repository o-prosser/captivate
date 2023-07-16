"use client";

import { Accordion, Button, Card, Input, Label } from "@/ui";
import Task from "./task";
import { experimental_useOptimistic } from "react";
import React, { useRef } from "react";
import { Subject } from "@prisma/client";
import { quickCreate } from "./actions";

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
        <Label>Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          required
          className="w-full max-w-sm mr-4 ml-2"
        />
        <Button type="submit">Add task</Button>
      </form>

      <Card.Root className="mt-6">
        <Card.Header>
          <Card.Title>Do today</Card.Title>
        </Card.Header>
        <Card.Content>
          <Accordion.Root type="single" collapsible>
            {optimisticTasks.map((task, key) => (
              <Task task={task} key={key} />
            ))}
          </Accordion.Root>
        </Card.Content>
      </Card.Root>
    </>
  );
};

export default Tasks;