import { ReactNode } from "react";
import { notFound } from "next/navigation";

import sciencesData from "@/data/science.json";
import { SubjectLayout } from "@/components/subject-layout";
import links from "./links";

const ScienceLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { science: string };
}) => {
  if (params.science !== "physics" && params.science !== "chemistry")
    notFound();
  const science =
    params.science === "physics"
      ? sciencesData.sciences.physics
      : sciencesData.sciences.chemistry;

  return (
    <SubjectLayout
      title={science.name}
      subTitle={science.fullName}
      links={links}
    >
      {children}
    </SubjectLayout>
  );
};

export default ScienceLayout;
