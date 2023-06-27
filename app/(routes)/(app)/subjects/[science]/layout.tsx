import { ReactNode } from "react";
import { notFound } from "next/navigation";

import sciencesData from "@/data/science.json";
import Links from "./links";
import { SubjectLayout } from "@/components/subject-layout";

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
      links={<Links params={params} />}
    >
      {children}
    </SubjectLayout>
  );
};

export default ScienceLayout;
