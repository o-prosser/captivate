import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/ui/button";
import { Heading } from "@/ui/typography";
import { DocumentCover } from "@/components/document-cover";
import { getScience } from "@/app/_util/pracitcals";

export const metadata = {
  title: "Notes",
};

const Unit1Notes = ({
  params,
}: {
  params: { science: string; unit: string };
}) => {
  const science = getScience(params.science);
  if (!science) notFound();

  const unit = science.units.filter(
    (unit) => unit.number === parseInt(params.unit)
  )[0];
  if (!unit) notFound();

  return (
    <>
      <Heading>
        Unit {params.unit} &mdash; {unit.name}
      </Heading>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6 mt-6 items-start">
        {unit.topics.map((topic, key) => (
          <Button
            key={key}
            asChild
            variant={null}
            size={null}
            className="flex-col text-base items-start hover:opacity-90 transition-opacity"
          >
            <Link
              href={`/subjects/${params.science}/notes/${params.unit}/${
                key + 1
              }`}
            >
              <DocumentCover
                unit={`AS Unit ${params.unit}.${key + 1}`}
                subject={science.name}
                title={`${params.unit}.${key + 1} — ${topic}`}
                className="w-full h-auto"
              />
              <span className="pt-3">
                <span className="font-normal">
                  {params.unit}.{key + 1} &mdash;
                </span>{" "}
                {topic}
              </span>
            </Link>
          </Button>
        ))}
      </div>
    </>
  );
};

export default Unit1Notes;
