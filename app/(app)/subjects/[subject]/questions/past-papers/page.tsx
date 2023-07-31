import { Fragment } from "react";
import { notFound } from "next/navigation";

import { SubjectPageProps } from "@/types/subjects";
import { getScience } from "@/util/pracitcals";
import { getSubject } from "@/util/subjects";
import * as Accordion from "@/ui/accordion";
import { Heading } from "@/ui/typography";
import DataTable from "@/components/data-table";

import { columns } from "./_components/columns";

export const metadata = {
  title: "Past papers",
};

const PastPapers = async ({ params }: SubjectPageProps) => {
  const subject = getSubject(params.subject);

  const pastPapers = subject.pastPapers.map((paper) => ({
    subject: params.subject,
    ...paper,
  }));

  return (
    <>
      <Heading>Past papers</Heading>

      {subject.paperTables.map((table, key) => (
        <Fragment key={key}>
          <Heading level={2}>{table.spec}</Heading>
          <Accordion.Root type="single" collapsible>
            {table.units.map((unit, key) => (
              <Accordion.Item key={key} value={`${table.id}-${key + 1}`}>
                <Accordion.Trigger>{unit}</Accordion.Trigger>
                <Accordion.Content>
                  <div className="pb-4 -mt-8">
                    <DataTable
                      data={pastPapers.filter(
                        (paper) =>
                          paper.spec === table.id && paper.unit === key + 1
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
    </>
  );
};

export default PastPapers;
