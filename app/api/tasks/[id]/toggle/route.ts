import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import * as z from "zod";

import { prisma } from "@/lib/prisma";

const contextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const PATCH = async (req: Request, context: unknown) => {
  try {
    const { params } = contextSchema.parse(context);

    const { completed } = await prisma.task.findUniqueOrThrow({
      where: params,
    });

    await prisma.task.update({
      where: params,
      data: {
        completed: !completed,
      },
    });

    revalidatePath("/tasks");
    return NextResponse.json({ task: params });
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
