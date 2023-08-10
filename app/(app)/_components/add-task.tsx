"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Subject } from "@prisma/client";
import format from "date-fns/format";
import { Calendar as CalendarIcon } from "lucide-react";
import * as z from "zod";

import { cn } from "@/util/cn";
import { useToast } from "@/util/use-toast";
import { Button } from "@/ui/button";
import { Calendar } from "@/ui/calendar";
import * as Dialog from "@/ui/dialog";
import * as Popover from "@/ui/popover";
import * as Select from "@/ui/select";
import * as Form from "@/components/form";
import { useForm } from "@/app/_components/form";
import { Textarea } from "@/app/_ui/textarea";

const schema = z.object({
  doDate: z.date().nullable(),
  dueDate: z.date().nullable(),
  title: z.string().min(3),
  description: z.string().nullable(),
  subject: z.nativeEnum(Subject).nullable(),
});

const AddTask = ({
  userId,
  close,
}: {
  userId: string;
  close: (arg0: boolean) => void;
}) => {
  const form = useForm({
    schema,
    defaultValues: {
      doDate: "",
      dueDate: "",
      title: "",
      description: "",
      subject: "",
    },
  });

  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setPending(true);

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          doDate: values.doDate?.toDateString(),
          dueDate: values.dueDate?.toDateString(),
          title: values.title,
          description: values.description,
          subject: values.subject,
        }),
      });

      const data = await response.json();
      router.push(`/tasks?added=${data.task.id}`);
      close(false);
      form.reset();
      toast({
        title: "Task added successfully",
        description: "The task has been added to your task list.",
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
    <>
      <Dialog.Header>
        <Dialog.Title>Add task</Dialog.Title>
        <Dialog.Description>Add a task.</Dialog.Description>
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
          name="doDate"
          input={{}}
          render={({ field }) => (
            <Form.Item className="flex flex-col">
              <Form.Label>Do date</Form.Label>
              <Popover.Root>
                <Popover.Trigger asChild>
                  <Form.Control>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
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
          name="dueDate"
          input={{}}
          render={({ field }) => (
            <Form.Item className="flex flex-col">
              <Form.Label>Due date</Form.Label>
              <Popover.Root>
                <Popover.Trigger asChild>
                  <Form.Control>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
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

        <Dialog.Footer>
          <Button type="submit" pending={pending}>
            Add task
          </Button>
        </Dialog.Footer>
      </Form.Root>
    </>
  );
};

export default AddTask;
