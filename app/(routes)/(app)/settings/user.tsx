import { Card } from "@/ui";
import { getCurrentUser } from "@/util/session";
import { prisma } from "@/lib/prisma";

import UserForm from "./user-form";

const getUser = async () => {
  const sessionUser = await getCurrentUser();
  if (!sessionUser || !sessionUser.email) return null;

  const user = await prisma.user.findUnique({
    where: {
      email: sessionUser?.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return user;
};

const User = async () => {
  const user = await getUser();
  if (!user) return null;

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Update your information</Card.Title>
        <Card.Description>Update your name or email address.</Card.Description>
      </Card.Header>

      <UserForm user={user} />
    </Card.Root>
  );
};

export default User;
