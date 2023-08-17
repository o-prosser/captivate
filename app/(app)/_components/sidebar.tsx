import Link from "next/link";
import {
  Atom,
  Calendar,
  Clipboard,
  FlaskRound,
  Home,
  MessageSquare,
  Pi,
  Settings,
} from "lucide-react";

import { createVar } from "@/util/cn";
import { Button } from "@/ui/button";
import { LogoIcon } from "@/ui/logo-icon";

import ActiveLink from "./active-link";

const LinkLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="pl-2 group-data-[expanded=true]/expanded:opacity-1 group-data-[expanded=false]/expanded:opacity-0 transition-all duration-100">
      {children}
    </span>
  );
};

const links = [
  [
    {
      icon: Home,
      label: "Home",
      href: "/dashboard",
      active: "/dashboard",
    },
    {
      icon: Calendar,
      label: "Calendar",
      href: "/calendar",
      active: "/calendar",
    },
    {
      icon: Clipboard,
      label: "Tasks",
      href: "/tasks",
      active: "/tasks",
    },
  ],
  [
    {
      icon: Pi,
      label: "Maths",
      href: "/subjects/maths",
      active: "/subjects/maths",
    },
    {
      icon: FlaskRound,
      label: "Chemistry",
      href: "/subjects/chemistry",
      active: "/subjects/chemistry",
    },
    {
      icon: Atom,
      label: "Physics",
      href: "/subjects/physics",
      active: "/subjects/physics",
    },
  ],
  [
    {
      icon: MessageSquare,
      label: "Support",
      href: "/support",
      active: "/support",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      active: "/settings",
    },
  ],
];

const Sidebar = () => {
  return (
    <aside
      className="hidden md:flex py-6 z-10 flex-col px-[15.5px] items-start bg-background fixed left-0 inset-y-0 h-[100dvh] print:!hidden overflow-hidden
      group-data-[expanded=true]/expanded:w-[15rem] group-data-[expanded=false]/expanded:w-[5.5rem] transition-all duration-100"
    >
      <Button variant="default" size={null} asChild>
        <Link href="/dashboard" className="p-2.5">
          <LogoIcon className="h-6 w-6" />
        </Link>
      </Button>

      <div className="flex flex-col space-y-1 [&>a>svg]:h-5 [&>a>svg]:w-5 [&>a>svg]:flex-shrink-0 mt-4 flex-1 group-data-[expanded=true]/expanded:w-full group-data-[expanded=false]/expanded:w-[2.75rem] transition-all duration-100">
        {links[0].map(({ label, icon: Icon, active, href }, key) => (
          <ActiveLink key={key} active={active}>
            <Button
              variant="ghost"
              asChild
              className="justify-start p-3 [&>svg]:!mr-0"
            >
              <Link href={href}>
                <Icon />
                <LinkLabel>{label}</LinkLabel>
              </Link>
            </Button>
          </ActiveLink>
        ))}

        <div className="h-2" />

        {links[1].map(({ label, icon: Icon, active, href }, key) => (
          <ActiveLink key={key} active={active}>
            <Button
              variant="ghost"
              asChild
              style={createVar({
                "--subject": `var(--${label.toLowerCase()})`,
              })}
              className="justify-start p-3 [&>svg]:!mr-0 data-[active=true]:bg-subject/10 data-[active=true]:!text-subject  [&[data-active=true]>svg]:!text-subject"
            >
              <Link href={href}>
                <Icon />
                <LinkLabel>{label}</LinkLabel>
              </Link>
            </Button>
          </ActiveLink>
        ))}

        <div className="flex-1" />

        {links[2].map(({ label, icon: Icon, active, href }, key) => (
          <ActiveLink key={key} active={active}>
            <Button
              variant="ghost"
              asChild
              className="justify-start p-3 [&>svg]:!mr-0"
            >
              <Link href={href}>
                <Icon />
                <LinkLabel>{label}</LinkLabel>
              </Link>
            </Button>
          </ActiveLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
