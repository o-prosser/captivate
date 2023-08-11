"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getSession } from "@/lib/session";

export const login = async ({
  userId,
  redirectUser = true,
}: {
  userId: string;
  redirectUser?: boolean;
}) => {
  const session = await auth.createSession({
    userId,
    attributes: {},
  });

  const sessionCookie = auth.createSessionCookie(session);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  if (redirectUser) redirect("/dashboard");
};

export const logout = async () => {
  const session = await getSession();
  await auth.invalidateSession(session.sessionId);

  cookies().delete("auth_session");

  redirect("/login");
};
