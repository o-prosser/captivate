import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eventsTable, insertEventSchema } from "@/drizzle/schema";
import { format } from "date-fns";

import { db } from "@/lib/db";
import * as Dialog from "@/ui/dialog";
import { Select } from "@/ui/html-select";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { FormButton } from "@/components/form-button";
import { Textarea } from "@/app/_ui/textarea";

const AddEvent = ({ userId }: { userId: string }) => {
  const action = async (formData: FormData) => {
    "use server";

    const { date, ...formValues } = Object.fromEntries(formData.entries());

    const data = insertEventSchema.parse({
      date: new Date(date as string),
      ...formValues,
    });

    const event = await db
      .insert(eventsTable)
      .values(data)
      .returning({ id: eventsTable.id });

    revalidatePath("/calendar");
    redirect(
      `/calendar/${format(new Date(), "yyyy-MM-dd")}/month?created=${
        event[0].id
      }`,
    );
  };

  return (
    <>
      <Dialog.Header>
        <Dialog.Title>Add event</Dialog.Title>
        <Dialog.Description>Add an event to your calendar.</Dialog.Description>
      </Dialog.Header>

      <form action={action} className="space-y-6">
        <input type="hidden" name="userId" value={userId} />

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
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
          <Input name="date" id="date" type="date" required />
        </div>

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

        <Dialog.Footer>
          <FormButton>Add event</FormButton>
        </Dialog.Footer>
      </form>
    </>
  );
};

export default AddEvent;
