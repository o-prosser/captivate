import DataTable from "@/components/data-table";
import { Button, Heading } from "@/ui";
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
      <div className="flex justify-between items-start flex-col-reverse sm:flex-row">
        <Heading className="mb-8">Flashcards</Heading>
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
