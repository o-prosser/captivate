"use client";

import { Accordion, Button } from "@/ui";
import Link from "next/link";
import {
  ClipboardIcon,
  FileText,
  FlaskConicalIcon,
  FolderDownIcon,
  LayoutDashboardIcon,
  PaperclipIcon,
  PlusIcon,
  PresentationIcon,
  StickyNoteIcon,
} from "lucide-react";

const Links = ({ params }: { params: { science: string } }) => {
  return (
    <div className="space-y-1 flex flex-col [&>a>svg]:h-5 [&>a>svg]:w-5 [&>a]:justify-start [&>a]:rounded-none mt-4">
      <Button variant="ghost" asChild>
        <Link href={`/subjects/${params.science}/`}>
          <LayoutDashboardIcon />
          Dashboard
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href={`/subjects/${params.science}/specification`}>
          <ClipboardIcon />
          Specification
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href={`/subjects/${params.science}/lessons`}>
          <PresentationIcon />
          Lessons
        </Link>
      </Button>
      <Accordion.Root type="single" collapsible>
        <Accordion.Item value="notes" className="border-none">
          <Button variant="ghost" asChild>
            <Accordion.Trigger className="hover:no-underline [&[data-state=open]>svg:first-child]:rotate-0 rounded-none justify-start">
              <FileText className="!h-5 !w-5" />
              <span className="flex-1 text-left">Notes</span>
            </Accordion.Trigger>
          </Button>
          <Accordion.Content asChild>
            <div className="ml-6 pr-1 border-l pl-2 flex flex-col [&>a]:justify-start">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/subjects/${params.science}/notes/as-unit-1`}>
                  AS Unit 1
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/subjects/${params.science}/notes/as-unit-2`}>
                  AS Unit 2
                </Link>
              </Button>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
      <Button variant="ghost" asChild>
        <Link href={`/subjects/${params.science}/practicals`}>
          <FlaskConicalIcon />
          Practicals
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href={`/subjects/${params.science}/question-bank`}>
          <PaperclipIcon />
          Question bank
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href={`/subjects/${params.science}/flashcards`}>
          <StickyNoteIcon />
          Flashcards
        </Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link href={`/subjects/${params.science}/resources`}>
          <FolderDownIcon />
          Resources
        </Link>
      </Button>
    </div>
  );
};

export default Links;