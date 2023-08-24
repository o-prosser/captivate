import { viewsTable, type View } from "@/drizzle/schema";

import { and, db, eq, ilike } from "@/lib/db";
import { getValidSession } from "@/util/session";

export const selectViews = async ({ subjectId }: { subjectId?: string }) => {
  const { user } = await getValidSession();

  const views = await db
    .selectDistinctOn([viewsTable.url])
    .from(viewsTable)
    .limit(3)
    .where(
      subjectId
        ? and(eq(viewsTable.userId, user.id), ilike(viewsTable.url, subjectId))
        : eq(viewsTable.userId, user.id),
    );

  return views;
};

export const createView = async ({ url }: { url: View["url"] }) => {
  const { user } = await getValidSession();
  await db.insert(viewsTable).values({ url, userId: user.id });
};
