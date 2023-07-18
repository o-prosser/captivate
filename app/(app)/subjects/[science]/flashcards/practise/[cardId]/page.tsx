import { notFound, redirect } from "next/navigation";
import { PencilIcon } from "lucide-react";

import { getScience } from "@/util/pracitcals";
import { getSubjectEnum, parseSubjectName } from "@/util/subjects";
import { Button } from "@/ui/button";
import { Information } from "@/components/flashcard-information";
import { Markdown } from "@/components/markdown";
import { getFlashcard, getScope } from "@/models/flashcard";
import { getOrCreateSession } from "@/models/flashcard-study-session";

import End from "./_components/end";
import Flashcard from "./_components/flashcard";

const CardPage = async ({
  params,
  searchParams,
}: {
  params: {
    science: string;
    cardId: string;
  };
  searchParams: {
    scope?: string;
    groupId?: string;
    unit?: string;
    subject?: string;
    type?: string;
    sessionId?: string;
  };
}) => {
  const science = getScience(params.science);
  if (!science) notFound();

  const flashcard = await getFlashcard(params.cardId);
  if (!flashcard) notFound();

  const { session, created } = await getOrCreateSession({
    id: searchParams.sessionId,
    data: {
      groupId: searchParams.groupId,
      subject: getSubjectEnum(searchParams.subject || "") || undefined,
      unit: searchParams.unit ? parseInt(searchParams.unit) : undefined,
      type: "All",
    },
  });
  if (!session) throw new Error("Unable to initiate a new session");
  if (created)
    redirect(
      `/subjects/${params.science}/flashcards/practise/${params.cardId}?sessionId=${session.id}`
    );

  const scope = await getScope(session);
  if (!scope) throw new Error("Invalid scope found");

  const difference = scope.flashcards
    ? scope.flashcards.length - session._count.flashcardsStudies
    : null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-background backdrop-blur-sm" />
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg sm:rounded-2xl md:w-full">
        <div className="border-b h-12 flex items-center px-3 space-x-1">
          <End />
          <span className="font-medium flex-1 justify-center flex items-center">
            {difference || "All"} flashcards in{" "}
            {scope ? (
              <Button size="sm" className="ml-3" variant="outline">
                {scope.title}
              </Button>
            ) : (
              ""
            )}
          </span>
          <Button variant="ghost" size="icon">
            <PencilIcon />
            <span className="sr-only">Edit</span>
          </Button>
          <Information flashcard={flashcard} />
        </div>

        <div className="p-6 pt-2 space-y-6">
          <div className="flex flex-col space-y-1.5 text-left">
            <h2 className="text-lg font-semibold leading-none tracking-tight [&>*]:!mt-0">
              <Markdown source={flashcard.front} />
            </h2>
          </div>
          <Flashcard
            flashcard={flashcard}
            back={<Markdown source={flashcard.back} />}
          />
        </div>
      </div>
    </>
  );
};

export default CardPage;
