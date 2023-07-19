import * as Accordion from "@/ui/accordion";
import { Heading } from "@/ui/typography";

const GradesBrakedown = ({
  unit,
}: {
  unit: {
    unit: number;
    total: number;
    years: {
      year: number;
      A: number;
      B: number;
      C: number;
      D: number;
      E: number;
    }[];
  };
}) => {
  return (
    <Accordion.Root className="mt-3" type="single" collapsible>
      <Accordion.Item value={unit.unit.toString()}>
        <Accordion.Trigger>Yearly breakdown</Accordion.Trigger>
        <Accordion.Content>
          {unit.years.map((year, key) => (
            <div
              className="[&:not(:first-child)]:mt-6 [&:last-child]:pb-4"
              key={key}
            >
              <Heading level={4} className="mb-1">
                {year.year}
              </Heading>
              <div className="border divide-y rounded-2xl overflow-hidden">
                <div className="flex divide-x bg-muted">
                  <p className="w-1/6 font-medium py-2 px-2 text-sm"></p>
                  <p className="w-1/6 font-medium py-2 px-2 text-sm">A</p>
                  <p className="w-1/6 font-medium py-2 px-2 text-sm">B</p>
                  <p className="w-1/6 font-medium py-2 px-2 text-sm">C</p>
                  <p className="w-1/6 font-medium py-2 px-2 text-sm">D</p>
                  <p className="w-1/6 font-medium py-2 px-2 text-sm">E</p>
                </div>
                <div className="flex divide-x">
                  <p className="w-1/6 py-2 px-2 text-sm">Mark</p>
                  <p className="w-1/6 py-2 px-2 text-sm">{year.A}</p>
                  <p className="w-1/6 py-2 px-2 text-sm">{year.B}</p>
                  <p className="w-1/6 py-2 px-2 text-sm">{year.C}</p>
                  <p className="w-1/6 py-2 px-2 text-sm">{year.D}</p>
                  <p className="w-1/6 py-2 px-2 text-sm">{year.E}</p>
                </div>
                <div className="flex divide-x">
                  <p className="w-1/6 py-2 px-2 text-sm">%</p>
                  <p className="w-1/6 py-2 px-2 text-sm">
                    {((year.A / unit.total) * 100).toFixed(0)}%
                  </p>
                  <p className="w-1/6 py-2 px-2 text-sm">
                    {((year.B / unit.total) * 100).toFixed(0)}%
                  </p>
                  <p className="w-1/6 py-2 px-2 text-sm">
                    {((year.C / unit.total) * 100).toFixed(0)}%
                  </p>
                  <p className="w-1/6 py-2 px-2 text-sm">
                    {((year.D / unit.total) * 100).toFixed(0)}%
                  </p>
                  <p className="w-1/6 py-2 px-2 text-sm">
                    {((year.E / unit.total) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default GradesBrakedown;
