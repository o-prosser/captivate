import { relations, sql } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { usersTable } from "./users";

export const tagEnum = pgEnum("TagEnum", ["Report", "Admin", "Work", "Misc"]);

export const filesTable = pgTable("File", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  url: text("url").notNull(),
  tag: tagEnum("Tag").notNull().default("Misc"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  deletedAt: timestamp("deletedAt"),
});

export const filesTableRelations = relations(filesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [filesTable.userId],
    references: [usersTable.id],
  }),
}));
