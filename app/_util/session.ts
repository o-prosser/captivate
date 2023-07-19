import { cache } from "react";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const getUser = cache(async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });

  return user;
});

const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  const dbUser = await getUser(session.user.email);

  return { id: dbUser?.id, ...session?.user };
};

export { getCurrentUser };
