import { Fragment } from "react";
import { notFound } from "next/navigation";

import { SubjectPageProps } from "@/types/subjects";
import { getSubject } from "@/util/subjects";
import * as Accordion from "@/ui/accordion";
import { Heading } from "@/ui/typography";
import DataTable from "@/app/_components/data-table";

import { columns } from "./_components/columns";

export const metadata = {
  title: "Topic papers",
};

const TopicPapers = async ({ params }: SubjectPageProps) => {
  const subject = getSubject(params.subject);

  return (
    <>
      <Heading>Topic papers</Heading>

      {subject.units.map((unit, key) => (
        <Fragment key={key}>
          <Heading level={2}>
            Unit {unit.number} &mdash; {unit.name}
          </Heading>
          <Accordion.Root type="single" collapsible>
            {unit.topics.map((topic, key) => (
              <Accordion.Item key={key} value={`${topic}-${key + 1}`}>
                <Accordion.Trigger>
                  Topic {key + 1} &mdash; {topic}
                </Accordion.Trigger>
                <Accordion.Content>
                  <div className="pb-4 -mt-8">
                    <DataTable
                      data={subject.topicPapers.filter(
                        (p) => p.unit === unit.number && p.topic === key + 1
                      )}
                      columns={columns}
                    />
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Fragment>
      ))}

      {subject.practicals !== null ? (
        <>
          <Heading level={2}>Practical papers</Heading>
          <Accordion.Root type="single" collapsible>
            {subject.practicals.map((practical, key) => (
              <Accordion.Item key={key} value={`${practical.id}-${key + 1}`}>
                <Accordion.Trigger>
                  Unit {practical.reference} &mdash; {practical.name}
                </Accordion.Trigger>
                <Accordion.Content>
                  <div className="pb-4 -mt-8">
                    <DataTable
                      data={practical.questions.map((q) => ({
                        title: q.reference,
                        paper: q.download,
                      }))}
                      columns={columns}
                    />
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default TopicPapers;
