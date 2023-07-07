"use client";

import { Button } from "@/ui";
import { cn } from "@/util";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon, EyeIcon } from "lucide-react";
import Link from "next/link";

export type FlashcardTopic = {
  id: string;
  title: string;
  unit: number;
  topic: number;
  number: number;
  science: string;
};

const SortHeader = ({
  children,
  column,
  first = false,
}: {
  children: React.ReactNode;
  column: Column<FlashcardTopic, unknown>;
  first?: boolean;
}) => (
  <Button
    variant="ghost"
    className={cn(first ? "-ml-2 pl-2 pr-0" : "-ml-4 pr-2")}
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {children} <ArrowUpDownIcon className="ml-2" />
  </Button>
);

export const columns: ColumnDef<FlashcardTopic>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortHeader column={column} first>
        Topic name
      </SortHeader>
    ),
    cell: ({ row }) => {
      return <span className="font-medium">{row.original.title}</span>;
    },
  },
  {
    id: "reference",
    header: ({ column }) => <SortHeader column={column}>Reference</SortHeader>,
    cell: ({ row }) => {
      return (
        <span>
          Unit {row.original.unit}.{row.original.topic}
        </span>
      );
    },
  },
  {
    accessorKey: "number",
    header: "Flashcards",
    cell: ({ row }) => {
      return row.original.number ? (
        <span>{row.original.number}</span>
      ) : (
        <span className="italic text-muted-foreground">No flashcards</span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <Button variant="ghost" iconOnly asChild>
            <Link
              href={`/subjects/${row.original.science}/flashcards/${row.original.id}`}
            >
              <EyeIcon />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
