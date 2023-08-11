import { redirect } from "next/navigation";
import { usersTable } from "@/drizzle/schema";
import { ArrowRight } from "lucide-react";

import { db, eq } from "@/lib/db";
import { getSession } from "@/lib/session";
import * as Card from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Heading, Text } from "@/ui/typography";
import { FormButton } from "@/components/form-button";

import Progress from "./_components/progress";

export const metadata = {
  title: "Getting started",
};

const GettingStarted = async () => {
  const { user } = await getSession();

  const action = async (formData: FormData) => {
    "use server";

    const username = formData.get("username");
    const name = formData.get("name");
    if (typeof username !== "string" || typeof name !== "string")
      throw new Error("Invalid form data");

    console.log(user, username, name);

    await db
      .update(usersTable)
      .set({
        username,
        name,
      })
      .where(eq(usersTable.id, user.id));

    redirect("/getting-started/subjects");
  };

  return (
    <>
      <Heading level={2}>Welcome to Captivate</Heading>
      <Text className="!mt-3 text-muted-foreground">
        We need some basic info to setup your profile. <br /> This can be edited
        later.
      </Text>

      <Progress step={1} />

      <Card.Root className="mt-6">
        <form action={action}>
          <Card.Content className="pt-6">
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
                defaultValue={user.username}
              />
            </div>

            <div className="space-y-1 mt-6">
              <Label htmlFor="name">Full name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                required
                autoComplete="fullname"
                defaultValue={user.name}
              />
            </div>
          </Card.Content>
          <Card.Footer>
            <FormButton className="w-full">
              Next step
              <ArrowRight className="transition group-hover:translate-x-1" />
            </FormButton>
          </Card.Footer>
        </form>
      </Card.Root>
    </>
  );
};

export default GettingStarted;
