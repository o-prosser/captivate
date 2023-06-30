"use client";

import { SaveIcon } from "lucide-react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { Button, Card, Input, Label } from "@/ui";
import { updateUser } from "./actions";

const UserForm = ({
  user,
}: {
  user: { id: string; name?: string | null; email?: string | null };
}) => {
  const { pending } = useFormStatus();

  return (
    <form action={updateUser}>
      <input type="hidden" name="_id" value={user.id} />

      <Card.Content>
        <Label>Name</Label>
        <Input
          type="text"
          defaultValue={user.name || ""}
          name="name"
          id="name"
          required
          minLength={3}
          className="mb-4"
        />

        <Label>Email address</Label>
        <Input
          type="email"
          defaultValue={user.email || ""}
          name="email"
          id="email"
          required
          minLength={3}
        />
        <p className="text-sm text-muted-foreground mt-1">
          Your email address is required to login.
        </p>
      </Card.Content>

      <Card.Footer>
        <Button type="submit" pending={pending}>
          <SaveIcon />
          Update
        </Button>
      </Card.Footer>
    </form>
  );
};

export default UserForm;