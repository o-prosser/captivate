import { cache } from "react";
import { tasksTable } from "@/drizzle/schema/tasks";
import type { Task } from "@/drizzle/schema/tasks";

import { and, asc, db, eq } from "@/lib/db";
import { getValidSession } from "@/util/session";

export const selectTasks = cache(async () => {
  const { user } = await getValidSession();

  const tasks = await db
    .select({
      id: tasksTable.id,
      completed: tasksTable.completed,
      dueDate: tasksTable.dueDate,
      doDate: tasksTable.doDate,
      title: tasksTable.title,
      subjectId: tasksTable.subjectId,
      description: tasksTable.description,
    })
    .from(tasksTable)
    .where(and(eq(tasksTable.userId, user.id), eq(tasksTable.completed, false)))
    .orderBy(asc(tasksTable.createdAt));

  return tasks;
});

export const selectTask = cache(async ({ id }: { id: Task["id"] }) => {
  const { user } = await getValidSession();

  const task = (
    await db
      .select()
      .from(tasksTable)
      .where(and(eq(tasksTable.userId, user.id), eq(tasksTable.id, id)))
      .limit(1)
  )[0];

  return task;
});
