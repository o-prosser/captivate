import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { tasksTable } from "@/drizzle/schema";
import * as z from "zod";

import { db } from "@/lib/db";

const schema = z.object({
  userId: z.string(),
  doDate: z.string(),
  dueDate: z.string(),
  title: z.string().min(3),
  description: z.string().nullable(),
  subject: z.string().nullable(),
});

export const POST = async (req: Request) => {
  try {
    const json = await req.json();
    const body = schema.parse(json);

    const task = await db
      .insert(tasksTable)
      .values({
        title: body.title,
        description: body.description,
        doDate: new Date(body.doDate),
        dueDate: new Date(body.dueDate),
        subjectId: body.subject,
        userId: body.userId,
      })
      .returning({ id: tasksTable.id });

    revalidatePath("/tasks");
    if (!task[0].id) return new Response("Unable to create", { status: 500 });
    return NextResponse.json({ task: task[0] });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    return NextResponse.json(error, { status: 500 });
  }
};
