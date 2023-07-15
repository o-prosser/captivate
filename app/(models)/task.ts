import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/util/session";

export const getTasks = async () => {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Unauthorised");

  return await prisma.task.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      completed: true,
      dueDate: true,
      doDate: true,
      title: true,
      subject: true,
      description: true,
    },
  });
};
