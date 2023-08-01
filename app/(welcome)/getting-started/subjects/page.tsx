import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/util/cn";
import { useSubjectStyles } from "@/util/subjects";
import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/ui/label";
import { Heading, Text } from "@/ui/typography";

export const metadata = {
  title: "Subjects",
};

const Subjects = () => {
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

      <Card.Root className="mt-6">
        <form action="">
          <Card.Content className="pt-6 space-y-6">
            {["Maths", "Chemistry", "Physics"].map((subject, key) => {
              const Icon = styles[key].SubjectIcon;

              return (
                <Label
                  htmlFor={subject}
                  key={key}
                  className={cn(
                    "flex cursor-pointer items-center py-4 space-x-2 rounded-2xl px-3 border bg-opacity-20 opacity-50 transition hover:opacity-100 [&:has(input:checked)]:opacity-100",
                    styles[key].subjectBackground,
                    styles[key].subjectBorder
                  )}
                >
                  <Icon className={cn("h-5 w-5", styles[key].subjectColor)} />
                  <span className="flex-1">{subject}</span>
                  <Checkbox
                    name={subject}
                    id={subject}
                    style={
                      {
                        "--fill": `var(--${subject.toLowerCase()})`,
                      } as React.CSSProperties
                    }
                    className={cn(
                      styles[key].subjectBorder,
                      "data-[state=checked]:!bg-[hsl(var(--fill))] h-4 w-4"
                    )}
                  />
                </Label>
              );
            })}
          </Card.Content>
          <Card.Footer>
            <Button className="w-full">
              Next step{" "}
              <ArrowRightIcon className="transition group-hover:translate-x-1" />
            </Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </>
  );
};

export default Subjects;
