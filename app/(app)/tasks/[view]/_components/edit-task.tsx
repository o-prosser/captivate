"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/ui/textarea";
import * as Form from "@/components/form";

const schema = z.object({
  doDate: z.date().nullable(),
  dueDate: z.date().nullable(),
  title: z.string().min(3),
  description: z.string().nullable(),
  subject: z.string().nullable(),
});

const EditTask = ({
  task,
}: {
  task: {
    id?: string;
    doDate?: Date | null;
    dueDate?: Date | null;
    title: string;
    description?: string | null;
    subject?: string | null;
  };
}) => {
  const [open, setOpen] = useState(false);

  const form = Form.useForm({
    schema,
    defaultValues: {
      doDate: task.doDate,
      dueDate: task.dueDate,
      title: task.title,
      description: task.description || "",
      subject: task.subject,
    },
  });

  const [pending, setPending] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setPending(true);

      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doDate: values.doDate?.toDateString(),
          dueDate: values.dueDate?.toDateString(),
          title: values.title,
          description: values.description,
          subject: values.subject,
        }),
      });

      const data = await response.json();
      router.push(`/tasks?updated=${data.task.id}`);
      setOpen(false);
      form.reset();
      toast({
        title: "task updated successfully",
        description: "The task has been updated.",
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
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit task</Dialog.Title>
          <Dialog.Description>Edit task.</Dialog.Description>
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
            name="dueDate"
            input={{}}
            render={({ field }) => (
              <Form.Item className="flex flex-col">
                <Form.Label>Due Date</Form.Label>
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
                  <Textarea
                    className="h-24"
                    {...form.register("description")}
                  />
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
              Save task
            </Button>
          </Dialog.Footer>
        </Form.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditTask;
