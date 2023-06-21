import { Button, Heading } from "@/ui";
import { ClipboardListIcon } from "lucide-react";
import Link from "next/link";

const Timetable = () => {
  return (
    <>
      <div className="flex space-y-4 md:space-y-0 justify-between">
        <Heading>Timetable</Heading>
        <Button asChild>
          <Link href="/timetable/exams">
            <ClipboardListIcon />
            Exam timetable
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Timetable;
