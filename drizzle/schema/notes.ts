import { relations, sql } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { subjectsTable } from "./subjects";

export const notesTable = pgTable("Note", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  subjectId: text("subjectId")
    .notNull()
    .references(() => subjectsTable.id),
  unit: integer("unit").notNull(),
  topic: integer("topic").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const notesTableRelations = relations(notesTable, ({ one }) => ({
  subject: one(subjectsTable, {
    fields: [notesTable.subjectId],
    references: [subjectsTable.id],
  }),
}));
