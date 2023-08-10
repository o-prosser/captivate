import { getSession } from "@/lib/session";
import * as Card from "@/ui/card";

import UserForm from "./user-form";

const User = async () => {
  const { user } = await getSession();

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
