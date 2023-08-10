import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { EventCategory, Subject } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import * as z from "zod";

import { prisma } from "@/lib/prisma";

const schema = z.object({
  userId: z.string(),
  date: z.string(),
  title: z.string().min(3),
  description: z.string().optional(),
  subject: z.nativeEnum(Subject).optional(),
  category: z.nativeEnum(EventCategory),
});

export const POST = async (req: Request) => {
  try {
    const json = await req.json();
    const body = await schema.parse(json);

    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        date: new Date(body.date),
        subject: body.subject as Subject,
        category: body.category as EventCategory,
        userId: body.userId,
      },
      select: {
        id: true,
      },
    });

    revalidatePath("/calendar");
    if (!event.id) return new Response("Unable to create", { status: 500 });
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
