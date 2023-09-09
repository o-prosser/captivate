import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { notesTable } from "@/drizzle/schema";
import { object, string } from "zod";

import { and, db, eq } from "@/lib/db";
import { getSubject } from "@/util/subjects";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { RouteSheet } from "@/ui/route-sheet";
import { Heading } from "@/ui/typography";
import { FormButton } from "@/components/form-button";
import { createView } from "@/models/view";

import GetMarkdown from "./_components/get-markdown";

type Params = { subject: string; unit: string; topic: string };

export const generateMetadata = ({ params }: { params: Params }) => ({
  title: `Notes – Unit ${params.unit}.${params.topic}`,
});

const NoteTopic = async ({ params }: { params: Params }) => {
  const subject = getSubject(params.subject);

  const unit = subject.units.filter(
    (unit) => unit.number === parseInt(params.unit),
  )[0];
  if (!unit) notFound();

  const topic = unit.topics[parseInt(params.topic) - 1];
  if (!topic) notFound();

  await createView({
    url: `/notes/${params.subject}/notes/${params.unit}/${params.topic}`,
  });

  if (!subject.dbNotes)
    return (
      <>
        <Heading>{topic}</Heading>
        <GetMarkdown
          subject={params.subject}
          unit={parseInt(params.unit)}
          topic={parseInt(params.topic)}
        />
      </>
    );

  const notes = await db
    .select()
    .from(notesTable)
    .where(
      and(
        eq(notesTable.subjectId, params.subject),
        eq(notesTable.unit, parseInt(params.unit)),
        eq(notesTable.topic, parseInt(params.topic)),
      ),
    );

  const uploadAction = async (formData: FormData) => {
    "use server";

    const schema = object({
      subjectId: string().min(3).max(20),
      unit: string().min(1).max(2),
      topic: string().min(1).max(2),
      url: string().min(3).max(1000),
    });

    const data = schema.parse(Object.fromEntries(formData.entries()));

    const note = await db.insert(notesTable).values({
      subjectId: data.subjectId,
      unit: parseInt(data.unit),
      topic: parseInt(data.topic),
      url: data.url,
    });

    revalidatePath(
      `/subjects/${params.subject}/notes/${data.unit}/${data.topic}`,
    );
    redirect(`/subjects/${params.subject}/notes/${data.unit}/${data.topic}`);
  };

  if (notes.length === 0)
    return (
      <RouteSheet>
        <Heading level={2}>Upload notes</Heading>

        <form action={uploadAction} className="space-y-6">
          <div className="space-y-2">
            <Label>Subject</Label>
            <Input
              readOnly
              type="text"
              name="subjectId"
              defaultValue={params.subject}
            />
          </div>
          <div className="space-y-2">
            <Label>Unit</Label>
            <Input
              readOnly
              type="text"
              name="unit"
              defaultValue={params.unit}
            />
          </div>
          <div className="space-y-2">
            <Label>Topic</Label>
            <Input
              readOnly
              type="text"
              name="topic"
              defaultValue={params.topic}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input required minLength={10} type="text" name="url" id="url" />
          </div>

          <FormButton>Upload notes</FormButton>
        </form>
      </RouteSheet>
    );

  redirect(notes[0].url);
};

export default NoteTopic;
