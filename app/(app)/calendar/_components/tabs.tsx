import Link from "next/link";
import { format } from "date-fns";
import { Calendar, CalendarRange, FileText } from "lucide-react";

import { Button } from "@/ui/button";
import Tabs, { Tab } from "@/ui/tabs";

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

const TabsComponent = ({ active }: { active: string }) => {
  return (
    <Tabs>
      {pages.map((page, key) => (
        <Tab key={key} active={active === page.active}>
          <Button variant="ghost" size="sm" asChild>
            <Link href={page.href}>
              <page.icon />
              {page.label}
            </Link>
          </Button>
        </Tab>
      ))}
    </Tabs>
  );
};

export default TabsComponent;
