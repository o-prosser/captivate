import Link from "next/link";
import { format, sub } from "date-fns";
import { ExternalLink, Inbox } from "lucide-react";

import type { SubjectPageProps } from "@/types/subjects";
import { db, gte } from "@/lib/db";
import { getValidSession } from "@/util/session";
import { getSubject } from "@/util/subjects";
import { Button } from "@/ui/button";
import { Pill } from "@/ui/pill";
import { Placeholder } from "@/ui/placeholder";
import { SubjectCard } from "@/ui/subject-card";

import { FlashcardPlaceholder } from "./placeholder";

const Flashcards = async ({ params }: SubjectPageProps) => {
  const { user } = await getValidSession();

  const sessions = await db.query.flashcardStudySessionsTable.findMany({
    where: (fields, { and, eq }) =>
      and(
        eq(fields.userId, user.id),
        gte(fields.end, sub(new Date(), { weeks: 1 })),
        eq(fields.subjectId, params.subject),
      ),
    orderBy: (fields, { desc }) => desc(fields.end),
    limit: 3,
    with: {
      group: true,
      flashcardStudies: {
        columns: {
          id: true,
        },
      },
    },
  });

  return (
    <div>
      {sessions.length > 0 ? (
        <div className="space-y-2">
          {sessions.map((session, key) => {
            if (!session.end)
              throw new Error("No session end - shouldn't throw");
            const subjectId = session.subjectId || session.group?.subjectId;
            if (!subjectId) throw new Error("No subject id");
            const subject = getSubject(subjectId);

            return (
              <SubjectCard key={key} subject={subjectId}>
                <SubjectCard.Header>
                  <div>
                    <SubjectCard.Title>
                      {session.scope === "Group" && session.group
                        ? subject.units[session.group.unit - 1].topics[
                            session.group.topic - 1
                          ]
                        : session.scope === "Subject"
                        ? subject.name
                        : session.scope === "Unit" && session.unit
                        ? subject.units[session.unit - 1].name
                        : "Flashcard Practise"}
                    </SubjectCard.Title>
                    <SubjectCard.Description>
                      {format(session.end, "dd MMM, yyyy, HH:mm")}
                    </SubjectCard.Description>
                  </div>
                  <SubjectCard.Action>
                    <Button size="icon" variant="ghost" asChild>
                      <Link
                        href={`/subjects/${subjectId}/flashcards/summary/${session.id}`}
                      >
                        <ExternalLink />
                      </Link>
                    </Button>
                  </SubjectCard.Action>
                </SubjectCard.Header>

                <SubjectCard.Footer>
                  <SubjectCard.Caption className="capitalize">
                    {subjectId} &bull;{" "}
                    {session.scope !== "Subject"
                      ? `Unit ${session.unit || session.group?.unit}${
                          session.group ? `.${session.group.topic}` : ""
                        }`
                      : ""}
                  </SubjectCard.Caption>
                  <Pill outline="subject" className="!m-0" color={null}>
                    {session.flashcardStudies.length} cards
                  </Pill>
                </SubjectCard.Footer>
              </SubjectCard>
            );
          })}
        </div>
      ) : (
        <div className="relative">
          <FlashcardPlaceholder />
          <FlashcardPlaceholder />
          <Placeholder>
            <Inbox />
            <Placeholder.Title>No recent flashcard sessions</Placeholder.Title>
            <Placeholder.Text>
              Come on... it&apos;s time to start practising those flashcards.
              They won&apos;t learn themselves.
            </Placeholder.Text>
          </Placeholder>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
export const runtime = "edge";
