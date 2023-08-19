"use client";

import { Task } from "@/drizzle/schema";

import { Checkbox } from "@/ui/checkbox";

import { toggleComplete } from "../actions";

const TaskCheck = ({ task }: { task: Pick<Task, "id"> }) => {
  return (
    <Checkbox
      onClick={async () => {
        await toggleComplete(task.id);
      }}
    />
  );
};

export default TaskCheck;
