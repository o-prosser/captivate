import {
  Calculator,
  Clipboard,
  FileText,
  FlaskConical,
  FolderDown,
  Home,
  LayoutDashboard,
  LucideIcon,
  Paperclip,
  Presentation,
  StickyNote,
} from "lucide-react";

// Links auto-prefix with subject name
const links: {
  label: string;
  links: {
    Icon: LucideIcon;
    href: string;
    label: string;
    active?: string;
    subjects?: string[];
  }[];
}[] = [
  {
    label: "Information",
    links: [
      {
        Icon: Home,
        href: "/",
        label: "Dashboard",
        active: "/subjects/{subject}",
      },
      {
        Icon: Clipboard,
        href: "/specification",
        label: "Specification",
      },
      {
        Icon: Calculator,
        href: "/grades",
        label: "Grade boundaries",
      },
    ],
  },
  {
    label: "Learning",
    links: [
      {
        Icon: Presentation,
        href: "/lessons",
        label: "Lessons",
      },
      {
        Icon: FileText,
        href: "/notes/1",
        label: "Unit 1",
      },
      {
        Icon: FileText,
        href: "/notes/2",
        label: "Unit 2",
      },
      {
        Icon: FileText,
        href: "/notes/3",
        label: "Unit 3",
        subjects: ["Maths"],
      },
      {
        Icon: FileText,
        href: "/notes/4",
        label: "Unit 4",
        subjects: ["Maths"],
      },
      {
        Icon: FlaskConical,
        href: "/practicals",
        label: "Practicals",
        subjects: ["Physics", "Chemistry"],
      },
    ],
  },
  {
    label: "Revision",
    links: [
      {
        Icon: Paperclip,
        href: "/questions/past-papers",
        label: "Past papers",
      },
      {
        Icon: Paperclip,
        href: "/questions/topic-papers",
        label: "Topic papers",
      },
      {
        Icon: StickyNote,
        href: "/flashcards",
        label: "Flashcards",
        subjects: ["Chemistry", "Physics"],
      },
    ],
  },
  {
    label: "Misc",
    links: [
      {
        Icon: FolderDown,
        href: "/resources",
        label: "Resources",
      },
    ],
  },
];

export default links;
