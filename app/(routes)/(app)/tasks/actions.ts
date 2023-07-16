"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/util/session";
import { revalidatePath } from "next/cache";

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
