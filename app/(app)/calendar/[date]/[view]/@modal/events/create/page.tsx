import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eventsTable, insertEventSchema } from "@/drizzle/schema";
import { add, format, startOfDay, startOfMonth } from "date-fns";
import { Calendar } from "lucide-react";
import { string, date as zDate } from "zod";

import { db } from "@/lib/db";
import { getValidSession } from "@/util/session";
import { Select } from "@/ui/html-select";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { RouteSheet } from "@/ui/route-sheet";
import { Textarea } from "@/ui/textarea";
import { Heading } from "@/ui/typography";
import { FormButton } from "@/components/form-button";

import Time from "./time";

const CreateEvent = async () => {
  const { user } = await getValidSession();

  const action = async (formData: FormData) => {
    "use server";

    console.log(Object.fromEntries(formData.entries()));

    const { date, ...formValues } = Object.fromEntries(formData.entries());

    const data = insertEventSchema
      .extend({
        date: zDate(),
        start: string().nullable().optional(),
        end: string().nullable().optional(),
      })
      .parse({
        date: new Date(date as string),
        ...formValues,
      });

    console.log(data);

    console.log(
      data.start
        ? add(startOfDay(data.date), {
            hours: parseInt(data.start.split(":")[0]),
            minutes: parseInt(data.start.split(":")[1]),
          })
        : "No start",
    );

    console.log(
      data.end
        ? add(startOfDay(data.date), {
            hours: parseInt(data.end.split(":")[0]),
            minutes: parseInt(data.end.split(":")[1]),
          })
        : "No end",
    );

    const event = await db
      .insert(eventsTable)
      .values({
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
        userId: data.userId,
      })
      .returning({ id: eventsTable.id });

    revalidatePath("/calendar");
    redirect(
      `/calendar/${format(startOfMonth(new Date()), "yyyy-MM-dd")}/month`,
    );
  };

  return (
    <RouteSheet>
      <Heading level={2}>Add an event</Heading>

      <form action={action} className="space-y-6">
        <input type="hidden" name="userId" value={user.id} />

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
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input icon={Calendar} name="date" id="date" type="date" required />
        </div>
        <Time />

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea name="description" id="description" className="h-24" />
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
          />
        </div>

        <FormButton>Add event</FormButton>
      </form>
    </RouteSheet>
  );
};

export default CreateEvent;
