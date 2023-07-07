import DataTable from "@/components/data-table";
import { Breadcrumbs, Button, Heading } from "@/ui";
import { getFlashcards } from "@/util/flashcards";
import { getScience } from "@/util/pracitcals";
import { notFound } from "next/navigation";
import { columns } from "./columns";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { getSubjectEnum } from "@/util/subjects";
import { prisma } from "@/lib/prisma";

const Flashcards = async ({ params }: { params: { science: string } }) => {
  const science = getScience(params.science);
  if (!science) notFound();

  const subject = getSubjectEnum(params.science);
  if (!subject) notFound();

  const flashcardGroups = await prisma.flashcardGroup.findMany({
    where: {
      subject,
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
      <Breadcrumbs pages={["Physics", "Flashcards"]} />
      <div className="flex justify-between items-start flex-col-reverse sm:flex-row mt-3 md:mt-7">
        <Heading className="mb-8 mt-0">Flashcards</Heading>
        <Button className="mb-3" asChild>
          <Link href={`/subjects/${params.science}/flashcards/create`}>
            <PlusIcon />
            Add page
          </Link>
        </Button>
      </div>

      <DataTable
        data={flashcardGroups.map((flashcardGroup) => {
          const topicName =
            science.units[flashcardGroup.unit - 1].topics[
              flashcardGroup.topic - 1
            ];
          return {
            title: topicName,
            science: params.science,
            number: flashcardGroup._count.flashcards,
            ...flashcardGroup,
          };
        })}
        columns={columns}
      />
    </>
  );
};

export default Flashcards;
