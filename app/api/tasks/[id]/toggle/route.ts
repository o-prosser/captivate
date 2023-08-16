import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { tasksTable } from "@/drizzle/schema";
import * as z from "zod";

import { db, eq } from "@/lib/db";

const contextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const PATCH = async (req: Request, context: unknown) => {
  try {
    const { params } = contextSchema.parse(context);

    const task = await db
      .select({ completed: tasksTable.completed })
      .from(tasksTable)
      .where(eq(tasksTable.id, params.id));
    if (!task[0]) throw new Error("Not found");

    await db
      .update(tasksTable)
      .set({ completed: !task[0].completed })
      .where(eq(tasksTable.id, params.id));

    revalidatePath("/tasks");
    return NextResponse.json({ task: params });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    return NextResponse.json(error, { status: 500 });
  }
};
