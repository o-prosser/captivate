import { Atom, FlaskRound, Pi } from "lucide-react";

import mathsData from "@/data/maths.json";
import sciencesData from "@/data/science.json";

const getSubject = (id: string) => {
  const subjectEnum = getSubjectEnum(id);
  if (!subjectEnum) throw new Error("Unknown subject provided");

  const science =
    subjectEnum === "Physics"
      ? sciencesData.sciences.physics
      : subjectEnum === "Chemistry"
      ? sciencesData.sciences.chemistry
      : mathsData;

  return {
    enum: subjectEnum,
    ...science,
  };
};

const parseSubjectName = (name: string) => {
  if (name === "Maths") return "maths";
  if (name === "maths") return "maths";
  if (name === "Chemistry") return "chemistry";
  if (name === "chemistry") return "chemistry";
  if (name === "Physics") return "physics";
  if (name === "physics") return "physics";
  return null;
};

const SubjectIcon = ({
  subject,
  ...props
}: { subject: string } & React.ComponentPropsWithoutRef<"svg">) => {
  if (subject === "maths") return <Pi {...props} />;
  if (subject === "chemistry") return <FlaskRound {...props} />;
  if (subject === "physics") return <Atom {...props} />;
};

const useSubjectStyles = (subject: string) => {
  if (subject !== "maths" && subject !== "chemistry" && subject !== "physics")
    throw new Error("Incorrect subject provided:" + subject);

  const subjectColor =
    subject === "maths"
      ? "text-maths"
      : subject === "chemistry"
      ? "text-chemistry"
      : "text-physics";
  const importantSubjectColor =
    subject === "maths"
      ? "!text-maths [&>svg]:!text-maths hover:!text-maths [&:hover>svg]:!text-maths"
      : subject === "chemistry"
      ? "!text-chemistry [&>svg]:!text-chemistry hover:!text-chemistry [&:hover>svg]:!text-chemistry"
      : "!text-physics [&>svg]:!text-physics hover:!text-physics [&:hover>svg]:!text-physics";
  const subjectBorder =
    subject === "maths"
      ? "border-maths"
      : subject === "chemistry"
      ? "border-chemistry"
      : "border-physics";
  const subjectBackground =
    subject === "maths"
      ? "bg-maths/10 hover:bg-maths/10"
      : subject === "chemistry"
      ? "bg-chemistry/10 hover:bg-chemistry/10"
      : "bg-physics/10 hover:bg-physics/10";
  const SubjectIcon =
    subject === "maths" ? Pi : subject === "chemistry" ? FlaskRound : Atom;
  const gridArea =
    subject === "maths"
      ? "area-[maths]"
      : subject === "chemistry"
      ? "area-[chemistry]"
      : "area-[physics]";

  return {
    subjectColor,
    importantSubjectColor,
    subjectBorder,
    subjectBackground,
    SubjectIcon,
    gridArea,
  };
};

const getSubjectEnum = (value: string) => {
  if (value === "maths") return "Maths";
  if (value === "Maths") return "Maths";
  if (value === "chemistry") return "Chemistry";
  if (value === "Chemistry") return "Chemistry";
  if (value === "physics") return "Physics";
  if (value === "Physics") return "Physics";

  return null;
};

export {
  getSubject,
  parseSubjectName,
  useSubjectStyles,
  getSubjectEnum,
  SubjectIcon,
};
