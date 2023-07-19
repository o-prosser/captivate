import { prisma } from "@/app/_lib/prisma";
import { getCurrentUser } from "@/app/_util/session";

const getTasks = async () => {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Unauthorised");

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
