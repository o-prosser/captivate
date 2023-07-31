import { SubjectPageProps } from "@/types/subjects";

import GradeBoundaries from "../_components/grades-page";

export const metadata = {
  title: "Grade boundaries",
};

const Page = ({ params }: SubjectPageProps) => (
  <GradeBoundaries subject={params.subject} />
);

export default Page;
