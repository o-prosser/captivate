import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { EventCategory, Subject } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import * as z from "zod";

import { prisma } from "@/lib/prisma";

const schema = z.object({
  date: z.string(),
  title: z.string().min(3),
  description: z.string().optional(),
  subject: z.nativeEnum(Subject).optional().nullable(),
  category: z.nativeEnum(EventCategory),
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

    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        title: body.title,
        description: body.description,
        date: new Date(body.date),
        subject: body.subject as Subject,
        category: body.category as EventCategory,
      },
      select: {
        id: true,
      },
    });

    revalidatePath("/calendar");
    if (!event.id) return new Response("Unable to update", { status: 500 });
    return NextResponse.json({ event });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    if (error instanceof PrismaClientValidationError) {
      return NextResponse.json("PrismaClientValidationError", { status: 422 });
    }

    return NextResponse.json(error, { status: 500 });
  }
};

export const DELETE = async (req: Request, context: any) => {
  try {
    const { params } = contextSchema.parse(context);

    const event = await prisma.event.delete({
      where: { id: params.id },
    });

    revalidatePath("/calendar");
    if (!event.id) return new Response("Unable to delete", { status: 500 });
    return NextResponse.json({ event: { id: params.id } });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }

    if (error instanceof PrismaClientValidationError) {
      return NextResponse.json("PrismaClientValidationError", { status: 422 });
    }

    return NextResponse.json(error, { status: 500 });
  }
};
