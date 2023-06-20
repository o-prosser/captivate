import { Heading, Text } from "@/ui";
import { ReactNode } from "react";

import Links from "./links";

const MathsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid md:grid-cols-[15rem,1fr] h-[calc(100vh-3rem)]">
      <aside className="hidden md:block overflow-x-hidden overflow-y-auto -my-4 rounded-2xl border py-4 -ml-8 mr-8 h-[calc(100vh-1rem)]">
        <Heading level={4} className="capitalize px-3 mb-0">
          Maths
        </Heading>
        <Text className="!mt-0 text-muted-foreground text-sm px-3">
          WJEC AS/A2 Mathematics
        </Text>

        <Links />
      </aside>

      <main className="h-screen -my-6 py-6 overflow-y-auto -mr-6 pr-6 md:-mr-8 md:pr-8">
        {children}
      </main>
    </div>
  );
};

export default MathsLayout;
