import { redirect } from "next/navigation";
import { usersTable } from "@/drizzle/schema";
import { Trash2 } from "lucide-react";

import { db, eq } from "@/lib/db";
import { clearSession } from "@/lib/session";
import { getValidSession } from "@/util/session";
import { FormButton } from "@/components/form-button";

const Delete = () => {
  const action = async () => {
    "use server";

    const { user } = await getValidSession();

    await db.delete(usersTable).where(eq(usersTable.id, user.id));
    await clearSession();
    redirect("/login");
  };

  return (
    <form action={action}>
      <FormButton variant="destructive">
        <Trash2 />
        Delete account
      </FormButton>
    </form>
  );
};

export default Delete;
