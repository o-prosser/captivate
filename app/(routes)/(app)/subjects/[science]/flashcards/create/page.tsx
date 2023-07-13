import { Heading } from "@/ui";
import { getScience } from "@/util/pracitcals";
import { notFound } from "next/navigation";
import CreateFlashcardForm from "./form";

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
