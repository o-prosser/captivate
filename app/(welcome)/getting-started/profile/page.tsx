import { redirect } from "next/navigation";
import { usersTable } from "@/drizzle/schema";
import { ArrowRight } from "lucide-react";

import { db, eq, sql } from "@/lib/db";
import { getValidSession } from "@/util/session";
import * as Card from "@/ui/card";
import { Heading, Text } from "@/ui/typography";
import { FormButton } from "@/components/form-button";

import Progress from "../_components/progress";

export const metadata = {
  title: "Profile",
};

const Profile = async () => {
  const { user } = await getValidSession();

  const action = async (formData: FormData) => {
    "use server";

    const { user } = await getValidSession();

    await db
      .update(usersTable)
      .set({ completedOnboardingAt: sql`now()` })
      .where(eq(usersTable.id, user.id));

    redirect("/dashboard");
  };

  return (
    <>
      <Heading level={2}>Welcome to Captivate</Heading>
      <Text className="!mt-3 text-muted-foreground">
        We need some basic info to setup your profile. <br /> This can be edited
        later.
      </Text>

      <Progress step={5} />

      <Card.Root className="mt-6">
        <form action={action}>
          <Card.Content className="pt-6"></Card.Content>
          <Card.Footer>
            <FormButton className="w-full">
              Finish
              <ArrowRight className="transition group-hover:translate-x-1" />
            </FormButton>
          </Card.Footer>
        </form>
      </Card.Root>
    </>
  );
};

export default Profile;

export const runtime = "edge";
