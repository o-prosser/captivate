import { Heading } from "@/ui";
import { getScience } from "@/util/pracitcals";
import ChemistrySpecification from "./chemistry-specification.mdx";
import PhysicsSpecification from "./physics-specification.mdx";
import { notFound } from "next/navigation";

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
