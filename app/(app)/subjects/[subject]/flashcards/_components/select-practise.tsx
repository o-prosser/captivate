import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { db } from "@/lib/db";
import { Button } from "@/ui/button";
import * as DropdownMenu from "@/ui/dropdown-menu";

const SelectPractise = async ({
  subject,
}: {
  subject: {
    id: string;
    units: {
      number: number;
      name: string;
      topics: string[];
    }[];
  };
}) => {
  const subjectFlashcard = await db.query.flashcardGroupsTable.findFirst({
    where: (fields, { eq }) => eq(fields.subjectId, subject.id),
    columns: { id: true },
    with: {
      flashcards: {
        columns: { id: true },
        limit: 1,
      },
    },
  });

  const unitFlashcards = await Promise.all(
    subject.units.map(async (unit) => {
      const flashcard = await db.query.flashcardGroupsTable.findFirst({
        where: (fields, { eq }) => eq(fields.unit, unit.number),
        columns: { id: true },
        with: {
          flashcards: {
            columns: { id: true },
            limit: 1,
          },
        },
      });

      return flashcard;
    }),
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button className="mb-3">
          Practise
          <ChevronDown className="ml-2 !mr-0" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" className="w-40">
        <DropdownMenu.Label>Practise all</DropdownMenu.Label>
        <DropdownMenu.Group>
          <DropdownMenu.Item asChild>
            <Link
              href={`/subjects/${subject.id.toLowerCase()}/flashcards/practise/${subjectFlashcard
                ?.flashcards[0].id}?scope=subject&subject=${
                subject.id
              }&type=all`}
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
                href={`/subjects/${subject.id.toLowerCase()}/flashcards/practise/${unitFlashcards[
                  key
                ]?.flashcards[0].id}?scope=unit&unit=${unit.number}&subject=${
                  subject.id
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
              href={`/subjects/${subject.id.toLowerCase()}/flashcards/practise/${subjectFlashcard
                ?.flashcards[0].id}?scope=subject&subject=${
                subject.id
              }&type=spaced`}
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
                href={`/subjects/${subject.id.toLowerCase()}/flashcards/practise/${unitFlashcards[
                  key
                ]?.flashcards[0].id}?scope=unit&unit=${unit.number}&subject=${
                  subject.id
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
