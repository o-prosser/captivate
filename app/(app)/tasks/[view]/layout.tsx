import Link from "next/link";
import { format } from "date-fns";
import { ChevronDown, KanbanSquare, Plus, Table2 } from "lucide-react";

import { displayCurrentWeek } from "@/util/weeks";
import { Button } from "@/ui/button";
import * as DropdownMenu from "@/ui/dropdown-menu";
import { Heading, Text } from "@/ui/typography";

const TasksLayout = ({
  params,
  children,
  modal,
}: {
  params: { view: string };
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <>
      <Heading>Tasks</Heading>
      <Text className="text-muted-foreground !mt-2">
        It&apos;s {format(new Date(), "EEEE, 'the' do 'of' MMMM y")} &mdash;{" "}
        {displayCurrentWeek()}
      </Text>

      <div className="flex gap-2 my-6">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline" className="capitalize">
              {params.view === "card" ? <KanbanSquare /> : <Table2 />}
              {params.view}
              <ChevronDown className="text-muted-foreground" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item asChild>
              <Link href="/tasks/card">
                <KanbanSquare />
                Card
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <Link href="/tasks/table">
                <Table2 />
                Table
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <Button asChild>
          <Link href={`/tasks/${params.view}/create`}>
            <Plus />
            Add task
          </Link>
        </Button>
      </div>

      {children}
      {modal}
    </>
  );
};

export default TasksLayout;
