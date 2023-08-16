import { notFound } from "next/navigation";

import { getSubject } from "@/util/subjects";
import { Heading } from "@/ui/typography";
import { createView } from "@/models/view";

import GetMarkdown from "./_components/get-markdown";

type Params = { subject: string; unit: string; topic: string };

export const generateMetadata = ({ params }: { params: Params }) => ({
  title: `Notes – Unit ${params.unit}.${params.topic}`,
});

const NoteTopic = async ({ params }: { params: Params }) => {
  const subject = getSubject(params.subject);

  const unit = subject.units.filter(
    (unit) => unit.number === parseInt(params.unit),
  )[0];
  if (!unit) notFound();

  const topic = unit.topics[parseInt(params.topic) - 1];
  if (!topic) notFound();

  await createView({
    url: `/notes/${params.subject}/notes/${params.unit}/${params.topic}`,
  });

  return (
    <>
      <Heading>{topic}</Heading>
      <GetMarkdown
        subject={params.subject}
        unit={parseInt(params.unit)}
        topic={parseInt(params.topic)}
      />
    </>
  );
};

export default NoteTopic;
