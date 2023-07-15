"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateCompleted = async (task: {
  id: string;
  completed: boolean;
}) => {
  await prisma.task.update({
    where: { id: task.id },
    data: {
      completed: !task.completed,
    },
  });

  revalidatePath("/tasks");
};
