"use client";

import {
  CalculatorIcon,
  ClipboardIcon,
  FileTextIcon,
  FlaskConicalIcon,
  FolderDownIcon,
  LayoutDashboardIcon,
  PaperclipIcon,
  PresentationIcon,
  StickyNoteIcon,
} from "lucide-react";

// Links auto-prefix with subject name
const links = [
  {
    label: "Information",
    links: [
      {
        Icon: LayoutDashboardIcon,
        href: "/",
        label: "Dashboard",
        active: "/subjects/{subject}",
      },
      {
        Icon: ClipboardIcon,
        href: "/specification",
        label: "Specification",
      },
      {
        Icon: CalculatorIcon,
        href: "/grades",
        label: "Grade boundaries",
      },
    ],
  },
  {
    label: "Learning",
    links: [
      {
        Icon: PresentationIcon,
        href: "/lessons",
        label: "Lessons",
      },
      {
        Icon: FileTextIcon,
        href: "/notes/1",
        label: "Unit 1",
      },
      {
        Icon: FileTextIcon,
        href: "/notes/2",
        label: "Unit 2",
      },
      {
        Icon: FlaskConicalIcon,
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
        Icon: PaperclipIcon,
        href: "/questions/past-papers",
        label: "Past papers",
      },
      {
        Icon: PaperclipIcon,
        href: "/questions/topic-papers",
        label: "Topic papers",
      },
      {
        Icon: StickyNoteIcon,
        href: "/flashcards",
        label: "Flashcards",
        subjects: ["Chemistry, Physics"],
      },
    ],
  },
  {
    label: "Misc",
    links: [
      {
        Icon: FolderDownIcon,
        href: "/resources",
        label: "Resources",
      },
    ],
  },
];

export default links;
