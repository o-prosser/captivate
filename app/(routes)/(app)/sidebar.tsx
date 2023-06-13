import { Button, Label } from "@/ui";
import { FlaskRoundIcon } from "lucide-react";
import {
  AtomIcon,
  CalendarIcon,
  ClipboardIcon,
  HomeIcon,
  PiIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="hidden md:block row-span-2 border-r">
      <Button variant="link" asChild>
        <Link href="/dashboard" className="ml-6 inline-flex mt-4">
          <Image
            src="/logo.svg"
            alt="Captivate Logo"
            height={24}
            width={138.86}
          />
        </Link>
      </Button>

      <div className="px-2 flex flex-col space-y-1 [&>a]:w-full [&>a]:!justify-start [&>label]:pl-4 [&>label]:pt-8 [&>label]:text-muted-foreground [&>label]:pb-2">
        <Label>Pages</Label>
        <Button variant="ghost" asChild>
          <Link href="/dashboard">
            <HomeIcon />
            Dashboard
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/timetable">
            <CalendarIcon />
            Timetable
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/tasks">
            <ClipboardIcon />
            Tasks
          </Link>
        </Button>
        <Label>Subjects</Label>
        <Button variant="ghost" asChild>
          <Link href="/dashboard">
            <PiIcon />
            Maths
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/timetable">
            <FlaskRoundIcon />
            Chemistry
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/tasks">
            <AtomIcon />
            Physics
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
