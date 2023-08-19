import { InferModel, relations, sql } from "drizzle-orm";
import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { usersToSubjects } from "./subjects";

export const calendarViewEnum = pgEnum("CalendarView", ["Month", "Week"]);
export const taskViewEnum = pgEnum("TaskView", ["Card", "Table"]);

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
  theme: text("theme").default("indigo"),
  impersonation: boolean("impersonation").notNull().default(false),
  preferredCalendarView: calendarViewEnum("preferredCalendarView")
    .default("Month")
    .notNull(),
  preferredTaskView: taskViewEnum("preferredTaskView")
    .default("Card")
    .notNull(),
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

export type Session = InferModel<typeof sessionsTable>;

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionsTable.userId],
    references: [usersTable.id],
  }),
}));
