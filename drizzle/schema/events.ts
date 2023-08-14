import { InferModel, relations, sql } from "drizzle-orm";
import { date, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { subjectsTable } from "./subjects";
import { usersTable } from "./users";

export const eventCategory = pgEnum("category", [
  "Test",
  "Meeting",
  "School",
  "Other",
]);

export enum EventCategory {
  "Test",
  "Meeting",
  "School",
  "Other",
}

export const eventsTable = pgTable("Event", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  date: date("date", { mode: "date" }).notNull(),
  title: text("title").notNull(),
  subjectId: text("subjectId")
    .references(() => subjectsTable.id, { onDelete: "set null" })
    .default(sql`NULL`),
  category: eventCategory("category").notNull().default("Other"),
  description: text("description"),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { precision: 3 }).defaultNow().notNull(),
});

export type Event = InferModel<typeof eventsTable>;
export const insertEventSchema = createInsertSchema(eventsTable);

export const eventsRelations = relations(eventsTable, ({ one }) => ({
  subject: one(subjectsTable, {
    fields: [eventsTable.subjectId],
    references: [subjectsTable.id],
  }),
  user: one(usersTable, {
    fields: [eventsTable.userId],
    references: [usersTable.id],
  }),
}));
