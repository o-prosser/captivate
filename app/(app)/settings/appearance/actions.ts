"use server";

import { revalidatePath } from "next/cache";
import { usersTable } from "@/drizzle/schema";

import { db, eq } from "@/lib/db";
import { getValidSession } from "@/util/session";

export const updateTheme = async (theme: string) => {
  const { user } = await getValidSession();

  await db.update(usersTable).set({ theme }).where(eq(usersTable.id, user.id));

  revalidatePath("/settings/appearance");
};
