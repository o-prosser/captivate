"use server";

import { redirect } from "next/navigation";
import { sessionsTable, usersTable } from "@/drizzle/schema";
import { addMonths } from "date-fns";

import { env } from "@/env.mjs";
import { login } from "@/actions/session";
import LoginEmail from "@/emails/login";
import { db, eq, sql } from "@/lib/db";
import { resend } from "@/lib/resend";
import { createSession } from "@/lib/session";
import { isMatchingPassword } from "@/util/password";

export const action = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || typeof password !== "string")
    throw new Error("Invalid form data");

  const user = (
    await db
      .select({
        hashedPassword: usersTable.hashedPassword,
        id: usersTable.id,
        emailVerifiedAt: usersTable.emailVerifiedAt,
        completedOnboardingAt: usersTable.completedOnboardingAt,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1)
  )[0];
  if (!user)
    redirect(`/login?error=credentials&email=${formData.get("email")}`);

  const correctPassword = await isMatchingPassword(
    password,
    user.hashedPassword,
  );

  if (!correctPassword)
    redirect(`/login?error=credentials&email=${formData.get("email")}`);

  const session = (
    await db
      .insert(sessionsTable)
      .values({
        userId: user.id,
        expiresAt: addMonths(new Date(), 1),
      })
      .returning({ id: sessionsTable.id })
  )[0];

  await createSession(session.id);

  if (!user.completedOnboardingAt) redirect("/getting-started");
  redirect("/dashboard");
};
