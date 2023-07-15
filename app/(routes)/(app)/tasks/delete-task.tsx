"use client";

import { Button } from "@/ui";
import { useToast } from "@/util/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteTask = ({ id }: { id: string }) => {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const deleteTask = async () => {
    try {
      setPending(true);

      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      router.push(`/tasks?deleted=${json.task.id}`);

      toast({
        title: "Task deleted successfully",
        description: "The task has been removed.",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={deleteTask}
      pending={pending}
    >
      Delete
    </Button>
  );
};

export default DeleteTask;
