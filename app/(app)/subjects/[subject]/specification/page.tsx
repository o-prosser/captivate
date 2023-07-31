import type { SubjectPageProps } from "@/types/subjects";
import { Heading } from "@/ui/typography";

import ChemistrySpecification from "./_markdown/chemistry-specification.mdx";
import MathsSpecification from "./_markdown/maths-specification.mdx";
import PhysicsSpecification from "./_markdown/physics-specification.mdx";

const Specification = ({ params }: SubjectPageProps) => {
  return (
    <>
      <Heading className="mb-6">Specification</Heading>

      {params.subject === "physics" && <PhysicsSpecification />}
      {params.subject === "chemistry" && <ChemistrySpecification />}
      {params.subject === "maths" && <MathsSpecification />}
    </>
  );
};

export default Specification;
