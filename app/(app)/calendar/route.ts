import { redirect } from "next/navigation";
import { format } from "date-fns";

export const GET = () => {
  redirect(`/calendar/${format(new Date(), "yyyy-MM-dd")}/month`);
};
