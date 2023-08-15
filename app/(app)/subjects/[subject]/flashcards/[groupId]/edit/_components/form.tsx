"use client";

import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import * as z from "zod";

import { getSubject } from "@/util/subjects";
import { Button } from "@/ui/button";
import { Textarea } from "@/ui/textarea";
import * as Form from "@/components/form";

export const editFlashcardSchema = z.object({
  unit: z.string(),
  topic: z.string(),
  subject: z.string().min(1),
  flashcards: z.array(
    z.object({
      id: z.string().optional(),
      front: z.string(),
      back: z.string(),
    }),
  ),
});

const CreateFlashcardForm = ({
  params,
  flashcardGroup,
}: {
  params: { subject: string };
  flashcardGroup: {
    id: string;
    unit: number;
    topic: number;
    flashcards: { id: string; front: string; back: string }[];
  };
}) => {
  const science = getSubject(params.subject);

  const form = Form.useForm({
    schema: editFlashcardSchema,
    defaultValues: {
      unit: flashcardGroup.unit.toString(),
      topic: flashcardGroup.topic.toString(),
      subject: science.name,
      flashcards: flashcardGroup.flashcards,
    },
  });
  const fieldArray = useFieldArray({
    control: form.control,
    name: "flashcards",
  });

  const [pending, setPending] = useState(false);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof editFlashcardSchema>) => {
    console.log(values);

    setPending(true);

    const response = await fetch(`/api/flashcards/${flashcardGroup.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: values.subject,
        unit: values.unit,
        topic: values.topic,
        flashcards: values.flashcards,
      }),
    });

    setPending(false);

    if (!response.ok) return;

    const data = await response.json();

    router.push(`/subjects/${params.subject}/flashcards/${data.id}`);
  };

  return (
    <Form.Root form={form} onSubmit={onSubmit} className="space-y-6 mt-6">
      <Form.Field
        control={form.control}
        name="subject"
        label="Subject"
        input={{ disabled: true }}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Form.Field
          control={form.control}
          name="unit"
          label="Unit number"
          input={{ placeholder: "Unit number" }}
        />
        <Form.Field
          control={form.control}
          name="topic"
          label="Topic number"
          input={{ placeholder: "Unit number" }}
        />
      </div>

      <div className="divide-y border-t">
        {fieldArray.fields.map((field, key) => (
          <div key={key} className="py-6 grid grid-cols-2 gap-6">
            <Form.Field
              control={form.control}
              name={`flashcards.${key}.front`}
              input={{}}
              render={() => (
                <Form.Item>
                  <Form.Label>Fronts</Form.Label>
                  <Form.Control>
                    <Textarea
                      className="h-24"
                      {...form.register(`flashcards.${key}.front`)}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <Form.Field
              control={form.control}
              name={`flashcards.${key}.back`}
              input={{}}
              render={() => (
                <Form.Item>
                  <Form.Label>Back</Form.Label>
                  <Form.Control>
                    <Textarea
                      className="h-24"
                      {...form.register(`flashcards.${key}.back`)}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <div className="col-span-2 flex justify-end">
              <Button
                variant="destructive"
                type="button"
                onClick={() => fieldArray.remove(key)}
              >
                <Trash2 /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button
        className="w-full mb-6"
        type="button"
        variant="outline"
        onClick={() => fieldArray.append({ id: "", front: "", back: "" })}
      >
        <Plus />
        Add flashcards
      </Button>

      <Button type="submit" pending={pending}>
        Update flashcard group
      </Button>
    </Form.Root>
  );
};

export default CreateFlashcardForm;
