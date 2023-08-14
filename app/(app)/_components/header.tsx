"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarPlus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pin,
  Plus,
  Search,
} from "lucide-react";

import { Button } from "@/ui/button";
import * as Dialog from "@/ui/dialog";
import * as DropdownMenu from "@/ui/dropdown-menu";
import { LogoIcon } from "@/ui/logo-icon";

import AddEvent from "./add-event";
import AddTask from "./add-task";
import CommandBar from "./command";
import Profile from "./profile";

const Header = ({
  user,
  eventDialog,
}: {
  user: { image?: string | null; id: string };
  eventDialog: React.ReactElement;
}) => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [addType, setAddType] = useState<"task" | "event">("task");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <header className="flex items-center justify-between border-b md:border-none fixed inset-x-0 top-0 md:static bg-background space-x-1 px-6 md:px-0 md:-ml-5 h-16 md:h-auto z-10 print:hidden md:pb-4">
        <Button variant="default" size={null} asChild iconOnly>
          <Link href="/dashboard" className="p-2.5 md:hidden">
            <LogoIcon className="h-5 w-5" />
          </Link>
        </Button>

        <Button variant="ghost" size="icon" onClick={router.back}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={router.forward}
          className="md:!ml-0"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          onClick={() => setCommandOpen(true)}
          className="text-muted-foreground hidden md:inline-flex"
        >
          <Search />
          <span className="lg:hidden">Notes, tasks, events...</span>
          <span className="hidden lg:inline">
            Notes, tasks, events and questions...
          </span>
          <span className="text-xs tracking-widest opacity-60 inline-flex -m-1 p-1 ml-2 rounded-xl bg-muted">
            ⌘K
          </span>
        </Button>

        <div className="flex-1" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCommandOpen(true)}
          className="md:hidden"
        >
          <Search />
        </Button>

        <CommandBar open={commandOpen} setOpen={setCommandOpen} />

        <Dialog.Root open={addOpen} onOpenChange={setAddOpen}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="outline" className="px-3 !mr-2.5">
                <Plus />
                <ChevronDown className="text-muted-foreground !h-3 !w-3 !mr-0" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Group>
                <Dialog.Trigger asChild onClick={() => setAddType("task")}>
                  <DropdownMenu.Item>
                    <Pin /> Add task
                  </DropdownMenu.Item>
                </Dialog.Trigger>
                <Dialog.Trigger asChild onClick={() => setAddType("event")}>
                  <DropdownMenu.Item>
                    <CalendarPlus /> Add event
                  </DropdownMenu.Item>
                </Dialog.Trigger>
              </DropdownMenu.Group>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Dialog.Content>
            {addType === "event" ? (
              eventDialog
            ) : (
              <AddTask close={setAddOpen} userId={user.id} />
            )}
          </Dialog.Content>
        </Dialog.Root>

        <Profile setCommandOpen={setCommandOpen} image={user.image} />
      </header>

      <header className="hidden absolute print:block left-8 top-6">
        <Image src="/logo.svg" alt="Captivate Logo" height={27} width={160} />
      </header>
    </>
  );
};

export default Header;
