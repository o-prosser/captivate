import { cache } from "react";

import { getSession } from "@/lib/session";

// For use in areas where we know there is a session, so will not be undefined.
export const getValidSession = cache(async () => {
  const session = await getSession();
  if (!session) throw new Error("Used getValidSession but no session found");

  return session;
});
