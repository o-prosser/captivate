"use client";

import { Button } from "@/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteEvent = ({ id }: { id: string }) => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

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
