import Link from "next/link";
import { Plus } from "lucide-react";

import { SubjectPageProps } from "@/types/subjects";
import { getSubject } from "@/util/subjects";
import { Button } from "@/ui/button";
import { Heading } from "@/ui/typography";
import DataTable from "@/components/data-table";
import { selectFlashcardGroups } from "@/models/flashcard-group";

import { columns } from "./_components/columns";
import SelectPractise from "./_components/select-practise";

export const metadata = {
  title: "Flashcards",
};

const Flashcards = async ({ params }: SubjectPageProps) => {
  const subject = getSubject(params.subject);

  const flashcardGroups = await selectFlashcardGroups(params);

  return (
    <div className="max-w-full">
      <div className="flex justify-between items-start">
        <Heading className="mb-8">Flashcards</Heading>
        <SelectPractise subject={{ id: params.subject, ...subject }} />
      </div>

      <div className="overflow-hidden max-w-[calc(100vw-3rem)]">
        <DataTable
          data={flashcardGroups.map((flashcardGroup) => {
            const topicName =
              subject.units[flashcardGroup.unit - 1].topics[
                flashcardGroup.topic - 1
              ];
            return {
              title: topicName,
              subject: params.subject,
              number: flashcardGroup.flashcards.length,
              ...flashcardGroup,
            };
          })}
          columns={columns}
        />
      </div>

      <Button className="mt-6" variant="outline" asChild>
        <Link href={`/subjects/${params.subject}/flashcards/create`}>
          <Plus />
          Add flashcard group
        </Link>
      </Button>
    </div>
  );
};

export default Flashcards;
