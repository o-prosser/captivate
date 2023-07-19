import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import { getSubject } from "@/util/subjects";
import * as Card from "@/ui/card";
import { Heading } from "@/ui/typography";

const getAverageNumber = (
  unit: {
    years: {
      A: number;
      B: number;
      C: number;
      D: number;
      E: number;
    }[];
  },
  letter: "A" | "B" | "C" | "D" | "E"
) => {
  const grades = unit.years.map((year) => year[letter]);
  let total = 0;
  grades.forEach((grade) => (total += grade));

  return (total / grades.length).toFixed(0);
};

const getAveragePercentage = (
  unit: {
    years: {
      A: number;
      B: number;
      C: number;
      D: number;
      E: number;
    }[];
    total: number;
  },
  letter: "A" | "B" | "C" | "D" | "E"
) => {
  const grades = unit.years.map((year) => year[letter]);
  let total = 0;
  grades.forEach((grade) => (total += grade));

  return ((total * 100) / (grades.length * unit.total)).toFixed(0);
};

const GradesBrakedown = dynamic(() => import("./grades-breakdown"), {
  ssr: false,
});

const GradeBoundaries = (props: { subject: string }) => {
  const subject = getSubject(props.subject);
  if (!subject) notFound();

  return (
    <>
      <Heading>Grade boundaries</Heading>

      {subject.gradeBoundaries.map((unit, key) => (
        <Card.Root key={key} className="mt-6">
          <Card.Header>
            <Card.Title>
              Unit {unit.unit} &mdash; {subject.units[key].name}
            </Card.Title>
            <Card.Description>
              Total marks available: {unit.total}
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Heading level={4} className="mb-1">
              Average
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
                <p className="w-1/6 py-2 px-2 text-sm">
                  {getAverageNumber(unit, "A")}
                </p>
                <p className="w-1/6 py-2 px-2 text-sm">
                  {getAverageNumber(unit, "B")}
                </p>
                <p className="w-1/6 py-2 px-2 text-sm">
                  {getAverageNumber(unit, "C")}
                </p>
                <p className="w-1/6 py-2 px-2 text-sm">
                  {getAverageNumber(unit, "D")}
                </p>
                <p className="w-1/6 py-2 px-2 text-sm">
                  {getAverageNumber(unit, "E")}
                </p>
              </div>
              <div className="flex divide-x">
                <p className="w-1/6 py-2 px-2 text-sm">%</p>
                <p className="w-1/6 py-2 px-2 text-sm">
                  {getAveragePercentage(unit, "A")}%
                </p>
                <p className="w-1/6 py-2 px-2 text-sm">
                  {getAveragePercentage(unit, "B")}%
                </p>
                <p className="w-1/6 py-2 px-2 text-sm">
                  {getAveragePercentage(unit, "C")}%
                </p>
                <p className="w-1/6 py-2 px-2 text-sm">
                  {getAveragePercentage(unit, "D")}%
                </p>
                <p className="w-1/6 py-2 px-2 text-sm">
                  {getAveragePercentage(unit, "E")}%
                </p>
              </div>
            </div>

            <GradesBrakedown unit={unit} />
          </Card.Content>
        </Card.Root>
      ))}
    </>
  );
};

export default GradeBoundaries;
