import { relations, sql } from "drizzle-orm";
import { date, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { subjectsTable } from "./subjects";
import { usersTable } from "./users";

export const eventCategory = pgEnum("category", [
  "Test",
  "Meeting",
  "School",
  "Other",
]);

export const eventsTable = pgTable("Event", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  date: date("date", { mode: "date" }).notNull(),
  title: text("title").notNull(),
  subjectId: text("subjectId").references(() => subjectsTable.id),
  category: eventCategory("category").notNull().default("Other"),
  description: text("description"),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp("createdAt", { precision: 3 }).defaultNow().notNull(),
});

export const eventsRelations = relations(eventsTable, ({ one }) => ({
  subject: one(subjectsTable, {
    fields: [eventsTable.subjectId],
    references: [subjectsTable.id],
  }),
}));
