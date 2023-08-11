import Link from "next/link";
import clsx from "clsx";
import { format } from "date-fns";
import { Calendar, CalendarRange, FileText } from "lucide-react";

import { Button } from "@/ui/button";

const pages = [
  {
    active: "calendar",
    label: "Calendar",
    href: `/calendar/${format(new Date(), "yyyy-MM-dd")}/month`,
    icon: Calendar,
  },
  {
    active: "timetable",
    label: "Timetable",
    href: `/calendar/timetable/1`,
    icon: CalendarRange,
  },
  {
    active: "exams",
    label: "Exams",
    href: `/calendar/exams`,
    icon: FileText,
  },
];

const Tabs = ({ active }: { active: string }) => {
  return (
    <div className="mb-6 flex gap-2 border-b">
      {pages.map((page, key) => (
        <Button
          key={key}
          variant="ghost"
          asChild
          className={clsx(
            "mb-1.5 relative",
            active === page.active &&
              "after:bg-primary after:absolute after:h-0.5 after:w-full after:-bottom-[7px] after:inset-x-0",
          )}
        >
          <Link href={page.href}>
            <page.icon
              className={clsx(active === page.active && "!text-primary")}
            />
            {page.label}
          </Link>
        </Button>
      ))}
    </div>
  );
};

export default Tabs;
