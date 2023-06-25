import { Heading, Text } from "@/ui";
import { ReactNode } from "react";

import sciencesData from "@/data/science.json";
import { notFound } from "next/navigation";
import Links from "./links";

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
    <div className="">
      <aside className="hidden md:block md:fixed overflow-x-hidden overflow-y-auto rounded-2xl w-60 border py-4 fixed inset-y-2 left-[5.5rem]">
        <Heading level={4} className="capitalize px-3 mb-0">
          {science.name}
        </Heading>
        <Text className="!mt-0 text-muted-foreground text-sm px-3">
          {science.fullName}
        </Text>

        <Links params={params} />
      </aside>

      <main className="min-h-screen -my-6 py-6 -mr-6 pr-6 md:-mr-8 md:pr-8 pl-[17rem]">
        {children}
      </main>
    </div>
  );
};

export default ScienceLayout;
