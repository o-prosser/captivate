import { ReactNode } from "react";

import { SubjectLayout } from "../_components/subject-layout";
import links from "./links";

export const metadata = {
  title: {
    template: "Maths – %s",
    default: "Maths",
  },
};

const MathsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SubjectLayout
      title="Maths"
      subTitle="WJEC AS/A2 Mathematics"
      links={links}
    >
      {children}
    </SubjectLayout>
  );
};

export default MathsLayout;
