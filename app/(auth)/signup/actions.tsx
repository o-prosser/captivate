"use server";

import { redirect } from "next/navigation";
import { usersTable } from "@/drizzle/schema";

import { env } from "@/env.mjs";
import LoginEmail from "@/emails/login";
import { db, DrizzleError } from "@/lib/db";
import { resend } from "@/lib/resend";
import { hashPassword } from "@/util/password";

export const action = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || typeof password !== "string")
    throw new Error("Invalid form data");

  let user;
  try {
    const users = await db
      .insert(usersTable)
      .values({
        email,
        hashedPassword: await hashPassword(password),
      })
      .returning({
        id: usersTable.id,
        email: usersTable.email,
        token: usersTable.token,
      });

    user = users[0];
  } catch (error) {
    if (
      error instanceof DrizzleError &&
      error.message === "AUTH_DUPLICATE_KEY_ID"
    ) {
      redirect(`/signup?error=duplicate`);
    } else {
      redirect(`/signup?error=unknown`);
    }
  }

  try {
    await resend.emails.send({
      from: `${env.EMAIL_FROM_NAME} <${env.EMAIL_FROM}>`,
      to: [email],
      subject: "Verify your email",
      react: (
        <LoginEmail
          url={`${
            process.env.NODE_ENV === "production"
              ? process.env.VERCEL_URL
              : "http://localhost:3000"
          }/verify?email=${encodeURIComponent(
            user.email,
          )}&token=${encodeURIComponent(user.token || "")}`}
        />
      ),
    });

    //  const res = await fetch("https://api.resend.com/emails", {
    //    method: "POST",
    //    headers: {
    //      "Content-Type": "application/json",
    //      Authorization: `Bearer ${env.EMAIL_KEY}`,
    //    },
    //    body: JSON.stringify({
    //      from: `${env.EMAIL_FROM_NAME} <${env.EMAIL_FROM}>`,
    //      to: [email],
    //      subject: "Verify your email",
    //      html: render(
    //        LoginEmail({
    //          url: `${
    //            process.env.NODE_ENV === "production"
    //              ? process.env.VERCEL_URL
    //              : "http://localhost:3000"
    //          }/verify?email=${encodeURIComponent(
    //            user.email,
    //          )}&token=${encodeURIComponent(user.token || "")}`,
    //        }),
    //      ),
    //    }),
    //  });
  } catch (error) {
    redirect(`/signup?error=email`);
  }

  redirect(`/verify-request`);
};
