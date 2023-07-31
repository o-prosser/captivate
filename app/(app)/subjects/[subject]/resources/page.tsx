import type { SubjectPageProps } from "@/types/subjects";
import { getSubject } from "@/util/subjects";
import { Heading } from "@/ui/typography";
import DataTable from "@/components/data-table";

import { columns } from "./_components/columns";

export const metadata = {
  title: "Resources",
};

const Resources = async ({ params }: SubjectPageProps) => {
  const subject = getSubject(params.subject);

  return (
    <>
      <Heading>Resources</Heading>

      <div className="mt-6">
        <DataTable data={subject.resources} columns={columns} />
      </div>
    </>
  );
};

export default Resources;
