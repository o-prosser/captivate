"use client";

import Link from "next/link";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";

import { cn } from "@/util/cn";
import { Button } from "@/ui/button";

export type FlashcardTopic = {
  id: string;
  title: string;
  unit: number;
  topic: number;
  number: number;
  subject: string;
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
    {children} <ArrowUpDown className="ml-2" />
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
              href={`/subjects/${row.original.subject}/flashcards/${row.original.id}`}
            >
              <Eye />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
