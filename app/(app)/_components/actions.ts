"use server";

import { tasksTable } from "@/drizzle/schema";

import { db } from "@/lib/db";
import { getValidSession } from "@/util/session";

export const createTask = async (title: string) => {
  const { user } = await getValidSession();

  await db
    .insert(tasksTable)
    .values({ title, userId: user.id, subjectId: "chemistry" });
};
