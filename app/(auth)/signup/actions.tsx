"use server";

import { redirect } from "next/navigation";
import { LuciaError } from "lucia";

import { env } from "@/env.mjs";
import LoginEmail from "@/emails/login";
import { auth } from "@/lib/auth";
import { resend } from "@/lib/resend";
import { selectUser } from "@/models/user";

export const action = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || typeof password !== "string")
    throw new Error("Invalid form data");

  let id;
  try {
    const user = await auth.createUser({
      key: {
        providerId: "email",
        providerUserId: email,
        password,
      },
      attributes: {
        email,
      },
    });

    id = user.userId;
  } catch (error) {
    if (
      error instanceof LuciaError &&
      error.message === "AUTH_DUPLICATE_KEY_ID"
    ) {
      redirect(`/signup?error=duplicate`);
    } else {
      redirect(`/signup?error=unknown`);
    }
  }

  try {
    const user = await selectUser({ id });

    const result = await resend.emails.send({
      from: `${env.EMAIL_FROM_NAME} <${env.EMAIL_FROM}>`,
      to: [email],
      subject: "Verify your email",
      react: LoginEmail({
        url: `${
          process.env.NODE_ENV === "production"
            ? process.env.VERCEL_URL
            : "http://localhost:3000"
        }/verify?email=${encodeURIComponent(
          user.email,
        )}&token=${encodeURIComponent(user.token || "")}`,
      }),
    });
  } catch (error) {
    redirect(`/signup?error=email`);
  }

  redirect(`/verify-request`);
};
