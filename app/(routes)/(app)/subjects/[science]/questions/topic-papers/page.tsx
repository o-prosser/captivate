import DataTable from "@/components/data-table";
import { Accordion, Breadcrumbs, Heading } from "@/ui";
import { getScience } from "@/util/pracitcals";
import { notFound } from "next/navigation";
import { columns } from "./columns";
import { Fragment } from "react";

const TopicPapers = async ({ params }: { params: { science: string } }) => {
  const science = getScience(params.science);
  if (!science) notFound();

  return (
    <>
      <Breadcrumbs pages={[science.name, "Questions", "Topic papers"]} />
      <Heading>Topic papers</Heading>

      {science.units.map((unit, key) => (
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
                      data={science.topicPapers.filter(
                        (p) => p.unit === unit.number && p.topic === key + 1,
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

      <Heading level={2}>Practical papers</Heading>
      <Accordion.Root type="single" collapsible>
        {science.practicals.map((practical, key) => (
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
  );
};

export default TopicPapers;
