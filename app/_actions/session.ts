"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionsTable } from "@/drizzle/schema";
import { addMonths } from "date-fns";

import { db, eq } from "@/lib/db";
import { clearSession, createSession, getSession } from "@/lib/session";
import { getValidSession } from "@/util/session";

export const login = async ({
  userId,
  redirectUser = true,
}: {
  userId: string;
  redirectUser?: boolean;
}) => {
  const session = (
    await db
      .insert(sessionsTable)
      .values({
        userId,
        expiresAt: addMonths(new Date(), 1),
      })
      .returning({ id: sessionsTable.id })
  )[0];

  await createSession(session.id);
  // console.log("Created session:" + cookies().get("session_id")?.value);

  if (redirectUser) redirect("/dashboard");
};

export const logout = async () => {
  const session = await getValidSession();
  // if (!session) redirect("/login");

  // Remove cookie
  clearSession();

  // Set db entry to expire now so can't be used in future
  await db
    .update(sessionsTable)
    .set({ expiresAt: new Date() })
    .where(eq(sessionsTable.id, session.id));

  redirect("/login");
};
