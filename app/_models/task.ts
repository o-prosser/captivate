import { getSession } from "@/lib/session";
import { prisma } from "@/app/_lib/prisma";

const getTasks = async () => {
  const { user } = await getSession();

  return await prisma.task.findMany({
    where: {
      userId: user.id,
      completed: false,
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
    orderBy: {
      createdAt: "asc",
    },
  });
};

export { getTasks };
