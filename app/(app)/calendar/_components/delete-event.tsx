"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/util/use-toast";
import { Button } from "@/ui/button";

const DeleteEvent = ({ id }: { id: string }) => {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const deleteEvent = async () => {
    try {
      setPending(true);

      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      router.push(`/calendar?deleted=${json.event.id}`);

      toast({
        title: "Event deleted successfully",
        description: "The event has been removed from your calendar.",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Button variant="destructive" onClick={deleteEvent} pending={pending}>
      Delete
    </Button>
  );
};

export default DeleteEvent;
