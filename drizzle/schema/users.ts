import { InferModel, relations, sql } from "drizzle-orm";
import { bigint, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { subjectsTable, usersToSubjects } from "./subjects";

export const usersTable = pgTable("User", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  email: text("email").unique().notNull(),
  hashedPassword: text("password").notNull(),
  username: text("username").unique(),
  name: text("name"),
  image: text("image"),
  token: text("token").default(sql`gen_random_uuid()`),
  emailVerifiedAt: timestamp("emailVerifiedAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  usersToSubjects: many(usersToSubjects),
  sessions: many(sessionsTable),
}));

export type User = InferModel<typeof usersTable>;
export const insertUserSchema = createInsertSchema(usersTable);

export const sessionsTable = pgTable("Session", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionsTable.userId],
    references: [usersTable.id],
  }),
}));
