import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import { Heading, Text } from "@/ui/typography";

import Progress from "../_components/progress";

export const metadata = {
  title: "Calendar",
};

const CalendarPage = () => {
  const action = async (formData: FormData) => {
    "use server";

    redirect("/timetable");
  };

  return (
    <>
      <Heading level={2}>Link your calendar</Heading>
      <Text className="!mt-3 text-muted-foreground">
        Link your calendar to sync school events and your timetable.
      </Text>

      <Progress step={3} />

      <Card.Root className="mt-6">
        <form>
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

export default CalendarPage;
