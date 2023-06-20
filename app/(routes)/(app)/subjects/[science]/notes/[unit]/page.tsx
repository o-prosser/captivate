import { Breadcrumbs, Button, Heading, OrderedList } from "@/ui";
import { getScience } from "@/util/pracitcals";
import { notFound } from "next/navigation";
import Link from "next/link";

const Unit1Notes = ({
  params,
}: {
  params: { science: string; unit: string };
}) => {
  const science = getScience(params.science);
  if (!science) notFound();

  const unit = science.units.filter(
    (unit) => unit.number === parseInt(params.unit),
  )[0];
  if (!unit) notFound();

  return (
    <>
      <Breadcrumbs pages={[science.name, "Notes", "AS Unit 1"]} />
      <Heading>Notes &mdash; {unit.name}</Heading>

      {/* {params.science === "physics" && <Physics1Notes />}
      {params.science === "chemistry" && <Chemistry1Notes />} */}

      <OrderedList>
        {unit.topics.map((topic, key) => (
          <li key={key}>
            <Button asChild variant="link">
              <Link
                href={`/subjects/${params.science}/notes/${params.unit}/${
                  key + 1
                }`}
              >
                {topic}
              </Link>
            </Button>
          </li>
        ))}
      </OrderedList>
    </>
  );
};

export default Unit1Notes;
