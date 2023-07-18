import { SciencePageProps } from "@/types/science";

import GradeBoundaries from "../../_components/grades-page";

export const metadata = {
  title: "Grade boundaries",
};

const Page = ({ params }: SciencePageProps) => (
  <GradeBoundaries subject={params.science} />
);

export default Page;
