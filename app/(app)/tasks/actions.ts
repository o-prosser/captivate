"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export const quickCreate = async (title: string) => {
  const { user } = await getSession();

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
