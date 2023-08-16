import Link from "next/link";
import { format } from "date-fns";
import { Clock, ExternalLink } from "lucide-react";

import { createVar } from "@/util/cn";
import { getPractical } from "@/util/pracitcals";
import { getSubject } from "@/util/subjects";
import { Button } from "@/ui/button";
import { Pill } from "@/ui/pill";
import { Placeholder } from "@/ui/placeholder";
import { Text } from "@/ui/typography";
import { selectViews } from "@/models/view";

import { ViewPlaceholder } from "./placeholder";

const Views = async () => {
  const views = await selectViews();

  return (
    <div>
      {views.length > 0 ? (
        <div className="space-y-2">
          {views.map((view, key) => {
            const segments = view.url?.split("/");

            const subject = segments[2];
            const type = segments[3];
            const practicalCode = segments[4];
            const noteUnit = segments[4];
            const noteTopic = segments[5];

            const { practical } = getPractical(subject, practicalCode);
            const subjectData = getSubject(subject);

            return (
              <div key={key} className="bg-muted rounded-2xl py-3 px-4">
                <div className="flex justify-between items-start space-x-2">
                  <div>
                    <Text className="font-semibold capitalize brightness-50 leading-6">
                      {type === "notes"
                        ? subjectData?.units[parseInt(noteUnit) - 1].topics[
                            parseInt(noteTopic) - 1
                          ]
                        : practical?.name}
                    </Text>

                    <p className="text-sm text-muted-foreground">
                      {format(view.createdAt, "dd MMM, yyyy, HH:mm")}
                    </p>
                  </div>
                  <Button
                    className="-mr-1.5 -mt-1.5"
                    size="icon"
                    variant="ghost"
                    asChild
                  >
                    <Link href={view.url}>
                      <ExternalLink />
                    </Link>
                  </Button>
                </div>

                <div className="flex items-end justify-between mt-2">
                  <div className="text-sm brightness-50 text-muted-foreground">
                    Unit{" "}
                    {type === "notes"
                      ? noteUnit + "." + noteTopic
                      : practical?.reference}
                  </div>
                  <Pill
                    style={createVar({ "--subject": `var(--${segments[2]})` })}
                    outline="subject"
                    color={null}
                  >
                    {segments[2]}
                  </Pill>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="relative">
          <ViewPlaceholder />
          <ViewPlaceholder />
          <ViewPlaceholder />
          <Placeholder>
            <Clock />
            <Placeholder.Title>No recent pages</Placeholder.Title>
            <Placeholder.Text>
              When you decide to become a good student, your recent notes will
              appear here.
            </Placeholder.Text>
          </Placeholder>
        </div>
      )}
    </div>
  );
};

export default Views;
