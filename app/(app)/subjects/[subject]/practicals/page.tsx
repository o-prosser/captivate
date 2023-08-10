import Link from "next/link";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";

import type { SubjectPageProps } from "@/types/subjects";
import { getSubject } from "@/util/subjects";
import { Button } from "@/ui/button";
import { Heading, Text } from "@/ui/typography";
import DataTable from "@/components/data-table";
import { DocumentCover } from "@/components/document-cover";

import { columns } from "./_components/columns";

export const metadata = {
  title: "Practicals",
};

const Practicals = ({ params }: SubjectPageProps) => {
  const subject = getSubject(params.subject);
  if (subject.practicals === null) notFound();

  const practicals = subject.practicals.map((practical) => ({
    subject: params.subject,
    ...practical,
  }));

  return (
    <>
      <Heading>Practicals</Heading>

      <div className="flex mt-8 space-x-4">
        <DocumentCover
          unit="WJEC AS Unit 1/2"
          subject={subject.name}
          title={["Specified practicals", "— student lab book"]}
          className="w-20 h-auto"
        />
        <div>
          <Heading level={4}>Lab book</Heading>
          <Text className="mb-3">
            Lab book for unit 1 and unit 2 practicals.
          </Text>

          <Button asChild>
            <Link download href={subject.labBook}>
              <Download />
              Download booklet
            </Link>
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={practicals} />
    </>
  );
};

export default Practicals;
