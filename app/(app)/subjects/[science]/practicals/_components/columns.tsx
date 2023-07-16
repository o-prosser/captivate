"use client";

import Link from "next/link";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon, EyeIcon } from "lucide-react";

import { cn } from "@/util/cn";
import { Button } from "@/ui/button";

export type Practical = {
  id: string;
  science: string;
  unit: number;
  name: string;
  reference: number;
  bookletPages: number[];
  questions: {
    reference: string;
    download: string | null;
  }[];
};

const SortHeader = ({
  children,
  column,
  first = false,
}: {
  children: React.ReactNode;
  column: Column<Practical, unknown>;
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

export const columns: ColumnDef<Practical>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortHeader column={column} first>
        Practical Name
      </SortHeader>
    ),
  },
  {
    accessorKey: "reference",
    id: "reference",
    header: ({ column }) => <SortHeader column={column}>Reference</SortHeader>,
    cell: ({ row }) => {
      const practical = row.original;

      return <span>Unit {practical.reference}</span>;
    },
  },
  {
    id: "pages",
    header: "Booklet pages",
    cell: ({ row }) => {
      const practical = row.original;

      return (
        <span>
          {practical.bookletPages[0]} &ndash; {practical.bookletPages[1]}
        </span>
      );
    },
  },
  {
    id: "papersCount",
    header: "Questions",
    cell: ({ row }) => {
      const count = row.original.questions.length;

      return (
        <span>
          {count} paper{count == 1 ? "" : "s"}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const practical = row.original;

      return (
        <Button variant="ghost" iconOnly asChild>
          <Link
            href={`/subjects/${practical.science}/practicals/${practical.id}`}
          >
            <EyeIcon />
          </Link>
        </Button>
      );
    },
  },
];
