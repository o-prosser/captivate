import { notFound } from "next/navigation";

import { getScience } from "@/util/pracitcals";
import { Heading } from "@/ui/typography";

import GetMarkdown from "./_components/get-markdown";

type Params = { science: string; unit: string; topic: string };

export const generateMetadata = ({ params }: { params: Params }) => ({
  title: `Notes – Unit ${params.unit}.${params.topic}`,
});

const NoteTopic = ({ params }: { params: Params }) => {
  const science = getScience(params.science);
  if (!science) notFound();

  const unit = science.units.filter(
    (unit) => unit.number === parseInt(params.unit)
  )[0];
  if (!unit) notFound();

  const topic = unit.topics[parseInt(params.topic) - 1];
  if (!topic) notFound();

  return (
    <>
      <Heading>{topic}</Heading>
      <GetMarkdown
        science={params.science}
        unit={parseInt(params.unit)}
        topic={parseInt(params.topic)}
      />
    </>
  );
};

export default NoteTopic;
