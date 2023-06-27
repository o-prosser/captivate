import { Button, Heading, Text, Sheet } from "@/ui";
import { ReactNode } from "react";

import sciencesData from "@/data/science.json";
import { notFound } from "next/navigation";
import Links from "./links";
import { MenuIcon } from "lucide-react";

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
      <nav className="flex items-center border-b fixed inset-x-6 top-16 bg-background h-12 z-10 md:hidden">
        <Sheet.Root>
          <Sheet.Trigger asChild>
            <Button
              iconOnly
              variant="ghost"
              className="[&>svg]:h-5 [&>svg]:w-5 text-opacity-75 -ml-3 hover:bg-background"
            >
              <MenuIcon />
            </Button>
          </Sheet.Trigger>
          <Sheet.Content side="left">
            <Sheet.Header>
              <Sheet.Title className="mb-0 capitalize">
                {science.name}
              </Sheet.Title>
              <Sheet.Description>{science.fullName}</Sheet.Description>
            </Sheet.Header>

            <Links params={params} />
          </Sheet.Content>
        </Sheet.Root>
      </nav>

      <aside className="hidden md:block md:fixed overflow-x-hidden overflow-y-auto rounded-2xl w-60 border py-4 fixed inset-y-2 left-[5.5rem]">
        <Heading level={4} className="capitalize px-3 mb-0">
          {science.name}
        </Heading>
        <Text className="!mt-0 text-muted-foreground text-sm px-3">
          {science.fullName}
        </Text>

        <Links params={params} />
      </aside>

      <main className="min-h-screen md:pl-[17rem] pt-12">{children}</main>
    </div>
  );
};

export default ScienceLayout;
