import { notFound } from "next/navigation";

import { getSubject } from "@/util/subjects";
import { Heading } from "@/ui/typography";
import { selectFlashcardGroup } from "@/models/flashcard-group";

import CreateFlashcardForm from "./_components/form";

const EditFlashcardPage = async ({
  params,
}: {
  params: { subject: string; groupId: string };
}) => {
  const subject = getSubject(params.subject);

  const flashcardGroup = await selectFlashcardGroup({ id: params.groupId });
  if (!flashcardGroup) notFound();

  return (
    <>
      <Heading>Edit flashcards</Heading>

      <CreateFlashcardForm flashcardGroup={flashcardGroup} params={params} />
    </>
  );
};

export default EditFlashcardPage;
