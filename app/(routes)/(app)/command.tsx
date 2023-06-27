import { Command } from "@/ui";
import {
  ClipboardIcon,
  FileTextIcon,
  FlaskConicalIcon,
  FolderDownIcon,
  PaperclipIcon,
  PresentationIcon,
  StickyNoteIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const commands = [
  {
    heading: "Maths",
    items: [
      {
        icon: ClipboardIcon,
        href: "/subjects/maths/specification",
        label: "Specification",
      },
      {
        icon: FileTextIcon,
        href: "/subjects/maths/notes/1",
        label: "Notes — AS Unit 1",
      },
      {
        icon: FileTextIcon,
        href: "/subjects/maths/notes/2",
        label: "Notes — AS Unit 2",
      },
      {
        icon: FileTextIcon,
        href: "/subjects/maths/notes/3",
        label: "Notes — A2 Unit 3",
      },
      {
        icon: FileTextIcon,
        href: "/subjects/maths/notes/4",
        label: "Notes — A2 Unit 4",
      },
      {
        icon: PaperclipIcon,
        href: "/subjects/maths/questions/past-papers",
        label: "Past papers",
      },
      {
        icon: PaperclipIcon,
        href: "/subjects/maths/questions/topic-questions",
        label: "Topic questions",
      },
      {
        icon: FolderDownIcon,
        href: "/subjects/maths/resources",
        label: "Resources",
      },
    ],
  },
  {
    heading: "Physics",
    items: [
      {
        icon: ClipboardIcon,
        href: "/subjects/physics/specification",
        label: "Specification",
      },
      {
        icon: PresentationIcon,
        href: "/subjects/physics/lessons",
        label: "Lessons",
      },
      {
        icon: FileTextIcon,
        href: "/subjects/physics/notes/1",
        label: "Notes — AS Unit 1",
      },
      {
        icon: FileTextIcon,
        href: "/subjects/physics/notes/2",
        label: "Notes — AS Unit 2",
      },
      {
        icon: FlaskConicalIcon,
        href: "/subjects/physics/practicals",
        label: "Practicals",
      },
      {
        icon: PaperclipIcon,
        href: "/subjects/physics/questions/past-papers",
        label: "Past papers",
      },
      {
        icon: PaperclipIcon,
        href: "/subjects/physics/questions/topic-questions",
        label: "Topic questions",
      },
      {
        icon: StickyNoteIcon,
        href: "/subjects/physics/flashcards",
        label: "Flaschards",
      },
      {
        icon: FolderDownIcon,
        href: "/subjects/physics/resources",
        label: "Resources",
      },
    ],
  },
  {
    heading: "Chemistry",
    items: [
      {
        icon: ClipboardIcon,
        href: "/subjects/chemistry/specification",
        label: "Specification",
      },
      {
        icon: PresentationIcon,
        href: "/subjects/chemistry/lessons",
        label: "Lessons",
      },
      {
        icon: FileTextIcon,
        href: "/subjects/chemistry/notes/1",
        label: "Notes — AS Unit 1",
      },
      {
        icon: FileTextIcon,
        href: "/subjects/chemistry/notes/2",
        label: "Notes — AS Unit 2",
      },
      {
        icon: FlaskConicalIcon,
        href: "/subjects/chemistry/practicals",
        label: "Practicals",
      },
      {
        icon: PaperclipIcon,
        href: "/subjects/chemistry/questions/past-papers",
        label: "Past papers",
      },
      {
        icon: PaperclipIcon,
        href: "/subjects/chemistry/questions/topic-questions",
        label: "Topic questions",
      },
      {
        icon: StickyNoteIcon,
        href: "/subjects/chemistry/flashcards",
        label: "Flaschards",
      },
      {
        icon: FolderDownIcon,
        href: "/subjects/chemistry/resources",
        label: "Resources",
      },
    ],
  },
];

const CommandBar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  return (
    <Command.Dialog open={open} onOpenChange={setOpen}>
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>
        {commands.map((command, key) => (
          <>
            <Command.Group key={key} heading={command.heading}>
              {command.items.map(({ href, label, icon: Icon }, key) => (
                <Command.Item onSelect={() => router.push(href)}>
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{label}</span>
                </Command.Item>
              ))}
            </Command.Group>
            {commands.length - 1 == key && <Command.Separator />}
          </>
        ))}
      </Command.List>
    </Command.Dialog>
  );
};

export default CommandBar;
