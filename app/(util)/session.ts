import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const dbUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  return { id: dbUser?.id, ...session?.user };
};
