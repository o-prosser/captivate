import { InferModel, relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { usersTable } from "./users";

export const viewsTable = pgTable("View", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  createdAt: timestamp("createdAt", { precision: 3 }).defaultNow().notNull(),
});

export type View = InferModel<typeof viewsTable>;
export const insertViewSchema = createInsertSchema(viewsTable);

export const viewsTableRelations = relations(viewsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [viewsTable.userId],
    references: [usersTable.id],
  }),
}));
