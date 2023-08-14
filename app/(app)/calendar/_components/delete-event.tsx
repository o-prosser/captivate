import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Event, eventsTable } from "@/drizzle/schema";
import { format } from "date-fns";

import { db, eq } from "@/lib/db";
import { FormButton } from "@/components/form-button";

const DeleteEvent = ({ id }: { id: Event["id"] }) => {
  const action = async (formData: FormData) => {
    "use server";

    await db.delete(eventsTable).where(eq(eventsTable.id, id));

    revalidatePath("/calendar");
    redirect(
      `/calendar/${format(new Date(), "yyyy-MM-dd")}/month?deleted=${id}`,
    );
  };

  return (
    <form action={action}>
      <FormButton variant="outline" className="w-full">
        Delete event
      </FormButton>
    </form>
  );
};

export default DeleteEvent;
