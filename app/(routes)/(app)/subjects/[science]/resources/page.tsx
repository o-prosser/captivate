import DataTable from "@/components/data-table";
import { Accordion, Breadcrumbs, Heading } from "@/ui";
import { getScience } from "@/util/pracitcals";
import { notFound } from "next/navigation";
import { columns } from "./columns";
import { Fragment } from "react";

const Resources = async ({ params }: { params: { science: string } }) => {
  const science = getScience(params.science);
  if (!science) notFound();

  return (
    <>
      <Breadcrumbs pages={[science.name, "Questions", "Resources"]} />
      <Heading>Resources</Heading>

      <div className="mt-8">
        <DataTable data={science.resources} columns={columns} />
      </div>
    </>
  );
};

export default Resources;
