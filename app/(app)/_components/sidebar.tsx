"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  AtomIcon,
  CalendarIcon,
  ClipboardIcon,
  FlaskRoundIcon,
  HomeIcon,
  MessageSquareIcon,
  PiIcon,
  SettingsIcon,
} from "lucide-react";

import { cn } from "@/util/cn";
import { Button } from "@/ui/button";
import { LogoIcon } from "@/ui/logo-icon";
import { useSubjectStyles } from "@/app/_util/subjects";

const links = [
  [
    {
      icon: HomeIcon,
      label: "Home",
      href: "/dashboard",
      active: "/dashboard",
    },
    {
      icon: CalendarIcon,
      label: "Calendar",
      href: "/calendar",
      active: "/calendar",
    },
    {
      icon: ClipboardIcon,
      label: "Tasks",
      href: "/tasks",
      active: "/tasks",
    },
  ],
  [
    {
      icon: PiIcon,
      label: "Maths",
      href: "/subjects/maths",
      active: "/subjects/maths",
    },
    {
      icon: FlaskRoundIcon,
      label: "Chemistry",
      href: "/subjects/chemistry",
      active: "/subjects/chemistry",
    },
    {
      icon: AtomIcon,
      label: "Physics",
      href: "/subjects/physics",
      active: "/subjects/physics",
    },
  ],
  [
    {
      icon: MessageSquareIcon,
      label: "Support",
      href: "/support",
      active: "/support",
    },
    {
      icon: SettingsIcon,
      label: "Settings",
      href: "/settings",
      active: "/settings",
    },
  ],
];

const Sidebar = ({ expanded }: { expanded: boolean }) => {
  const pathname = usePathname();

  const mathsStyles = useSubjectStyles("maths");
  const chemistryStyles = useSubjectStyles("chemistry");
  const physicsStyles = useSubjectStyles("physics");

  return (
    <motion.aside
      variants={{ expand: { width: "15rem" }, contract: { width: "5.5rem" } }}
      initial={{ width: "15rem" }}
      animate={expanded ? "expand" : "contract"}
      transition={{ duration: 0.1 }}
      className="hidden md:flex py-6 z-10 flex-col px-[15.5px] items-start bg-background fixed left-0 inset-y-0 h-[100dvh] print:!hidden overflow-hidden"
    >
      <Button variant="default" size={null} asChild iconOnly>
        <Link href="/dashboard" className="p-2.5">
          <LogoIcon className="h-6 w-6" />
        </Link>
      </Button>

      <motion.div
        variants={{
          expand: { width: "100%" },
          contract: { width: "2.75rem" },
        }}
        initial="expand"
        animate={expanded ? "expand" : "contract"}
        transition={{ duration: 0 }}
        className="flex flex-col space-y-1 [&>a>svg]:h-5 [&>a>svg]:w-5 [&>a>svg]:flex-shrink-0 mt-4 flex-1"
      >
        {links[0].map(({ label, icon: Icon, active, href }, key) => (
          <Button
            variant="ghost"
            asChild
            key={key}
            className={cn(
              pathname.startsWith(active) &&
                "bg-muted [&>svg]:!text-foreground",
              "justify-start p-3 [&>svg]:!mr-0"
            )}
          >
            <Link href={href}>
              <Icon />
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.span
                    variants={{
                      expand: { opacity: 1 },
                      contract: { opacity: 0 },
                    }}
                    className="pl-2"
                    transition={{ duration: 0.1 }}
                    initial="contract"
                    animate="expand"
                    exit="contract"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </Button>
        ))}

        <div className="h-2" />

        {links[1].map(({ label, icon: Icon, active, href }, key) => {
          const styles =
            label.toLowerCase() === "maths"
              ? mathsStyles
              : label.toLowerCase() === "chemistry"
              ? chemistryStyles
              : physicsStyles;

          return (
            <Button
              variant="ghost"
              asChild
              key={key}
              className={cn(
                pathname.startsWith(active) && styles.subjectBackground,
                pathname.startsWith(active) && styles.importantSubjectColor,
                "justify-start p-3 [&>svg]:!mr-0"
              )}
            >
              <Link href={href}>
                <Icon />
                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.span
                      variants={{
                        expand: { opacity: 1 },
                        contract: { opacity: 0 },
                      }}
                      className="pl-2"
                      transition={{ duration: 0.1 }}
                      initial="contract"
                      animate="expand"
                      exit="contract"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </Button>
          );
        })}

        <div className="flex-1" />

        {links[2].map(({ label, icon: Icon, active, href }, key) => (
          <Button
            variant="ghost"
            asChild
            key={key}
            className={cn(
              pathname.startsWith(active) &&
                "bg-muted [&>svg]:!text-foreground",
              "justify-start p-3 [&>svg]:!mr-0"
            )}
          >
            <Link href={href}>
              <Icon />
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.span
                    variants={{
                      expand: { opacity: 1 },
                      contract: { opacity: 0 },
                    }}
                    className="pl-2"
                    transition={{ duration: 0.1 }}
                    initial="contract"
                    animate="expand"
                    exit="contract"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </Button>
        ))}
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;