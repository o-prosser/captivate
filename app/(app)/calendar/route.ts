import { redirect } from "next/navigation";
import { lightFormat } from "date-fns";

import { getValidSession } from "@/util/session";

export const GET = async () => {
  const { user } = await getValidSession();

  redirect(
    `/calendar/${lightFormat(
      new Date(),
      "yyyy-MM-dd",
    )}/${user.preferredCalendarView.toLowerCase()}`,
  );
};
