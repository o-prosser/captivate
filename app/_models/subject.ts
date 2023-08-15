import { cache } from "react";
import { subjectsTable } from "@/drizzle/schema";

import { db } from "@/lib/db";

export const selectSubjects = cache(async () => {
  const subjects = await db.select().from(subjectsTable);

  return subjects;
});
