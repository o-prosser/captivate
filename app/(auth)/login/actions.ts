"use server";

import { redirect } from "next/navigation";
import { usersTable } from "@/drizzle/schema";

import { login } from "@/actions/session";
import { db, eq } from "@/lib/db";
import { isMatchingPassword } from "@/util/password";

export const action = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || typeof password !== "string")
    throw new Error("Invalid form data");

  try {
    const user = await db
      .select({ hashedPassword: usersTable.hashedPassword, id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);
    if (user.length === 0) throw new Error("INVALID_CREDENTIALS");

    const correctPassword = await isMatchingPassword(
      password,
      user[0].hashedPassword,
    );

    if (!correctPassword) throw new Error("INVALID_CREDENTIALS");

    await login({ userId: user[0].id });
  } catch (error) {
    // @ts-expect-error
    if (error.message === "INVALID_CREDENTIALS") {
      redirect(`/login?error=credentials`);
    } else {
      redirect(`/login?error=unknown`);
    }
  }
};
