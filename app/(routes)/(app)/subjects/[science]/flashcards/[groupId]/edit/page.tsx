import { BackButton } from "@/components";
import { Breadcrumbs, Heading } from "@/ui";
import { getScience } from "@/util/pracitcals";
import { notFound } from "next/navigation";
import CreateFlashcardForm from "./form";
import { prisma } from "@/lib/prisma";

const EditFlashcardPage = async ({
  params,
}: {
  params: { science: string; groupId: string };
}) => {
  const science = getScience(params.science);
  if (!science) notFound();

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
      <Breadcrumbs pages={[science.name, "Flashcards", "Edit"]} />
      <BackButton />
      <Heading>Edit flashcards</Heading>

      <CreateFlashcardForm flashcardGroup={flashcardGroup} params={params} />
    </>
  );
};

export default EditFlashcardPage;
