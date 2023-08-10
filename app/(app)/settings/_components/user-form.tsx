"use client";

import "@uploadthing/react/styles.css";

import { useState } from "react";
import { Save } from "lucide-react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { UploadButton } from "@/util/uploadthing";
import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

import { updateUser } from "../actions";

const UserForm = ({
  user,
}: {
  user: { id: string; name?: string | null; email?: string | null };
}) => {
  const { pending } = useFormStatus();

  const [image, setImage] = useState("");

  return (
    <form action={updateUser}>
      <input type="hidden" name="_id" value={user.id} />

      <Card.Content className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            defaultValue={user.name || ""}
            name="name"
            id="name"
            required
            minLength={3}
          />
        </div>

        <div>
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
        </div>

        <div className="uploadthing">
          <Label>Avatar</Label>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={async (res) => {
              console.log("Files: ", res);
              if (!res) return;
              setImage(res[0].fileUrl);
            }}
            onUploadError={(error: Error) => {
              console.error(error);
            }}
          />
          <input type="hidden" name="image" id="image" value={image} />
        </div>
      </Card.Content>

      <Card.Footer>
        <Button type="submit" pending={pending}>
          <Save />
          Update
        </Button>
      </Card.Footer>
    </form>
  );
};

export default UserForm;
