import { redirect } from "next/navigation";

import { login } from "@/actions/session";
import { selectUser, updateUser } from "@/models/user";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  if (typeof email !== "string" || typeof token !== "string")
    return redirect("/");

  const user = await selectUser({ email });
  if (!user) redirect("/");

  if (user.emailVerifiedAt) redirect("/dashboard");

  await updateUser(user.id, {
    emailVerifiedAt: new Date(),
  });

  await login({ userId: user.id, redirectUser: false });

  redirect("/getting-started");
};

export const runtime = "edge";
