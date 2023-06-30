import DataTable from "@/components/data-table";
import { Accordion, Breadcrumbs, Heading } from "@/ui";
import { getScience } from "@/util/pracitcals";
import { notFound } from "next/navigation";
import { columns } from "./columns";
import { Fragment } from "react";

const physicsTables = [
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

const chemistryTables = [
  {
    id: "current",
    spec: "Current specification (2016–)",
    units: [
      "AS Unit 1 — The Language of Chemistry, Structure of Matter and Simple Reactions",
      "AS Unit 2 — Energy, Rate and Chemistry of Carbon Compounds",
    ],
  },
  {
    id: "2009",
    spec: "Legacy specification (2009–2016)",
    units: ["AS Unit 1", "AS Unit 2"],
  },
  {
    id: "2003",
    spec: "Legacy specification (2003–2009)",
    units: ["AS Unit 1", "AS Unit 2", "AS Unit 3a"],
  },
];

const PastPapers = async ({ params }: { params: { science: string } }) => {
  const science = getScience(params.science);
  if (!science) notFound();

  const tables = params.science == "physics" ? physicsTables : chemistryTables;

  const pastPapers = science.pastPapers.map((paper) => ({
    science: params.science,
    ...paper,
  }));

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
                      data={pastPapers.filter(
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
