import { SciencePageProps } from "@/types/science";

import Index from "../_components/index-page";

const Page = ({ params }: SciencePageProps) => (
  <Index subject={params.science} />
);

export default Page;
