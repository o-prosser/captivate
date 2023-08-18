import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertUserSchema, usersTable } from "@/drizzle/schema";

import { db, eq } from "@/lib/db";
import { getValidSession } from "@/util/session";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Heading, Text } from "@/ui/typography";
import { FormButton } from "@/components/form-button";

import Avatar from "./avatar";

const ProfilePage = async () => {
  const { user } = await getValidSession();

  const action = async (formData: FormData) => {
    "use server";

    const { user } = await getValidSession();

    const updateUserSchema = insertUserSchema.omit({
      id: true,
      hashedPassword: true,
      token: true,
      emailVerifiedAt: true,
      createdAt: true,
    });

    const data = updateUserSchema.parse(Object.fromEntries(formData.entries()));

    await db.update(usersTable).set(data).where(eq(usersTable.id, user.id));

    revalidatePath("/settings/profile");
    redirect("/settings/profile");
  };

  return (
    <div>
      <Heading level={2}>Profile</Heading>
      <Text className="!mt-1 text-muted-foreground">
        Manage your profile settings.
      </Text>

      <form action={action} className="max-w-xl space-y-6 mt-6">
        <Avatar user={user} />

        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            required
            autoComplete="none"
            autoCapitalize="none"
            autoCorrect="none"
            defaultValue={user.username || ""}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="name">Full name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            required
            autoComplete="fullname"
            defaultValue={user.name || ""}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="name">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="email"
            defaultValue={user.email}
          />
          <p className="text-xs text-muted-foreground">
            You may need to verify your email again for any change to take
            effect.
          </p>
        </div>

        <FormButton>Update</FormButton>
      </form>
    </div>
  );
};

export default ProfilePage;
