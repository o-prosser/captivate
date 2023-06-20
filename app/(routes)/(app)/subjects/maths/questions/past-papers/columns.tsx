"use client";

import { Button } from "@/ui";
import { cn } from "@/util";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon, DownloadIcon } from "lucide-react";
import Link from "next/link";

export type Paper = {
  unit: number;
  year: number;
  series: string;
  spec: string;
  paper: string;
  markscheme: string | null;
  paperLink: string;
  msLink: string | null;
};

const SortHeader = ({
  children,
  column,
  first = false,
}: {
  children: React.ReactNode;
  column: Column<Paper, unknown>;
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

export const columns: ColumnDef<Paper>[] = [
  {
    accessorKey: "year",
    header: ({ column }) => (
      <SortHeader column={column} first>
        Year
      </SortHeader>
    ),
    cell: ({ row }) => {
      return <span className="font-medium">{row.original.year}</span>;
    },
  },
  {
    accessorKey: "series",
    id: "reference",
    header: ({ column }) => <SortHeader column={column}>Series</SortHeader>,
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.series}</span>;
    },
  },
  {
    accessorKey: "paper",
    header: "Paper",
    cell: ({ row }) => {
      const paper = row.original;

      return paper.paperLink && paper.paperLink ? (
        <Button className="-ml-4" variant="ghost" asChild>
          <Link target="_blank" href={paper.paperLink}>
            <DownloadIcon />
            Download
          </Link>
        </Button>
      ) : (
        <span className="italic text-muted-foreground">No paper</span>
      );
    },
  },
  {
    accessorKey: "markscheme",
    header: "Mark scheme",
    cell: ({ row }) => {
      const paper = row.original;

      return paper.markscheme && paper.msLink ? (
        <Button className="-ml-4" variant="ghost" asChild>
          <Link target="_blank" href={paper.msLink}>
            <DownloadIcon />
            Download
          </Link>
        </Button>
      ) : (
        <span className="italic text-muted-foreground">No mark scheme</span>
      );
    },
  },
];
