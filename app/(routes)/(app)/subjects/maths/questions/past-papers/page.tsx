import DataTable from "@/components/data-table";
import { Accordion, Breadcrumbs, Heading } from "@/ui";
import { getScience } from "@/util/pracitcals";
import { notFound } from "next/navigation";
import { columns } from "./columns";
import { Fragment } from "react";
import dropbox from "@/lib/dropbox";
import mathsData from "@/data/maths.json";

const PastPapers = async () => {
  const papers = await Promise.all(
    mathsData.pastPapers.map(async (paper) => {
      let paperLink: string | null;

      try {
        const { result } = paper.paper
          ? await dropbox.filesGetTemporaryLink({
              path: `/Captivate Learning/maths/papers/past-papers/${paper.paper}`,
            })
          : { result: { link: "" } };

        paperLink = result.link;
      } catch (error) {
        console.log(error);

        paperLink = "";
      }

      let msLink: string | null;

      try {
        const { result } = paper.markscheme
          ? await dropbox.filesGetTemporaryLink({
              path: `/Captivate Learning/maths/papers/past-papers/${paper.markscheme}`,
            })
          : { result: { link: "" } };

        msLink = result.link;
      } catch (error) {
        console.log(error);

        msLink = "";
      }

      return {
        paperLink,
        msLink,
        ...paper,
      };
    }),
  );

  const tables = [
    {
      id: "current",
      spec: "Current specification (2018–)",
      units: [
        "AS Unit 1 — Pure Mathematics A",
        "AS Unit 2 — Applied Mathematics A",
        "A2 Unit 2 — Pure Mathematics B",
        "A2 Unit 3 — Applied Mathematics B",
      ],
    },
  ];

  return (
    <>
      <Breadcrumbs pages={["Maths", "Questions", "Past papers"]} />
      <Heading>Past papers</Heading>

      {tables.map((table, key) => (
        <Fragment key={key}>
          <Heading level={2}>{table.spec}</Heading>
          <Accordion.Root type="single" collapsible>
            {table.units.map((unit, key) => (
              <Accordion.Item key={key} value={`${table.id}-${key + 1}`}>
                <Accordion.Trigger>{unit}</Accordion.Trigger>
                <Accordion.Content>
                  <div className="pb-4 -mt-8">
                    <DataTable
                      data={papers.filter(
                        (paper) =>
                          paper.spec === table.id && paper.unit === key + 1,
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
