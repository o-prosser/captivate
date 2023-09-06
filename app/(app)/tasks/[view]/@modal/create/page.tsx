import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { insertTaskSchema, tasksTable } from "@/drizzle/schema/tasks";

import { db } from "@/lib/db";
import { getValidSession } from "@/util/session";
import { Select } from "@/ui/html-select";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { RouteSheet } from "@/ui/route-sheet";
import { Textarea } from "@/ui/textarea";
import { Heading } from "@/ui/typography";
import { FormButton } from "@/components/form-button";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const action = async (formData: FormData) => {
    "use server";

    const { user } = await getValidSession();

    const { doDate, dueDate, ...body } = Object.fromEntries(formData.entries());

    let task;
    try {
      const data = insertTaskSchema.omit({ userId: true }).parse({
        doDate: new Date(doDate as string),
        dueDate: new Date(dueDate as string),
        ...body,
      });

      task = (
        await db
          .insert(tasksTable)
          .values({
            userId: user.id,
            title: data.title,
            dueDate: data.dueDate,
            doDate: data.doDate,
            subjectId: data.subjectId,
          })
          .returning({ id: tasksTable.id })
      )[0];
    } catch (error) {
      throw error;
    }

    revalidatePath("/tasks");
    redirect(`/tasks/card/${task.id}`);
  };

  return (
    <RouteSheet>
      <Heading level={2}>Add task</Heading>

      <form action={action} className="space-y-6 mt-6">
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          required
          minLength={2}
          autoComplete="off"
          autoFocus
        />

        <div className="space-y-2">
          <Label htmlFor="doDate">Do date</Label>
          <Input
            type="date"
            name="doDate"
            id="doDate"
            placeholder="Do date"
            required
            autoComplete="off"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">Due date</Label>
          <Input
            type="date"
            name="dueDate"
            id="dueDate"
            placeholder="Due date"
            required
            autoComplete="off"
          />
        </div>

        <Textarea
          name="description"
          id="description"
          placeholder="Description"
          className="h-24"
        />

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
          defaultValue={searchParams.subject || ""}
        />

        <FormButton>Add task</FormButton>
      </form>
    </RouteSheet>
  );
};

export default Page;
