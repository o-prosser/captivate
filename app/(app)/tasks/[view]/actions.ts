"use server";

import { tasksTable } from "@/drizzle/schema";

import { and, db, eq } from "@/lib/db";
import { getValidSession } from "@/util/session";

export const toggleComplete = async (id: string) => {
  "use server";

  const { user } = await getValidSession();

  const task = await db
    .select({ completed: tasksTable.completed })
    .from(tasksTable)
    .where(and(eq(tasksTable.userId, user.id), eq(tasksTable.id, id)));
  if (!task) throw new Error();

  await db
    .update(tasksTable)
    .set({ completed: !task[0].completed })
    .where(eq(tasksTable.id, id));
};
