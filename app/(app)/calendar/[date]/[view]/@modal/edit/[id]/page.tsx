import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { eventsTable, insertEventSchema } from "@/drizzle/schema";
import { add, format, startOfDay } from "date-fns";
import { Calendar } from "lucide-react";
import { string, date as zDate } from "zod";

import { db, eq } from "@/lib/db";
import { Select } from "@/ui/html-select";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { RouteSheet } from "@/ui/route-sheet";
import { Textarea } from "@/ui/textarea";
import { Heading } from "@/ui/typography";
import { FormButton } from "@/components/form-button";
import { selectEvent } from "@/models/event";

import Time from "./time";

const EditEventPage = async ({ params }: { params: { id: string } }) => {
  const event = await selectEvent(params);
  if (!event) notFound();

  const action = async (formData: FormData) => {
    "use server";

    const { date, ...formValues } = Object.fromEntries(formData.entries());

    const data = insertEventSchema
      .omit({ userId: true })
      .extend({
        date: zDate(),
        start: string().nullable().optional(),
        end: string().nullable().optional(),
      })
      .parse({
        date: new Date(date as string),
        ...formValues,
      });

    await db
      .update(eventsTable)
      .set({
        title: data.title,
        start: data.start
          ? add(startOfDay(data.date), {
              hours: parseInt(data.start.split(":")[0]),
              minutes: parseInt(data.start.split(":")[1]),
            })
          : startOfDay(data.date),
        end: data.end
          ? add(startOfDay(data.date), {
              hours: parseInt(data.end.split(":")[0]),
              minutes: parseInt(data.end.split(":")[1]),
            })
          : startOfDay(data.date),
        subjectId: data.subjectId,
        category: data.category,
        description: data.description,
      })
      .where(eq(eventsTable.id, event.id));

    revalidatePath("/calendar");
    redirect(
      `/calendar/${format(
        new Date(date as string),
        "yyyy-MM-dd",
      )}/month?updated=${event.id}`,
    );
  };

  return (
    <RouteSheet>
      <Heading level={2}>Edit event</Heading>

      <form action={action} className="space-y-6">
        <div className="space-y-2">
          {/* <Label htmlFor="title">Title</Label> */}
          <Input
            name="title"
            id="title"
            type="text"
            required
            minLength={3}
            autoComplete="off"
            autoCapitalize="off"
            autoFocus
            placeholder="Title"
            defaultValue={event.title}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            icon={Calendar}
            name="date"
            id="date"
            type="date"
            required
            defaultValue={format(event.start, "yyyy-MM-dd")}
          />
        </div>

        <Time event={event} />

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            id="description"
            className="h-24"
            defaultValue={event.description || ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select
            name="subjectId"
            id="subject"
            options={{
              DEFAULT: "Select subject",
              maths: "Maths",
              chemistry: "Chemistry",
              physics: "Physics",
            }}
            defaultValue={event.subject || ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            name="category"
            id="category"
            required
            options={{
              DEFAULT: "Select category",
              Test: "Test",
              Meeting: "Meeting",
              School: "School",
              Other: "Other",
            }}
            defaultValue={event.category}
          />
        </div>

        <FormButton>Update event</FormButton>
      </form>
    </RouteSheet>
  );
};

export default EditEventPage;
