import { Button, Heading, Text } from "@/ui";
import { getScience } from "@/util/pracitcals";
import { notFound } from "next/navigation";
import DataTable from "@/components/data-table";
import { columns } from "./columns";
import Link from "next/link";
import { DownloadIcon } from "lucide-react";
import { DocumentCover } from "@/components";

const Practicals = ({ params }: { params: { science: string } }) => {
  const science = getScience(params.science);
  if (!science) notFound();

  const practicals = science.practicals.map((practical) => ({
    science: params.science,
    ...practical,
  }));

  return (
    <>
      <Heading>Practicals</Heading>

      <div className="flex mt-8 space-x-4">
        <DocumentCover
          unit="WJEC AS Unit 1/2"
          subject={science.name}
          title={["Specified practicals", "— student lab book"]}
          className="w-20 h-auto"
        />
        <div>
          <Heading level={4}>Lab book</Heading>
          <Text className="mb-3">
            Lab book for unit 1 and unit 2 practicals.
          </Text>

          <Button asChild>
            <Link download href={science.labBook}>
              <DownloadIcon />
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
