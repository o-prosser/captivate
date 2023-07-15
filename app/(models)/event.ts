import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/util/session";

export const getEvents = async () => {
  const user = await getCurrentUser();
  if (!user?.email) throw new Error("Unauthorised");

  const { id } = await prisma.user.findUniqueOrThrow({
    where: { email: user.email },
  });

  return await prisma.event.findMany({
    where: {
      userId: id,
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
