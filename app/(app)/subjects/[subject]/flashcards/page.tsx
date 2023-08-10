import Link from "next/link";
import { Plus } from "lucide-react";

import { SubjectPageProps } from "@/types/subjects";
import { prisma } from "@/lib/prisma";
import { getSubject } from "@/util/subjects";
import { Button } from "@/ui/button";
import { Heading } from "@/ui/typography";
import DataTable from "@/components/data-table";

import { columns } from "./_components/columns";
import SelectPractise from "./_components/select-practise";

export const metadata = {
  title: "Flashcards",
};

const Flashcards = async ({ params }: SubjectPageProps) => {
  const subject = getSubject(params.subject);

  const flashcardGroups = await prisma.flashcardGroup.findMany({
    where: {
      subject: subject.enum,
    },
    select: {
      id: true,
      unit: true,
      topic: true,
      _count: {
        select: { flashcards: true },
      },
    },
  });

  return (
    <>
      <div className="flex justify-between items-start flex-col-reverse sm:flex-row">
        <Heading className="mb-8">Flashcards</Heading>
        <SelectPractise subject={subject} />
      </div>

      <DataTable
        data={flashcardGroups.map((flashcardGroup) => {
          const topicName =
            subject.units[flashcardGroup.unit - 1].topics[
              flashcardGroup.topic - 1
            ];
          return {
            title: topicName,
            subject: params.subject,
            number: flashcardGroup._count.flashcards,
            ...flashcardGroup,
          };
        })}
        columns={columns}
      />

      <Button className="mt-6" variant="outline" asChild>
        <Link href={`/subjects/${params.subject}/flashcards/create`}>
          <Plus />
          Add flashcard group
        </Link>
      </Button>
    </>
  );
};

export default Flashcards;
