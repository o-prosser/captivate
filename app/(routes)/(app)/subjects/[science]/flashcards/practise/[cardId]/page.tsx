import { Button } from "@/ui";
import { getScience } from "@/util/pracitcals";
import { InfoIcon, PencilIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Markdown } from "@/components/markdown";
import Flashcard from "./flashcard";
import { getOrCreateSession } from "@/app/(models)/flashcard-study-session";
import { getFlashcard } from "@/app/(models)/flashcard";
import { getScope } from "@/util/flashcards";
import Information from "./information";

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
    scopeId?: string;
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
      scope: "Group",
      scopeId: searchParams.scopeId,
      type: "All",
    },
  });
  if (!session) throw new Error("Unable to initiate a new session");
  if (created)
    redirect(
      `/subjects/${params.science}/flashcards/practise/${params.cardId}?sessionId=${session.id}`,
    );

  const { scope } = await getScope({
    id: session.scopeId,
    type: session.scope,
    science,
  });

  const difference = scope
    ? scope?._count.flashcards - session._count.flashcardsStudies
    : null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-background backdrop-blur-sm" />
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg sm:rounded-2xl md:w-full">
        <div className="border-b h-12 flex items-center px-3 space-x-1">
          <Button variant="ghost" size="icon" className="mr-11" asChild>
            <Link href={`/subjects/${params.science}/flashcards`}>
              <XIcon />
              <span className="sr-only">Close</span>
            </Link>
          </Button>
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
