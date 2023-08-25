import { cache } from "react";
import { filesTable } from "@/drizzle/schema";

import { and, db, desc, eq, isNull } from "@/lib/db";
import { getValidSession } from "@/util/session";

export const selectFiles = cache(async () => {
  const { user } = await getValidSession();

  const files = await db
    .select()
    .from(filesTable)
    .where(and(eq(filesTable.userId, user.id), isNull(filesTable.deletedAt)))
    .orderBy(desc(filesTable.createdAt));

  return files;
});
