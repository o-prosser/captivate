import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Button } from "@/ui/button";
import { LogoIcon } from "@/ui/logo-icon";
import ActiveLink from "@/components/active-link";

const links = [
  {
    label: "Home",
    href: "/docs",
    active: "/docs",
  },
  {
    label: "Managing tasks",
    href: "/docs/tasks",
    active: "/docs/tasks",
  },
  {
    label: "Managing events",
    href: "/docs/events",
    active: "/docs/events",
  },
  {
    label: "Your subjects",
    href: "/docs/subjects",
    active: "/docs/subjects",
  },
  {
    label: "Your timetable",
    href: "/docs/timetable",
    active: "/docs/timetable",
  },
  {
    label: "Notes and lessons",
    href: "/docs/notes-lessons",
    active: "/docs/notes-lessons",
  },
  {
    label: "Flashcards",
    href: "/docs/flashcards",
    active: "/docs/flashcards",
  },
  {
    label: "Past papers",
    href: "/docs/past-papers",
    active: "/docs/past-papers",
  },
  {
    label: "Customisation",
    href: "/docs/customisation",
    active: "/docs/customisation",
  },
  {
    label: "Profile",
    href: "/docs/profile",
    active: "/docs/profile",
  },
  {
    label: "Security",
    href: "/docs/security",
    active: "/docs/security",
  },
];

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen">
      <aside className="hidden md:flex py-6 z-10 flex-col px-[15.5px] items-start bg-background fixed left-0 inset-y-0 h-[100dvh] overflow-hidden w-60">
        <div className="flex gap-3 items-center">
          <Button variant="default" size={null} asChild>
            <Link href="/dashboard" className="p-2.5">
              <LogoIcon className="h-6 w-6" />
            </Link>
          </Button>
          <span className="font-semibold">Docs</span>
        </div>

        <div className="flex flex-col space-y-1 mt-4 flex-1 w-full">
          {links.map(({ label, active, href }, key) => (
            <ActiveLink key={key} active={active}>
              <Button variant="ghost" asChild className="justify-start">
                <Link href={href}>{label}</Link>
              </Button>
            </ActiveLink>
          ))}

          <div className="flex-1" />

          <Button variant="ghost" asChild className="justify-start">
            <Link href="/dashboard">
              Back to captivate <ExternalLink />
            </Link>
          </Button>
        </div>
      </aside>
      <main className="px-6 pt-[5.5rem] pb-[7.5rem] min-h-screen md:mr-6 md:my-6 md:pt-6 md:pb-4 md: ml-[15rem] md:min-h-[calc(100vh-3rem)] md:border border-border/50 md:rounded-2xl">
        {children}
      </main>
    </div>
  );
};

export default DocsLayout;
