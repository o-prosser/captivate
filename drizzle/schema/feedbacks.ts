import { InferModel, relations, sql } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { usersTable } from "./users";

export const feedbackTypeEnum = pgEnum("FeedbackType", [
  "Feature",
  "Bug",
  "Other",
]);

export const feedbacksTable = pgTable("Feedback", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  userId: text("userId").references(() => usersTable.id, {
    onDelete: "set null",
  }),
  type: feedbackTypeEnum("type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  archivedAt: timestamp("archivedAt"),
});

export type Feedback = InferModel<typeof feedbacksTable>;
export const insertFeedbackSchema = createInsertSchema(feedbacksTable);

export const feedbacksTableRelations = relations(feedbacksTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [feedbacksTable.userId],
    references: [usersTable.id],
  }),
}));
