import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { tasksTable } from "@/drizzle/schema";
import * as z from "zod";

import { db, eq } from "@/lib/db";

const schema = z.object({
  doDate: z.string().nullable().optional(),
  dueDate: z.string().nullable().optional(),
  title: z.string().min(3),
  description: z.string().nullable().optional(),
  subject: z.string().optional().nullable(),
});

const contextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const PATCH = async (req: Request, context: any) => {
  try {
    const json = await req.json();
    const body = schema.parse(json);
    const { params } = contextSchema.parse(context);

    const task = await db
      .update(tasksTable)
      .set({
        title: body.title,
        description: body.description,
        doDate: body.doDate ? new Date(body.doDate) : undefined,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
        subjectId: body.subject,
      })
      .where(eq(tasksTable.id, params.id))
      .returning({ id: tasksTable.id });

    revalidatePath("/tasks");
    if (!task[0].id) return new Response("Unable to update", { status: 500 });
    return NextResponse.json({ task: task[0] });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    return NextResponse.json(error, { status: 500 });
  }
};

export const DELETE = async (req: Request, context: any) => {
  try {
    const { params } = contextSchema.parse(context);

    const task = await db
      .delete(tasksTable)
      .where(eq(tasksTable.id, params.id))
      .returning({ id: tasksTable.id });

    revalidatePath("/tasks");
    if (!task[0].id) return new Response("Unable to delete", { status: 500 });
    return NextResponse.json({ task: { id: params.id } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    return NextResponse.json(error, { status: 500 });
  }
};
