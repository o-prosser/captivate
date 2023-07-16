import { notFound } from "next/navigation";

import { getScience } from "@/util/pracitcals";
import { Heading } from "@/ui/typography";

import CreateFlashcardForm from "./_components/form";

const CreateFlashcardPage = ({ params }: { params: { science: string } }) => {
  const science = getScience(params.science);
  if (!science) notFound();

  return (
    <>
      <Heading>Add flashcards</Heading>

      <CreateFlashcardForm params={params} />
    </>
  );
};

export default CreateFlashcardPage;
