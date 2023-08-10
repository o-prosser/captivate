import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import * as Card from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Heading, Text } from "@/ui/typography";
import { FormButton } from "@/components/form-button";

export const metadata = {
  title: "Getting started",
};

const action = async (formData: FormData) => {
  "use server";

  const user = await getSession();
  if (!user?.id) throw new Error("No user id found");
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      username: formData.get("username") as string,
      name: formData.get("name") as string,
    },
  });

  redirect("/getting-started/subjects");
};

const GettingStarted = () => {
  return (
    <>
      <Heading level={2}>Welcome to Captivate</Heading>
      <Text className="!mt-3 text-muted-foreground">
        We need some basic info to setup your profile. <br /> This can be edited
        later.
      </Text>

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
