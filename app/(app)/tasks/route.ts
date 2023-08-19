import { redirect } from "next/navigation";

import { getValidSession } from "@/util/session";

export const GET = async () => {
  const { user } = await getValidSession();

  redirect(`/tasks/${user.preferredTaskView.toLowerCase()}`);
};
