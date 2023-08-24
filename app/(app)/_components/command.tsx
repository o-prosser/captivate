"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Atom,
  Calculator,
  Clipboard,
  FileText,
  FlaskConical,
  FlaskRound,
  FolderDown,
  Laptop,
  LayoutDashboard,
  Moon,
  Paperclip,
  Pi,
  Plus,
  Presentation,
  Search,
  StickyNote,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/ui/button";
import * as Command from "@/ui/command";

import { createTask } from "./actions";

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
  const ref = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { setTheme } = useTheme();

  const [pages, setPages] = useState<string[]>(["home"]);
  const activePage = pages[pages.length - 1];

  const isHome = activePage === "home";

  const selectSubject = (subject: string) => {
    setPages([...pages, subject]);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const popPage = useCallback(() => {
    setPages((pages) => {
      const x = [...pages];
      x.splice(-1, 1);
      return x;
    });
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isHome || inputValue.length) {
        return;
      }

      if (e.key === "Backspace") {
        e.preventDefault();
        popPage();
      }
    },
    [inputValue.length, isHome, popPage],
  );

  const bounce = () => {
    if (!ref.current) return;

    ref.current.style.transform = "scale(0.96)";

    setTimeout(() => {
      if (ref.current) {
        ref.current.style.transform = "";
      }
    }, 100);

    setInputValue("");
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="text-muted-foreground hidden md:inline-flex md:w-72 hover:bg-background px-3"
      >
        <Search />
        <span className="flex-1 text-left">Search</span>
        <span className="text-xs tracking-widest opacity-60 inline-flex -m-1 p-1 ml-2 rounded-md bg-muted">
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
        <Command.Root
          ref={ref}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              if (activePage === "add task") {
                await createTask(inputValue);
                router.push("/tasks");
                setOpen(false);
              }
              bounce();
            }

            if (isHome || inputValue.length) return;

            if (e.key === "Backspace" && activePage !== "add task") {
              e.preventDefault();
              popPage();
              bounce();
            }
          }}
        >
          <div>
            {pages.map((p) => (
              <Button
                size={null}
                variant={null}
                onClick={() => setPages(["home"])}
                key={p}
                className="h-5 bg-muted px-2 text-xs rounded my-1 ml-1 select-none capitalize"
              >
                {p}
              </Button>
            ))}
          </div>
          <Command.Input
            autoFocus
            placeholder={
              activePage === "add task" ? "Choose a title" : "What do you need?"
            }
            onValueChange={(value) => {
              setInputValue(value);
            }}
          />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>
            {activePage === "home" ? (
              <>
                <Command.Group heading="Calendar">
                  <Command.Item>
                    <ArrowRight />
                    View calendar
                  </Command.Item>
                </Command.Group>
                <Command.Group heading="Tasks">
                  <Command.Item>
                    <ArrowRight />
                    View tasks
                  </Command.Item>
                  <Command.Item
                    onSelect={() => setPages([...pages, "add task"])}
                  >
                    <Plus />
                    Add new task
                  </Command.Item>
                </Command.Group>
                <Command.Group heading="Subjects">
                  <Command.Item onSelect={() => selectSubject("maths")}>
                    <Pi />
                    Maths
                  </Command.Item>
                  <Command.Item onSelect={() => selectSubject("chemistry")}>
                    <FlaskRound />
                    Chemistry
                  </Command.Item>
                  <Command.Item onSelect={() => selectSubject("physics")}>
                    <Atom />
                    Physics
                  </Command.Item>
                </Command.Group>
                <Command.Group heading="Appearance">
                  <Command.Item onSelect={() => setTheme("system")}>
                    <Laptop />
                    Change theme to system
                  </Command.Item>
                  <Command.Item onSelect={() => setTheme("light")}>
                    <Sun />
                    Change theme to light
                  </Command.Item>
                  <Command.Item onSelect={() => setTheme("dark")}>
                    <Moon />
                    Change theme to dark
                  </Command.Item>
                </Command.Group>
              </>
            ) : (
              ""
            )}
            {activePage === "maths" ||
            activePage === "chemistry" ||
            activePage === "physics" ? (
              <>
                <Command.Group heading="Information">
                  <Command.Item
                    onSelect={() => router.push(`/subjects/${activePage}`)}
                  >
                    <LayoutDashboard />
                    Dashboard
                  </Command.Item>
                  <Command.Item
                    onSelect={() =>
                      router.push(`/subjects/${activePage}/specification`)
                    }
                  >
                    <Clipboard />
                    Specification
                  </Command.Item>
                  <Command.Item
                    onSelect={() =>
                      router.push(`/subjects/${activePage}/grades`)
                    }
                  >
                    <Calculator />
                    Grade boundaries
                  </Command.Item>
                </Command.Group>
                <Command.Group heading="Revision">
                  <Command.Item
                    onSelect={() =>
                      router.push(
                        `/subjects/${activePage}/questions/past-papers`,
                      )
                    }
                  >
                    <Paperclip />
                    Past papers
                  </Command.Item>
                  <Command.Item
                    onSelect={() =>
                      router.push(
                        `/subjects/${activePage}/questions/topic-papers`,
                      )
                    }
                  >
                    <Paperclip />
                    Topic papers
                  </Command.Item>
                  {activePage !== "maths" && (
                    <Command.Item
                      onSelect={() =>
                        router.push(`/subjects/${activePage}/flashcards`)
                      }
                    >
                      <StickyNote />
                      Flashcards
                    </Command.Item>
                  )}
                </Command.Group>
                <Command.Group heading="Misc">
                  <Command.Item
                    onSelect={() =>
                      router.push(`/subjects/${activePage}/questions/resources`)
                    }
                  >
                    <FolderDown />
                    Resources
                  </Command.Item>
                </Command.Group>
              </>
            ) : (
              ""
            )}
            {activePage === "add task" ? (
              <Command.Item>Choose a title</Command.Item>
            ) : (
              ""
            )}
            {/* {commands.map((command, key) => (
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
                    <Icon />
                    <span>{label}</span>
                  </Command.Item>
                ))}
              </Command.Group>
              {commands.length - 1 == key && <Command.Separator />}
            </Fragment>
          ))} */}
          </Command.List>
        </Command.Root>
      </Command.Dialog>
    </>
  );
};

export default CommandBar;
