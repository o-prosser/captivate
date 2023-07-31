import type { SubjectPageProps } from "@/types/subjects";
import { getSubject } from "@/util/subjects";
import { Heading } from "@/ui/typography";

import CreateFlashcardForm from "./_components/form";

const CreateFlashcardPage = ({ params }: SubjectPageProps) => {
  const subject = getSubject(params.subject);

  return (
    <>
      <Heading>Add flashcards</Heading>

      <CreateFlashcardForm params={params} />
    </>
  );
};

export default CreateFlashcardPage;
