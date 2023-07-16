"use client";

import Link from "next/link";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon, DownloadIcon } from "lucide-react";

import { cn } from "@/util/cn";
import { Button } from "@/ui/button";

export type Paper = {
  title: string;
  paper: string;
  markscheme?: string | null;
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
    accessorKey: "title",
    header: ({ column }) => (
      <SortHeader column={column} first>
        Title
      </SortHeader>
    ),
    cell: ({ row }) => {
      return <span className="font-medium">{row.original.title}</span>;
    },
  },
  {
    accessorKey: "paper",
    header: "Paper",
    cell: ({ row }) => {
      const paper = row.original;

      return paper.paper ? (
        <Button className="-ml-4" variant="ghost" asChild>
          <Link target="_blank" href={paper.paper}>
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

      return paper.markscheme ? (
        <Button className="-ml-4" variant="ghost" asChild>
          <Link target="_blank" href={paper.markscheme}>
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
