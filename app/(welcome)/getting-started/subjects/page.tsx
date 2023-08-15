import { redirect } from "next/navigation";
import { usersToSubjects } from "@/drizzle/schema";
import { ArrowRight } from "lucide-react";

import { db } from "@/lib/db";
import { createVar } from "@/util/cn";
import { getValidSession } from "@/util/session";
import { SubjectIcon } from "@/util/subjects";
import * as Card from "@/ui/card";
import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/ui/label";
import { Heading, Text } from "@/ui/typography";
import { FormButton } from "@/components/form-button";
import { selectSubjects } from "@/models/subject";

import Progress from "../_components/progress";

export const metadata = {
  title: "Subjects",
};

const Subjects = async () => {
  const { user } = await getValidSession();
  const subjects = await selectSubjects();

  const action = async (formData: FormData) => {
    "use server";

    const { user } = await getValidSession();
    const subjects = await selectSubjects();

    subjects.forEach(async (subject) => {
      if (formData.get(subject.id) == "on") {
        await db
          .insert(usersToSubjects)
          .values({ subjectId: subject.id, level: "Sub", userId: user.id });
      }
    });

    redirect("/getting-started/calendar");
  };

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
            {subjects.map((subject, key) => (
              <Label
                htmlFor={subject.id}
                key={key}
                style={createVar({ "--subject": `var(--${subject.id})` })}
                className="flex cursor-pointer items-center bg-subject/20 border-subject py-4 space-x-2 rounded-2xl px-3 border opacity-50 transition hover:opacity-100 [&:has(input:checked)]:opacity-100"
              >
                <SubjectIcon
                  subject={subject.id}
                  style={createVar({ "--subject": `var(--${subject.id})` })}
                  className="h-5 w-5 text-subject"
                />
                <span className="flex-1 capitalize">{subject.name}</span>
                <Checkbox
                  name={subject.id}
                  id={subject.id}
                  defaultChecked={
                    user.usersToSubjects.find(
                      (entry) => entry.subject.id === subject.id,
                    )
                      ? true
                      : false
                  }
                  style={createVar({ "--subject": `var(--${subject.id})` })}
                  className="data-[state=checked]:!bg-subject border-subject h-4 w-4"
                />
              </Label>
            ))}
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

export default Subjects;

export const runtime = "edge";
