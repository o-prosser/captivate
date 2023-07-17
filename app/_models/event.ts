import { prisma } from "@/app/_lib/prisma";
import { getCurrentUser } from "@/app/_util/session";

const getEvents = async () => {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error("Unauthorised");

  return await prisma.event.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      date: true,
      title: true,
      subject: true,
      category: true,
      description: true,
    },
  });
};

export { getEvents };
