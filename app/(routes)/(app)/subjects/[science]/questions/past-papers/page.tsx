import DataTable from "@/components/data-table";
import { Accordion, Breadcrumbs, Heading } from "@/ui";
import { getScience } from "@/util/pracitcals";
import { notFound } from "next/navigation";
import { columns } from "./columns";
import { Fragment } from "react";
import dropbox from "@/lib/dropbox";

const PastPapers = async ({ params }: { params: { science: string } }) => {
  const science = getScience(params.science);
  if (!science) notFound();

  const papers = await Promise.all(
    science.pastPapers.map(async (paper) => {
      let paperLink: string | null;

      try {
        const { result } = paper.paper
          ? await dropbox.filesGetTemporaryLink({
              path: `/Captivate Learning/${params.science}/papers/past-papers/${paper.paper}`,
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
              path: `/Captivate Learning/${params.science}/papers/past-papers/${paper.markscheme}`,
            })
          : { result: { link: "" } };

        msLink = result.link;
      } catch (error) {
        console.log(error);

        msLink = "";
      }

      return {
        science: params.science,
        paperLink,
        msLink,
        ...paper,
      };
    }),
  );

  const tables = [
    {
      id: "current",
      spec: "Current specification (2016–)",
      units: [
        "AS Unit 1 — Motion, Energy and Matter",
        "AS Unit 2 — Electricity and Light",
      ],
    },
    {
      id: "2009",
      spec: "Legacy specification (2009–2016)",
      units: [
        "AS Unit 1 — Motion, Energy and Charge",
        "AS Unit 2 — Waves and Particles",
      ],
    },
    {
      id: "2003",
      spec: "Legacy specification (2003–2009)",
      units: [
        "AS Unit 1 — Waves, Light and Basics",
        "AS Unit 2 — Quanta and Electricity",
      ],
    },
  ];

  return (
    <>
      <Breadcrumbs pages={[science.name, "Questions", "Past papers"]} />
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
