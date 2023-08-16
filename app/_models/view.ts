import { viewsTable, type View } from "@/drizzle/schema";

import { db, eq } from "@/lib/db";
import { getValidSession } from "@/util/session";

export const selectViews = async () => {
  const { user } = await getValidSession();

  const views = await db
    .selectDistinctOn([viewsTable.url])
    .from(viewsTable)
    .limit(3)
    .where(eq(viewsTable.userId, user.id));

  return views;
};

export const createView = async ({ url }: { url: View["url"] }) => {
  const { user } = await getValidSession();
  await db.insert(viewsTable).values({ url, userId: user.id });
};
