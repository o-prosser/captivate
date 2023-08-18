import { redirect } from "next/navigation";
import { feedbacksTable, insertFeedbackSchema } from "@/drizzle/schema";

import { db } from "@/lib/db";
import { getValidSession } from "@/util/session";
import * as Dialog from "@/ui/dialog";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { FormButton } from "@/components/form-button";

import FeedbackRadio from "./feedback-radio";

const Feedback = () => {
  const action = async (formData: FormData) => {
    "use server";

    const { user } = await getValidSession();

    const data = insertFeedbackSchema
      .omit({ userId: true })
      .parse(Object.fromEntries(formData.entries()));

    await db.insert(feedbacksTable).values({ userId: user.id, ...data });

    redirect("/dashboard");
  };

  return (
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Feedback</Dialog.Title>
        <Dialog.Description>
          We would love to hear your feedback so we can continue to improve
          Captivate. Tell us what you think!
        </Dialog.Description>
      </Dialog.Header>
      <form action={action} className="space-y-6">
        <FeedbackRadio />

        <div className="space-y-1">
          <Label>Message</Label>
          <Textarea
            name="message"
            className="h-16"
            placeholder="What's on your mind?"
          />
        </div>
        <Dialog.Footer>
          <FormButton>Submit feedback</FormButton>
        </Dialog.Footer>
      </form>
    </Dialog.Content>
  );
};

export default Feedback;
