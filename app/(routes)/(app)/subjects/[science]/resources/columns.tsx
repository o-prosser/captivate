"use client";

import { Button } from "@/ui";
import { cn } from "@/util";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDownIcon, DownloadIcon } from "lucide-react";
import Link from "next/link";

export type Paper = {
  title: string;
  download: string;
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
    accessorKey: "download",
    header: "Download",
    cell: ({ row }) => {
      const paper = row.original;

      return paper.download ? (
        <Button className="-ml-4" variant="ghost" asChild>
          <Link target="_blank" href={paper.download}>
            <DownloadIcon />
            Download
          </Link>
        </Button>
      ) : (
        <span className="italic text-muted-foreground">No download</span>
      );
    },
  },
];
