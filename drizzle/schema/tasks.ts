import { InferModel, relations, sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { subjectsTable } from "./subjects";
import { usersTable } from "./users";

export const tasksTable = pgTable("Task", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  completed: boolean("completed").notNull().default(false),
  dueDate: timestamp("dueDate", { mode: "date" }),
  doDate: timestamp("doDate", { mode: "date" }),
  title: text("title").notNull(),
  subjectId: text("subjectId")
    // .references(() => subjectsTable.id, { onDelete: "set null" })
    .default(sql`NULL`),
  description: text("description"),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type Task = InferModel<typeof tasksTable>;
export const insertTaskSchema = createInsertSchema(tasksTable);

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
