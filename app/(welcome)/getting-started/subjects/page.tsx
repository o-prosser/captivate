import { redirect } from "next/navigation";
import { usersToSubjects } from "@/drizzle/schema";
import { ArrowRight } from "lucide-react";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { cn } from "@/util/cn";
import { useSubjectStyles } from "@/util/subjects";
import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/ui/label";
import { Heading, Text } from "@/ui/typography";

import Progress from "../_components/progress";

export const metadata = {
  title: "Subjects",
};

const Subjects = async () => {
  const { user } = await getSession();

  const action = async (formData: FormData) => {
    "use server";

    const subjects = ["maths", "chemistry", "physics"];

    subjects.forEach(async (subject) => {
      if (formData.get(subject) == "on") {
        await db
          .insert(usersToSubjects)
          .values({ subjectId: subject, level: "Sub", userId: user.id });
      }
    });

    redirect("/getting-started/calendar");
  };

  const styles = [
    useSubjectStyles("maths"),
    useSubjectStyles("chemistry"),
    useSubjectStyles("physics"),
  ];

  return (
    <>
      <Heading level={2}>Select your subjects</Heading>
      <Text className="!mt-3 text-muted-foreground">
        Choose the subjects you are studying. We currently support Maths,
        Chemistry and Physics at AS and A2 level.
      </Text>

      <Progress step={2} />

      <Card.Root className="mt-6">
        <form action={action}>
          <Card.Content className="pt-6 space-y-6">
            {["maths", "chemistry", "physics"].map((subject, key) => {
              const Icon = styles[key].SubjectIcon;

              return (
                <Label
                  htmlFor={subject}
                  key={key}
                  className={cn(
                    "flex cursor-pointer items-center py-4 space-x-2 rounded-2xl px-3 border bg-opacity-20 opacity-50 transition hover:opacity-100 [&:has(input:checked)]:opacity-100",
                    styles[key].subjectBackground,
                    styles[key].subjectBorder,
                  )}
                >
                  <Icon className={cn("h-5 w-5", styles[key].subjectColor)} />
                  <span className="flex-1 capitalize">{subject}</span>
                  <Checkbox
                    name={subject}
                    id={subject}
                    style={
                      {
                        "--fill": `var(--${subject})`,
                      } as React.CSSProperties
                    }
                    className={cn(
                      styles[key].subjectBorder,
                      "data-[state=checked]:!bg-[hsl(var(--fill))] h-4 w-4",
                    )}
                  />
                </Label>
              );
            })}
          </Card.Content>
          <Card.Footer>
            <Button className="w-full">
              Next step{" "}
              <ArrowRight className="transition group-hover:translate-x-1" />
            </Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </>
  );
};

export default Subjects;
