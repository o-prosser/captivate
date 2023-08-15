import { SubjectPageProps } from "@/types/subjects";

import Index from "./_components/index-page";

const Page = ({ params }: SubjectPageProps) => (
  <Index subject={params.subject} />
);

export default Page;
export const runtime = "edge";
export const revalidate = 60;
