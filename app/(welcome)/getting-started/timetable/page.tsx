import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import { Heading, Text } from "@/ui/typography";

import Progress from "../_components/progress";

export const metadata = {
  title: "Calendar",
};

const TimetablePage = () => {
  const action = async (formData: FormData) => {
    "use server";

    redirect("/gettings-started/profile");
  };

  return (
    <>
      <Heading level={2}>Set up your timetable</Heading>
      <Text className="!mt-3 text-muted-foreground">
        This feature is still a work in progress. We&apos;ll let you know when
        you can upload your timetable.
      </Text>

      <Progress step={4} />

      <Card.Root className="mt-6">
        <form action={action}>
          <Card.Content className="pt-6 space-y-6"></Card.Content>
          <Card.Footer>
            <Button className="w-full">
              Next step
              <ArrowRight className="transition group-hover:translate-x-1" />
            </Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </>
  );
};

export default TimetablePage;
