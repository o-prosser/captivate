import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { Subject } from "@prisma/client";
import * as z from "zod";

import { prisma } from "@/lib/prisma";

const schema = z.object({
  doDate: z.string().nullable().optional(),
  dueDate: z.string().nullable().optional(),
  title: z.string().min(3),
  description: z.string().nullable().optional(),
  subject: z.nativeEnum(Subject).optional().nullable(),
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

    const task = await prisma.task.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        doDate: body.doDate ? new Date(body.doDate) : undefined,
        dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
        subject: body.subject as Subject,
      },
      select: {
        id: true,
      },
    });

    revalidatePath("/tasks");
    if (!task.id) return new Response("Unable to update", { status: 500 });
    return NextResponse.json({ task });
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

    const task = await prisma.task.delete({
      where: { id: params.id },
    });

    revalidatePath("/tasks");
    if (!task.id) return new Response("Unable to delete", { status: 500 });
    return NextResponse.json({ task: { id: params.id } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    return NextResponse.json(error, { status: 500 });
  }
};
