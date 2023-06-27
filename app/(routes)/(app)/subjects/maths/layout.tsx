import { ReactNode } from "react";

import Links from "./links";
import { SubjectLayout } from "@/components/subject-layout";

const MathsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SubjectLayout
      title="Maths"
      subTitle="WJEC AS/A2 Mathematics"
      links={<Links />}
    >
      {children}
    </SubjectLayout>
  );
};

export default MathsLayout;
