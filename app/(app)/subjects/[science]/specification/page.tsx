import { notFound } from "next/navigation";

import { getScience } from "@/util/pracitcals";
import { Heading } from "@/ui/typography";

import ChemistrySpecification from "./_markdown/chemistry-specification.mdx";
import PhysicsSpecification from "./_markdown/physics-specification.mdx";

const Specification = ({ params }: { params: { science: string } }) => {
  const science = getScience(params.science);
  if (!science) notFound();

  return (
    <>
      <Heading className="mb-6">Specification</Heading>

      {params.science === "physics" && <PhysicsSpecification />}
      {params.science === "chemistry" && <ChemistrySpecification />}
    </>
  );
};

export default Specification;
