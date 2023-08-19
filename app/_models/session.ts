import type { Session } from "@/drizzle/schema";

import { db, placeholder } from "@/lib/db";

const prepared = db.query.sessionsTable
  .findFirst({
    where: (fields, { eq }) => eq(fields.id, placeholder("id")),
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
          theme: true,
          impersonation: true,
          preferredCalendarView: true,
          preferredTaskView: true,
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
  })
  .prepare("selectSession");

export const selectSession = async ({ id }: { id: Session["id"] }) => {
  const session = await prepared.execute({ id });

  return session;
};
