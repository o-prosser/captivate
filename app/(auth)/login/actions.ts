"use server";

import { redirect } from "next/navigation";
import { LuciaError } from "lucia";

import { auth } from "@/lib/lucia";
import { login } from "@/lib/session";

export const action = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || typeof password !== "string")
    throw new Error("Invalid form data");

  try {
    const user = await auth.useKey("email", email, password);

    await login({ userId: user.userId });
  } catch (error) {
    if (
      error instanceof LuciaError &&
      (error.message === "AUTH_INVALID_KEY_ID" ||
        error.message === "AUTH_INVALID_PASSWORD")
    ) {
      redirect(`/signup?error=user`);
    } else {
      redirect(`/signup?error=unknown`);
    }
  }
};
