import DataTable from "@/components/data-table";
import { Accordion, Heading } from "@/ui";
import { columns } from "./columns";
import { Fragment } from "react";
import mathsData from "@/data/maths.json";

const PastPapers = async () => {
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
                      data={mathsData.pastPapers.filter(
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
