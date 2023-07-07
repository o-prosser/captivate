import { Button, Text } from "@/ui";
import { getScience } from "@/util/pracitcals";
import { InfoIcon, PencilIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Markdown } from "@/components/markdown";
import Flashcard from "./flashcard";
import { StudyScope, StudyType } from "@prisma/client";
import { getCurrentUser } from "@/util/session";

const CardPage = async ({
  params,
  searchParams,
}: {
  params: {
    science: string;
    cardId: string;
  };
  searchParams: {
    close?: string;
    scope?: string;
    scopeId?: string;
    type?: string;
    sessionId?: string;
  };
}) => {
  const science = getScience(params.science);
  if (!science) notFound();

  const flashcard = await prisma.flashcard.findUnique({
    where: {
      id: params.cardId,
    },
  });
  if (!flashcard) notFound();

  let session;
  if (searchParams.sessionId) {
    session = await prisma.flashcardStudySession.findUnique({
      where: {
        id: searchParams.sessionId,
      },
      include: {
        _count: {
          select: { flashcardsStudies: true },
        },
      },
    });
  }

  if (!session) {
    const user = await getCurrentUser();
    if (!user?.email) redirect("/login");

    const userId = await prisma.user.findUnique({
      where: { email: user?.email },
      select: { id: true },
    });
    if (!userId) redirect("/login");

    session = await prisma.flashcardStudySession.create({
      data: {
        userId: userId.id,
        start: new Date(),
        scope: StudyScope.Group,
        scopeId: searchParams.scopeId,
        type: StudyType.All,
      },
      select: {
        id: true,
      },
    });

    redirect(
      `/subjects/${params.science}/flashcards/practise/${params.cardId}?sessionId=${session.id}`,
    );
  }

  let scope;
  if (session.scope === StudyScope.Group && session.scopeId) {
    const group = await prisma.flashcardGroup.findUnique({
      where: { id: session.scopeId },
      include: {
        _count: {
          select: { flashcards: true },
        },
      },
    });
    if (!group) notFound();

    scope = {
      topicName: science.units[group.unit - 1].topics[group.topic - 1],
      ...group,
    };
  } else {
    scope = null;
  }

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
                {scope.topicName}
              </Button>
            ) : (
              ""
            )}
          </span>
          <Button variant="ghost" size="icon">
            <PencilIcon />
            <span className="sr-only">Edit</span>
          </Button>
          <Button variant="ghost" size="icon">
            <InfoIcon />
            <span className="sr-only">Information</span>
          </Button>
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
