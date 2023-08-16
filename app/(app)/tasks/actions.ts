"use server";

import { revalidatePath } from "next/cache";
import { tasksTable } from "@/drizzle/schema";

import { db } from "@/lib/db";
import { getValidSession } from "@/util/session";

export const quickCreate = async (title: string) => {
  const { user } = await getValidSession();

  const task = await db.insert(tasksTable).values({
    title,
    userId: user.id,
  });

  revalidatePath("/tasks");
};
