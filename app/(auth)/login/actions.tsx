"use server";

import { redirect } from "next/navigation";
import { usersTable } from "@/drizzle/schema";

import { env } from "@/env.mjs";
import { login } from "@/actions/session";
import LoginEmail from "@/emails/login";
import { db, eq, sql } from "@/lib/db";
import { resend } from "@/lib/resend";
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

  if (!user.emailVerifiedAt) {
    const userWithToken = (
      await db
        .update(usersTable)
        .set({ token: sql`gen_random_uuid()` })
        .where(eq(usersTable.id, user.id))
        .returning({ token: usersTable.token })
    )[0];

    await resend.emails.send({
      from: `${env.EMAIL_FROM_NAME} <${env.EMAIL_FROM}>`,
      to: [email],
      subject: "Verify your email",
      react: (
        <LoginEmail
          url={`${
            process.env.NODE_ENV === "production"
              ? "https://captivate.prossermedia.co.uk"
              : "http://localhost:3000"
          }/verify?email=${encodeURIComponent(
            email,
          )}&token=${encodeURIComponent(userWithToken.token || "")}`}
        />
      ),
    });

    redirect("/verify-request");
  } else {
    await login({ userId: user.id, redirectUser: false });

    if (!user.completedOnboardingAt) redirect("/getting-started");
    redirect("/tasks");
  }
};
