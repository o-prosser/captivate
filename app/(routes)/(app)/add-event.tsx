"use client";

import { useForm } from "@/components/form";
import { Button, Calendar, Dialog, Popover, Select } from "@/ui";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as z from "zod";
import * as Form from "@/components/form";
import { Textarea } from "@/ui/textarea";
import { cn } from "@/util";
import format from "date-fns/format";
import { EventCategory, Subject } from "@prisma/client";
import { useToast } from "@/util/use-toast";

const schema = z.object({
  date: z.date(),
  title: z.string().min(3),
  description: z.string().optional(),
  subject: z.nativeEnum(Subject).optional(),
  category: z.nativeEnum(EventCategory),
});

const AddEvent = ({
  userId,
  close,
}: {
  userId: string;
  close: (arg0: boolean) => void;
}) => {
  const form = useForm({
    schema,
  });

  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setPending(true);

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          date: values.date.toDateString(),
          title: values.title,
          description: values.description,
          subject: values.subject,
          category: values.category,
        }),
      });

      const data = await response.json();
      router.push(`/calendar?added=${data.event.id}`);
      close(false);
      form.reset();
      toast({
        title: "Event added successfully",
        description: "The event has been added to your calendar.",
      });
    } catch (error) {
      form.setError("title", {
        type: "custom",
        message: "Unable to submit form",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Add event</Dialog.Title>
        <Dialog.Description>Add an event to your calendar.</Dialog.Description>
      </Dialog.Header>

      <Form.Root form={form} onSubmit={onSubmit} className="space-y-6">
        <Form.Field
          control={form.control}
          name="title"
          label="Title"
          input={{ placeholder: "Title" }}
        />
        <Form.Field
          control={form.control}
          name="date"
          input={{}}
          render={({ field }) => (
            <Form.Item className="flex flex-col">
              <Form.Label>Date</Form.Label>
              <Popover.Root>
                <Popover.Trigger asChild>
                  <Form.Control>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </Form.Control>
                </Popover.Trigger>
                <Popover.Content className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </Popover.Content>
              </Popover.Root>
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="description"
          input={{}}
          render={() => (
            <Form.Item>
              <Form.Label>Description</Form.Label>
              <Form.Control>
                <Textarea className="h-24" {...form.register("description")} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="subject"
          input={{}}
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Subject</Form.Label>
              <Select.Root
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <Form.Control>
                  <Select.Trigger>
                    <Select.Value placeholder="Select subject" />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  <Select.Item value="Maths">Maths</Select.Item>
                  <Select.Item value="Chemistry">Chemistry</Select.Item>
                  <Select.Item value="Physics">Physics</Select.Item>
                  <Select.Item value="">No subject</Select.Item>
                </Select.Content>
              </Select.Root>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="category"
          input={{}}
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Category</Form.Label>
              <Select.Root
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <Form.Control>
                  <Select.Trigger>
                    <Select.Value placeholder="Select category" />
                  </Select.Trigger>
                </Form.Control>
                <Select.Content>
                  <Select.Item value="Test">Test</Select.Item>
                  <Select.Item value="Meeting">Meeting</Select.Item>
                  <Select.Item value="School">School</Select.Item>
                  <Select.Item value="Other">Other</Select.Item>
                </Select.Content>
              </Select.Root>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Dialog.Footer>
          <Button type="submit" pending={pending}>
            Add event
          </Button>
        </Dialog.Footer>
      </Form.Root>
    </Dialog.Content>
  );
};

export default AddEvent;
