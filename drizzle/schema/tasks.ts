import { relations, sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { subjectsTable } from "./subjects";
import { usersTable } from "./users";

export const tasksTable = pgTable("Task", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  completed: boolean("completed").notNull().default(false),
  dueDate: timestamp("dueDate", { mode: "date" }),
  doDate: timestamp("dueDate", { mode: "date" }),
  title: text("title").notNull(),
  subjectId: text("subjectId").references(() => subjectsTable.id),
  description: text("description"),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const tasksRelations = relations(tasksTable, ({ one }) => ({
  subject: one(subjectsTable, {
    fields: [tasksTable.subjectId],
    references: [subjectsTable.id],
  }),
  users: one(usersTable, {
    fields: [tasksTable.userId],
    references: [usersTable.id],
  }),
}));
