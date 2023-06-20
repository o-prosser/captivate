import { Breadcrumbs, Heading } from "@/ui";
import { getScience } from "@/util/pracitcals";
import { notFound } from "next/navigation";
import GetMarkdown from "./get-markdown";

const NoteTopic = ({
  params,
}: {
  params: { science: string; unit: string; topic: string };
}) => {
  const science = getScience(params.science);
  if (!science) notFound();

  const unit = science.units.filter(
    (unit) => unit.number === parseInt(params.unit),
  )[0];
  if (!unit) notFound();

  const topic = unit.topics[parseInt(params.topic) - 1];
  if (!topic) notFound();

  return (
    <>
      <Breadcrumbs pages={[science.name, "Notes", "AS Unit 1", topic]} />
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
