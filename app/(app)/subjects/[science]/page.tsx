import Link from "next/link";
import { notFound } from "next/navigation";
import { DownloadIcon } from "lucide-react";

import sciencesData from "@/data/science.json";
import { Button } from "@/ui/button";
import { Heading } from "@/ui/typography";

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
