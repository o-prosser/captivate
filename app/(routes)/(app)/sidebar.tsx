import { Button, LogoIcon } from "@/ui";
import { FlaskRoundIcon, MessageSquareIcon, SettingsIcon } from "lucide-react";
import {
  AtomIcon,
  CalendarIcon,
  ClipboardIcon,
  HomeIcon,
  PiIcon,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex py-6 flex-col items-center w-[5.5rem] fixed left-0 inset-y-0 h-screen">
      <Button variant="default" size={null} asChild iconOnly>
        <Link href="/dashboard" className="p-2.5">
          <LogoIcon className="h-6 w-6" />
        </Link>
      </Button>

      <div className="flex flex-col space-y-1 [&>a>svg]:h-5 [&>a>svg]:w-5 [&>a]:p-3 mt-4 flex-1">
        <Button variant="ghost" size={null} iconOnly asChild>
          <Link href="/dashboard">
            <HomeIcon />
          </Link>
        </Button>
        <Button variant="ghost" size={null} iconOnly asChild>
          <Link href="/timetable">
            <CalendarIcon />
          </Link>
        </Button>
        <Button variant="ghost" size={null} iconOnly asChild>
          <Link href="/tasks">
            <ClipboardIcon />
          </Link>
        </Button>

        <div className="h-2" />

        <Button variant="ghost" size={null} iconOnly asChild>
          <Link href="/subjects/maths">
            <PiIcon />
          </Link>
        </Button>
        <Button variant="ghost" size={null} iconOnly asChild>
          <Link href="/subjects/chemistry">
            <FlaskRoundIcon />
          </Link>
        </Button>
        <Button variant="ghost" size={null} iconOnly asChild>
          <Link href="/subjects/physics">
            <AtomIcon />
          </Link>
        </Button>

        <div className="flex-1" />

        <Button variant="ghost" size={null} iconOnly asChild>
          <Link href="/support">
            <MessageSquareIcon />
          </Link>
        </Button>
        <Button variant="ghost" size={null} iconOnly asChild>
          <Link href="/settings">
            <SettingsIcon />
          </Link>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
