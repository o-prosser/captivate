"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/util/session";

export const quickCreate = async (title: string) => {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error();

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
