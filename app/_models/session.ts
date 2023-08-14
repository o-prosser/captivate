import { Session, sessionsTable } from "@/drizzle/schema";

import { db, eq } from "@/lib/db";

export const selectSession = async ({ id }: { id: Session["id"] }) => {
  const session = await db.query.sessionsTable.findFirst({
    where: eq(sessionsTable.id, id),
    columns: {
      id: true,
      expiresAt: true,
    },
    with: {
      user: {
        columns: {
          id: true,
          email: true,
          username: true,
          name: true,
          image: true,
        },
        with: {
          usersToSubjects: {
            columns: {
              level: true,
            },
            with: {
              subject: {
                columns: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return session;
};
