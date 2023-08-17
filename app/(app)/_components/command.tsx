"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clipboard,
  FileText,
  FlaskConical,
  FolderDown,
  Paperclip,
  Presentation,
  Search,
  StickyNote,
} from "lucide-react";

import { Button } from "@/ui/button";
import * as Command from "@/ui/command";

const commands = [
  {
    heading: "Maths",
    items: [
      {
        icon: Clipboard,
        href: "/subjects/maths/specification",
        label: "Specification",
      },
      {
        icon: FileText,
        href: "/subjects/maths/notes/1",
        label: "Notes — AS Unit 1",
      },
      {
        icon: FileText,
        href: "/subjects/maths/notes/2",
        label: "Notes — AS Unit 2",
      },
      {
        icon: FileText,
        href: "/subjects/maths/notes/3",
        label: "Notes — A2 Unit 3",
      },
      {
        icon: FileText,
        href: "/subjects/maths/notes/4",
        label: "Notes — A2 Unit 4",
      },
      {
        icon: Paperclip,
        href: "/subjects/maths/questions/past-papers",
        label: "Past papers",
      },
      {
        icon: Paperclip,
        href: "/subjects/maths/questions/topic-questions",
        label: "Topic questions",
      },
      {
        icon: FolderDown,
        href: "/subjects/maths/resources",
        label: "Resources",
      },
    ],
  },
  {
    heading: "Physics",
    items: [
      {
        icon: Clipboard,
        href: "/subjects/physics/specification",
        label: "Specification",
      },
      {
        icon: Presentation,
        href: "/subjects/physics/lessons",
        label: "Lessons",
      },
      {
        icon: FileText,
        href: "/subjects/physics/notes/1",
        label: "Notes — AS Unit 1",
      },
      {
        icon: FileText,
        href: "/subjects/physics/notes/2",
        label: "Notes — AS Unit 2",
      },
      {
        icon: FlaskConical,
        href: "/subjects/physics/practicals",
        label: "Practicals",
      },
      {
        icon: Paperclip,
        href: "/subjects/physics/questions/past-papers",
        label: "Past papers",
      },
      {
        icon: Paperclip,
        href: "/subjects/physics/questions/topic-questions",
        label: "Topic questions",
      },
      {
        icon: StickyNote,
        href: "/subjects/physics/flashcards",
        label: "Flaschards",
      },
      {
        icon: FolderDown,
        href: "/subjects/physics/resources",
        label: "Resources",
      },
    ],
  },
  {
    heading: "Chemistry",
    items: [
      {
        icon: Clipboard,
        href: "/subjects/chemistry/specification",
        label: "Specification",
      },
      {
        icon: Presentation,
        href: "/subjects/chemistry/lessons",
        label: "Lessons",
      },
      {
        icon: FileText,
        href: "/subjects/chemistry/notes/1",
        label: "Notes — AS Unit 1",
      },
      {
        icon: FileText,
        href: "/subjects/chemistry/notes/2",
        label: "Notes — AS Unit 2",
      },
      {
        icon: FlaskConical,
        href: "/subjects/chemistry/practicals",
        label: "Practicals",
      },
      {
        icon: Paperclip,
        href: "/subjects/chemistry/questions/past-papers",
        label: "Past papers",
      },
      {
        icon: Paperclip,
        href: "/subjects/chemistry/questions/topic-questions",
        label: "Topic questions",
      },
      {
        icon: StickyNote,
        href: "/subjects/chemistry/flashcards",
        label: "Flaschards",
      },
      {
        icon: FolderDown,
        href: "/subjects/chemistry/resources",
        label: "Resources",
      },
    ],
  },
];

const CommandBar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
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
        onClick={() => setOpen(true)}
        className="md:hidden"
      >
        <Search />
      </Button>
      <Command.Dialog open={open} onOpenChange={setOpen}>
        <Command.Input placeholder="Search for notes, tasks, events and questions..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          {commands.map((command, key) => (
            <Fragment key={key}>
              <Command.Group heading={command.heading}>
                {command.items.map(({ href, label, icon: Icon }, key) => (
                  <Command.Item
                    key={key}
                    onSelect={() => {
                      router.push(href);
                      setOpen(false);
                    }}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{label}</span>
                  </Command.Item>
                ))}
              </Command.Group>
              {commands.length - 1 == key && <Command.Separator />}
            </Fragment>
          ))}
        </Command.List>
      </Command.Dialog>
    </>
  );
};

export default CommandBar;
