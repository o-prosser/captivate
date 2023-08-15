import Link from "next/link";
import { format, sub } from "date-fns";
import { ExternalLink } from "lucide-react";

import { db, gte } from "@/lib/db";
import { createVar } from "@/util/cn";
import { getValidSession } from "@/util/session";
import { getSubject } from "@/util/subjects";
import { Button } from "@/ui/button";
import { Pill } from "@/ui/pill";
import { Text } from "@/ui/typography";

function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const Flashcards = async () => {
  const { user } = await getValidSession();

  // sleep(20000);

  const sessions = await db.query.flashcardStudySessionsTable.findMany({
    where: (fields, { and, eq }) =>
      and(
        eq(fields.userId, user.id),
        gte(fields.end, sub(new Date(), { weeks: 1 })),
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
              <div
                key={key}
                style={createVar({
                  "--subject": `var(--${subjectId})`,
                })}
                className="bg-gradient-to-b from-subject/30 to-subject/10 rounded-2xl py-3 px-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <Text className="font-semibold text-subject capitalize brightness-50">
                      {session.scope === "Group" && session.group
                        ? subject.units[session.group.unit - 1].topics[
                            session.group.topic - 1
                          ]
                        : session.scope === "Subject"
                        ? subject.name
                        : session.scope === "Unit" && session.unit
                        ? subject.units[session.unit - 1].name
                        : "Flashcard Practise"}
                    </Text>
                    <p className="text-subject text-sm brightness-75">
                      {format(session.end, "dd MMM, yyyy, HH:mm")}
                    </p>
                  </div>
                  <Button
                    className="-mr-1.5 -mt-1.5 hover:bg-subject/20 [&.group:hover>svg]:text-subject"
                    size="icon"
                    variant="ghost"
                    asChild
                  >
                    <Link
                      href={`/subjects/${subjectId}/flashcards/summary/${session.id}`}
                    >
                      <ExternalLink />
                    </Link>
                  </Button>
                </div>

                <div className="flex items-end justify-between mt-2">
                  <div className="text-subject text-sm brightness-50 capitalize">
                    {subjectId} &bull;{" "}
                    {session.scope !== "Subject"
                      ? `Unit ${session.unit || session.group?.unit}${
                          session.group ? `.${session.group.topic}` : ""
                        }`
                      : ""}
                  </div>
                  <Pill outline="subject" color={null}>
                    {session.flashcardStudies.length} cards
                  </Pill>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No recent flashcard sessions. Get studying</div>
      )}
    </div>
  );
};

export default Flashcards;
export const runtime = "edge";
