import mathsData from "@/data/maths.json";
import * as Accordion from "@/ui/accordion";
import { Heading } from "@/ui/typography";
import DataTable from "@/components/data-table";

import { columns } from "./columns";

export const metadata = {
  title: "Topic papers",
};

const PastPapers = async () => {
  const units = [
    "AS Unit 1 — Pure Mathematics A",
    "AS Unit 2 — Applied Mathematics A",
    "A2 Unit 2 — Pure Mathematics B",
    "A2 Unit 3 — Applied Mathematics B",
  ];

  return (
    <>
      <Heading>Topic papers</Heading>

      <Accordion.Root className="mt-6" type="single" collapsible>
        {units.map((unit, key) => (
          <Accordion.Item key={key} value={`${key}`}>
            <Accordion.Trigger>{unit}</Accordion.Trigger>
            <Accordion.Content>
              <div className="pb-4 -mt-8">
                <DataTable
                  data={mathsData.topicPapers.filter(
                    (paper) =>
                      paper.unit.toString().split(".")[0] ===
                      (key + 1).toString()
                  )}
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

export default PastPapers;