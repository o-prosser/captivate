import { Button, Heading } from "@/ui";
import { notFound } from "next/navigation";
import sciencesData from "@/data/science.json";
import Link from "next/link";
import { DownloadIcon } from "lucide-react";

export const generateMetadata = ({
  params,
}: {
  params: { science: string };
}) => {
  const science =
    params.science === "physics"
      ? sciencesData.sciences.physics
      : sciencesData.sciences.chemistry;

  return {
    title: science.name,
  };
};

const Science = ({ params }: { params: { science: string } }) => {
  if (params.science !== "physics" && params.science !== "chemistry")
    notFound();
  const science =
    params.science === "physics"
      ? sciencesData.sciences.physics
      : sciencesData.sciences.chemistry;

  return (
    <>
      <Heading>{science.name}</Heading>

      <Button asChild className="mt-6">
        <Link href={science.specificationLink}>
          <DownloadIcon />
          Download specification
        </Link>
      </Button>
    </>
  );
};

export default Science;
