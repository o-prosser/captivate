"use server";

import { revalidatePath } from "next/cache";
import { usersTable } from "@/drizzle/schema";
import { object, string } from "zod";

import { db, eq } from "@/lib/db";

export const updateUser = async (formData: FormData) => {
  const updateSchema = object({
    id: string().min(3),
    name: string().nullable(),
    email: string().min(3).email(),
    username: string().nullable(),
    image: string().nullable(),
  });

  const data = updateSchema.parse(Object.fromEntries(formData.entries()));

  await db.update(usersTable).set(data).where(eq(usersTable.id, data.id));

  revalidatePath("/settings");
};
