import Link from "next/link";
import { format } from "date-fns";
import { Clock, ExternalLink } from "lucide-react";

import { createVar } from "@/util/cn";
import { getPractical } from "@/util/pracitcals";
import { getSubject } from "@/util/subjects";
import { Button } from "@/ui/button";
import { Pill } from "@/ui/pill";
import { Placeholder } from "@/ui/placeholder";
import { SubjectCard } from "@/ui/subject-card";
import { selectViews } from "@/models/view";

import { ViewPlaceholder } from "./placeholder";

const Views = async () => {
  const views = await selectViews({});

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
              <SubjectCard key={key} subject={null}>
                <SubjectCard.Header>
                  <div>
                    <SubjectCard.Title>
                      {type === "notes"
                        ? subjectData?.units[parseInt(noteUnit) - 1].topics[
                            parseInt(noteTopic) - 1
                          ]
                        : practical?.name}
                    </SubjectCard.Title>

                    <SubjectCard.Description>
                      {format(view.createdAt, "dd MMM, yyyy, HH:mm")}
                    </SubjectCard.Description>
                  </div>
                  <SubjectCard.Action>
                    <Button size="icon" variant="ghost" asChild>
                      <Link href={view.url}>
                        <ExternalLink />
                      </Link>
                    </Button>
                  </SubjectCard.Action>
                </SubjectCard.Header>

                <SubjectCard.Footer>
                  <SubjectCard.Caption>
                    Unit{" "}
                    {type === "notes"
                      ? noteUnit + "." + noteTopic
                      : practical?.reference}
                  </SubjectCard.Caption>
                  <Pill
                    className="!m-0"
                    style={createVar({ "--subject": `var(--${segments[2]})` })}
                    outline="subject"
                    color={null}
                  >
                    {segments[2]}
                  </Pill>
                </SubjectCard.Footer>
              </SubjectCard>
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
export const runtime = "edge";
