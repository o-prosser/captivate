import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/lucia";

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

export const getSession = async () => {
  const authRequest = auth.handleRequest({
    request: null,
    cookies,
  });

  return await authRequest.validate();
};
