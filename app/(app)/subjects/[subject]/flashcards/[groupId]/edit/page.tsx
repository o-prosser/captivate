import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSubject } from "@/util/subjects";
import { Heading } from "@/ui/typography";

import CreateFlashcardForm from "./_components/form";

const EditFlashcardPage = async ({
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
      flashcards: true,
    },
  });

  if (!flashcardGroup) notFound();

  return (
    <>
      <Heading>Edit flashcards</Heading>

      <CreateFlashcardForm flashcardGroup={flashcardGroup} params={params} />
    </>
  );
};

export default EditFlashcardPage;
