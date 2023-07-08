import { getSessionSummary } from "@/app/(models)/flashcard-study-session";
import { Breadcrumbs, Heading } from "@/ui";
import { getScience } from "@/util/pracitcals";
import { notFound } from "next/navigation";
import { intervalToDuration } from "date-fns";
import { getScope } from "@/util/flashcards";
import { SCORES } from "@/app/(models)/flashcard-study";
import { cn } from "@/util";
import Chart from "./chart";

const FlashcardSessionSummary = async ({
  params,
}: {
  params: { science: string; sessionId: string };
}) => {
  const science = getScience(params.science);
  if (!science) notFound();

  const session = await getSessionSummary(params.sessionId);
  if (!session) notFound();
  if (!session.end) notFound();

  const length = intervalToDuration({
    start: session.start,
    end: session.end,
  });

  const { scope } = await getScope({
    id: session.scopeId,
    type: session.scope,
    science,
  });

  const scores = [
    {
      emoji: "⏩",
      label: "Skipped",
      short: "Skipped",
    },
    {
      emoji: "❌",
      label: "Forgot",
      short: "Forgot",
    },
    {
      emoji: "😬",
      label: "Partially recalled",
      short: "Partially",
    },
    {
      emoji: "😄",
      label: "Recalled with effort",
      short: "Recalled",
    },
    {
      emoji: "👑",
      label: "Easily recalled",
      short: "Easily",
    },
  ].map(({ emoji, label, short }, key) => {
    const score = key + 1;

    const count = session.flashcardsStudies.filter(
      (study) => study.score == score,
    ).length;

    return {
      emoji,
      score,
      flashcards: count,
      label,
      short,
    };
  });

  return (
    <>
      <Breadcrumbs pages={[science.name, "Flashcards", "Session summary"]} />
      <Heading>Session summary</Heading>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6 border-b pb-6">
        <div>
          <p className="uppercase font-medium text-sm">Length</p>
          <p className="text-muted-foreground">
            {length.hours && length.hours > 0 ? (
              <>
                {length.hours} hr{length.hours === 1 ? "" : "s"}{" "}
              </>
            ) : (
              ""
            )}
            {length?.minutes} min
            {length.minutes === 1 ? "" : "s"} {length.seconds} sec
            {length.seconds === 1 ? "" : "s"}
          </p>
        </div>
        <div>
          <p className="uppercase font-medium text-sm">Scope</p>
          <p className="text-muted-foreground">
            {session.scope} ({scope?.title})
          </p>
        </div>
        <div>
          <p className="uppercase font-medium text-sm">Flashcards</p>
          <p className="text-muted-foreground">
            {session.flashcardsStudies.length} card
            {session.flashcardsStudies.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-6 border-b pb-6">
        {scores.map((score) => {
          return (
            <div key={score.score}>
              <p className="uppercase font-medium text-sm">
                {score.emoji}
                <span className="pr-1" />
                {score.label}
              </p>
              <p className="text-muted-foreground">
                {score.flashcards} card{score.flashcards === 1 ? "" : "s"}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid xl:grid-cols-2 h-96">
        <Chart scores={scores} />
      </div>
    </>
  );
};

export default FlashcardSessionSummary;
