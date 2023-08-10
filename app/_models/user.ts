import { usersTable, type User } from "@/drizzle/schema";

import { db, eq } from "@/lib/db";

export const selectUser = async (
  data:
    | { id: User["id"]; email?: never }
    | { email: User["email"]; id?: never },
) => {
  if (!data.id && !data.email) throw new Error();
  const user = await db
    .select()
    .from(usersTable)
    .where(
      data.id
        ? eq(usersTable.id, data.id)
        : data.email
        ? eq(usersTable.email, data.email)
        : undefined,
    );

  return user[0];
};

export const updateUser = async (
  id: User["id"],
  data: Partial<Pick<User, "username" | "name" | "image" | "emailVerifiedAt">>,
) => {
  const user = await db
    .update(usersTable)
    .set(data)
    .where(eq(usersTable.id, id))
    .returning({ id: usersTable.id });

  return user;
};
