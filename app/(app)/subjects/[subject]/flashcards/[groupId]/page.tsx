import Link from "next/link";
import { notFound } from "next/navigation";
import { PencilIcon } from "lucide-react";

import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import { Heading, Text } from "@/ui/typography";
import { Information } from "@/components/flashcard-information";
import { Markdown } from "@/app/_components/markdown";
import { prisma } from "@/app/_lib/prisma";
import { getSubject } from "@/app/_util/subjects";

const FlashcardGroupPage = async ({
  params,
}: {
  params: { subject: string; groupId: string };
}) => {
  const subject = getSubject(params.subject);

  const flashcardGroup = await prisma.flashcardGroup.findUnique({
    where: {
      id: params.groupId,
    },
    select: {
      id: true,
      unit: true,
      topic: true,
      flashcards: {
        include: {
          studies: true,
        },
      },
    },
  });

  if (!flashcardGroup) notFound();

  const topicName =
    subject.units[flashcardGroup.unit - 1].topics[flashcardGroup.topic - 1];

  return (
    <>
      <div className="flex justify-between items-start flex-col-reverse sm:flex-row mt-5">
        <Heading className="mt-0">Flashcards &mdash; {topicName}</Heading>
        <div className="mb-3 sm:mb-0 space-x-3">
          <Button asChild>
            <Link
              href={`/subjects/${params.subject}/flashcards/practise/${flashcardGroup.flashcards[0].id}?scope=group&groupId=${flashcardGroup.id}&type=all`}
            >
              Practise all
            </Link>
          </Button>
          <Button asChild size="icon" variant="outline">
            <Link
              href={`/subjects/${params.subject}/flashcards/${flashcardGroup.id}/edit`}
            >
              <PencilIcon />
            </Link>
          </Button>
        </div>
      </div>

      <Text className="mt-6 font-semibold">
        Reference:{" "}
        <Button variant="link" size={null} asChild>
          <Link
            href={`/subjects/${params.subject}/notes/${flashcardGroup.unit}/${flashcardGroup.topic}`}
          >
            AS Unit {flashcardGroup.unit}.{flashcardGroup.topic}
          </Link>
        </Button>
      </Text>

      {flashcardGroup.flashcards.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2 mt-6">
          {flashcardGroup.flashcards.map((flashcard, key) => (
            <Card.Root key={key}>
              <Card.Header className="pb-3 flex-row space-y-0 justify-between items-start">
                <div className="space-y-1.5">
                  <span className="text-xs text-muted-foreground uppercase">
                    Card {key + 1}
                  </span>
                  <Card.Title className="text-lg [&>*]:!m-0">
                    <Markdown source={flashcard.front} />
                  </Card.Title>
                </div>
                <Information flashcard={flashcard} />
              </Card.Header>
              <Card.Content className="pt-0">
                <Markdown source={flashcard.back} />
              </Card.Content>
            </Card.Root>
          ))}
        </div>
      ) : (
        <>No flashcards</>
      )}
    </>
  );
};

export default FlashcardGroupPage;
