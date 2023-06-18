import { Breadcrumbs, Heading } from "@/ui";
import { getScience } from "@/util/pracitcals";
import { notFound } from "next/navigation";
import DataTable from "@/components/data-table";
import { columns } from "./columns";

const Practicals = ({ params }: { params: { science: string } }) => {
  const science = getScience(params.science);
  if (!science) notFound();

  const practicals = science.practicals.map((practical) => ({
    science: params.science,
    ...practical,
  }));

  return (
    <>
      <Breadcrumbs pages={[science.name, "Practicals"]} />
      <Heading>Practicals</Heading>

      <DataTable columns={columns} data={practicals} />
    </>
  );
};

export default Practicals;
