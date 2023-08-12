import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { EventCategory, Subject } from "@prisma/client";
import * as z from "zod";

import { prisma } from "@/lib/prisma";

const schema = z.object({
  userId: z.string(),
  doDate: z.string(),
  dueDate: z.string(),
  title: z.string().min(3),
  description: z.string().nullable(),
  subject: z.nativeEnum(Subject).nullable(),
});

export const POST = async (req: Request) => {
  try {
    const json = await req.json();
    const body = schema.parse(json);

    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        doDate: new Date(body.doDate),
        dueDate: new Date(body.dueDate),
        subject: body.subject as Subject,
        userId: body.userId,
      },
      select: {
        id: true,
      },
    });

    revalidatePath("/tasks");
    if (!task.id) return new Response("Unable to create", { status: 500 });
    return NextResponse.json({ task });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    return NextResponse.json(error, { status: 500 });
  }
};
