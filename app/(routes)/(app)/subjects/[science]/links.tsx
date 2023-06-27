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
    <div className="space-y-1 flex flex-col [&>a>svg]:h-5 [&>a>svg]:w-5 [&>a]:justify-start md:[&>a]:rounded-none mt-4">
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
            <Accordion.Trigger className="hover:no-underline [&[data-state=open]>svg:first-child]:rotate-0 md:rounded-none justify-start">
              <FileText className="!h-5 !w-5" />
              <span className="flex-1 text-left">Notes</span>
            </Accordion.Trigger>
          </Button>
          <Accordion.Content asChild>
            <div className="ml-6 pr-1 border-l pl-2 flex flex-col [&>a]:justify-start">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/subjects/${params.science}/notes/1`}>
                  AS Unit 1
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/subjects/${params.science}/notes/2`}>
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
      <Accordion.Root type="single" collapsible>
        <Accordion.Item value="questions" className="border-none">
          <Button variant="ghost" asChild>
            <Accordion.Trigger className="hover:no-underline [&[data-state=open]>svg:first-child]:rotate-0 md:rounded-none justify-start">
              <PaperclipIcon className="!h-5 !w-5" />
              <span className="flex-1 text-left">Questions</span>
            </Accordion.Trigger>
          </Button>
          <Accordion.Content asChild>
            <div className="ml-6 pr-1 border-l pl-2 flex flex-col [&>a]:justify-start">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href={`/subjects/${params.science}/questions/past-papers`}
                >
                  Past papers
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href={`/subjects/${params.science}/questions/topic-questions`}
                >
                  Topic questions
                </Link>
              </Button>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
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
