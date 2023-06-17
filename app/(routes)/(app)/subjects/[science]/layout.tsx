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
    <div className="grid md:grid-cols-[15rem,1fr] h-[calc(100vh-3rem)]">
      <aside className="hidden md:block overflow-x-hidden overflow-y-auto -my-4 rounded-2xl border py-4 -ml-8 mr-8 h-[calc(100vh-1rem)]">
        <Heading level={4} className="capitalize px-3 mb-0">
          {science.name}
        </Heading>
        <Text className="!mt-0 text-muted-foreground text-sm px-3">
          {science.fullName}
        </Text>

        <Links params={params} />
      </aside>

      <main className="h-screen -my-6 py-6 overflow-y-auto -mr-6 pr-6 md:-mr-8 md:pr-8">
        {children}
      </main>
    </div>
  );
};

export default ScienceLayout;