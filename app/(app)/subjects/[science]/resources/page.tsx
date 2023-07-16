import { notFound } from "next/navigation";

import { Heading } from "@/ui/typography";
import DataTable from "@/components/data-table";
import { getScience } from "@/app/_util/pracitcals";

import { columns } from "./_components/columns";

const Resources = async ({ params }: { params: { science: string } }) => {
  const science = getScience(params.science);
  if (!science) notFound();

  return (
    <>
      <Heading>Resources</Heading>

      <div className="mt-8">
        <DataTable data={science.resources} columns={columns} />
      </div>
    </>
  );
};

export default Resources;
