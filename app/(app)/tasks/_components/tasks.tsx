"use client";

import { experimental_useOptimistic, useRef } from "react";
import { Subject } from "@prisma/client";
import clsx from "clsx";
import { isToday } from "date-fns";
import { Plus } from "lucide-react";

import { useSubjectStyles } from "@/util/subjects";
import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import { Input } from "@/ui/input";
import AddTask from "@/components/add-task";

import { quickCreate } from "../actions";
import Task from "./task";

const Tasks = ({
  tasks,
  userId,
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
  userId: string;
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
    {
      title: string;
      dueDate?: Date | null;
      doDate?: Date | null;
      subject?: Subject | null;
    }
  >(tasks, (state, newTask) => [
    ...state,
    {
      id: undefined,
      title: newTask.title,
      dueDate: newTask.dueDate,
      doDate: newTask.doDate,
      subject: newTask.subject,
    },
  ]);

  const todoTasks = optimisticTasks.filter(
    (task) =>
      (task.doDate && isToday(task.doDate)) ||
      (task.dueDate && isToday(task.dueDate))
  );

  const formRef = useRef<HTMLFormElement>(null);

  const maths = useSubjectStyles('maths');
  const chemistry = useSubjectStyles('chemistry');
  const physics = useSubjectStyles('physics');

  return (
    <>
      <form
        className="flex items-center mt-6"
        action={async (formData) => {
          const title = formData.get("title");
          formRef.current?.reset();
          addOptimisticTask({ title: title as string });
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mt-6">
        <Card.Root>
          <Card.Header className="flex-row space-y-0 -mr-3 py-3">
            <Card.Title className="flex-1 inline-flex items-center">
              <div className="h-[15px] w-[15px] rounded-full bg-muted-foreground mr-2" />
              Todo
            </Card.Title>
            <Button variant="ghost" size="icon">
              <Plus />
            </Button>
          </Card.Header>

          <Card.Content>
            {todoTasks.map((task, key) => (
              <Task key={key} task={task} />
            ))}
          </Card.Content>
        </Card.Root>

        {[{name:"Maths", ...maths}, {name: "Chemistry", ...chemistry}, {name: "Physics", ...physics}].map((subject, key) => (
            <Card.Root key={key}>
              <Card.Header className="flex-row space-y-0 -mr-3 py-3">
                <Card.Title className="flex-1 inline-flex items-center capitalize">
                  <subject.SubjectIcon
                    className={clsx("h-5 w-5 mr-2", subject.subjectColor)}
                  />
                  {subject.name}
                </Card.Title>
                <AddTask
                  trigger={
                    <Button variant="ghost" size="icon">
                      <Plus />
                    </Button>
                  }
                  userId={userId}
                  addOptimisticTask={addOptimisticTask}
                  defaultData={{ subject: subject.name }}
                />
              </Card.Header>

              <Card.Content>
                {optimisticTasks
                  .filter((task) => task.subject === subject.name)
                  .map((task, key) => (
                    <Task key={key} task={task} />
                  ))}
              </Card.Content>
            </Card.Root>
          )
        )}
      </div>
    </>
  );
};

export default Tasks;
