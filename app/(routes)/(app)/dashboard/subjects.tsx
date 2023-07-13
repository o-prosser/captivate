import { Button, Card } from "@/ui";
import { cn } from "@/util";
import { useSubjectStyles } from "@/util/subjects";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const Subject = ({
  subject,
}: {
  subject: "maths" | "chemistry" | "physics";
}) => {
  const {
    subjectBorder,
    subjectBackground,
    subjectColor,
    SubjectIcon,
    gridArea,
  } = useSubjectStyles(subject);

  return (
    <Card.Root className={cn(subjectBorder, subjectBackground, gridArea)}>
      <Card.Header className="flex-row space-y-0 items-center space-x-2">
        <SubjectIcon className={cn("h-6 w-6", subjectColor)} />
        <Card.Title className="capitalize">{subject}</Card.Title>
      </Card.Header>

      <Card.Content className="flex flex-col items-start">
        <Button asChild variant="arrow" className="!mb-1">
          <Link href={`/subjects/${subject}/specification`}>
            Specification <ArrowRightIcon />
          </Link>
        </Button>
        <Button asChild variant="arrow" className="!mb-1">
          <Link href={`/subjects/${subject}/questions/past-papers`}>
            Past papers <ArrowRightIcon />
          </Link>
        </Button>
        {subject === "maths" ? (
          <Button asChild variant="arrow">
            <Link href={`/subjects/maths/questions/topic-papers`}>
              Topic papers <ArrowRightIcon />
            </Link>
          </Button>
        ) : (
          <>
            <Button asChild variant="arrow">
              <Link href={`/subjects/${subject}/practicals`}>
                Practicals <ArrowRightIcon />
              </Link>
            </Button>
          </>
        )}
      </Card.Content>
    </Card.Root>
  );
};

export default Subject;
