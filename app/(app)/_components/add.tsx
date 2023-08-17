"use client";

import { useState } from "react";
import type { User } from "@/drizzle/schema";
import { CalendarPlus, ChevronDown, Pin, Plus } from "lucide-react";

import { Button } from "@/ui/button";
import * as Dialog from "@/ui/dialog";
import * as DropdownMenu from "@/ui/dropdown-menu";

import AddTask from "./add-task";

const Add = ({
  eventDialog,
  user,
}: {
  eventDialog: React.ReactNode;
  user: Pick<User, "id">;
}) => {
  const [addOpen, setAddOpen] = useState(false);
  const [addType, setAddType] = useState<"task" | "event">("task");

  return (
    <Dialog.Root open={addOpen} onOpenChange={setAddOpen}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline" className="px-3 !mr-2.5">
            <Plus />
            <ChevronDown className="text-muted-foreground !h-3 !w-3 !mr-0" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <Dialog.Trigger asChild onClick={() => setAddType("task")}>
              <DropdownMenu.Item>
                <Pin /> Add task
              </DropdownMenu.Item>
            </Dialog.Trigger>
            <Dialog.Trigger asChild onClick={() => setAddType("event")}>
              <DropdownMenu.Item>
                <CalendarPlus /> Add event
              </DropdownMenu.Item>
            </Dialog.Trigger>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Dialog.Content>
        {addType === "event" ? (
          eventDialog
        ) : (
          <AddTask close={setAddOpen} userId={user.id} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Add;
