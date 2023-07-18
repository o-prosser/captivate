import Link from "next/link";
import { Subject } from "@prisma/client";
import { ChevronDownIcon } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { Button } from "@/ui/button";
import * as DropdownMenu from "@/ui/dropdown-menu";

const SelectPractise = async ({
  subject,
}: {
  subject: {
    enum: Subject;
    units: {
      number: number;
      name: string;
      topics: string[];
    }[];
  };
}) => {
  const subjectFlashcard = await prisma.flashcard.findFirst({
    where: {
      group: {
        subject: subject.enum,
      },
    },
    select: { id: true },
  });

  const unitFlashcards = await Promise.all(
    subject.units.map(async (unit) => {
      const flashcard = await prisma.flashcard.findFirst({
        where: {
          group: {
            unit: unit.number,
          },
        },
        select: { id: true },
      });

      return flashcard;
    })
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button className="mb-3">
          Practise
          <ChevronDownIcon className="ml-2 !mr-0" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" className="w-40">
        <DropdownMenu.Label>Practise all</DropdownMenu.Label>
        <DropdownMenu.Group>
          <DropdownMenu.Item asChild>
            <Link
              href={`/subjects/${subject.enum.toLowerCase()}/flashcards/practise/${
                subjectFlashcard?.id
              }?scope=subject&subject=${subject.enum}&type=all`}
            >
              Subject
            </Link>
          </DropdownMenu.Item>
          {subject.units.map((unit, key) => (
            <DropdownMenu.Item
              key={key}
              asChild
              disabled={!unitFlashcards[key]?.id}
            >
              <Link
                href={`/subjects/${subject.enum.toLowerCase()}/flashcards/practise/${
                  unitFlashcards[key]?.id
                }?scope=unit&unit=${unit.number}&subject=${
                  subject.enum
                }&type=all`}
              >
                Unit {unit.number}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
        <DropdownMenu.Label>Practise spaced</DropdownMenu.Label>
        <DropdownMenu.Group>
          <DropdownMenu.Item asChild>
            <Link
              href={`/subjects/${subject.enum.toLowerCase()}/flashcards/practise/${
                subjectFlashcard?.id
              }?scope=subject&subject=${subject.enum}&type=spaced`}
            >
              Subject
            </Link>
          </DropdownMenu.Item>
          {subject.units.map((unit, key) => (
            <DropdownMenu.Item
              key={key}
              asChild
              disabled={!unitFlashcards[key]?.id}
            >
              <Link
                href={`/subjects/${subject.enum.toLowerCase()}/flashcards/practise/${
                  unitFlashcards[key]?.id
                }?scope=unit&unit=${unit.number}&subject=${
                  subject.enum
                }&type=spaced`}
              >
                Unit {unit.number}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default SelectPractise;
