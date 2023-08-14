"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getValidSession } from "@/util/session";

export const quickCreate = async (title: string) => {
  const { user } = await getValidSession();

  const task = await prisma.task.create({
    data: {
      title,
      userId: user.id,
    },
    select: {
      id: true,
    },
  });

  revalidatePath("/tasks");
};
