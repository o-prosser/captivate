import { InferModel, relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  time,
  timestamp,
} from "drizzle-orm/pg-core";

import { usersTable } from "./users";

export const subjectLevelsEnum = pgEnum("SubjectLevel", ["Sub", "Adv", "One"]);

export const subjectsTable = pgTable("Subject", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
});

export const usersToSubjects = pgTable(
  "UserToSubject",
  {
    userId: text("userId")
      .notNull()
      .references(() => usersTable.id),
    subjectId: text("subjectId")
      .notNull()
      .references(() => subjectsTable.id),
    level: subjectLevelsEnum("levels").notNull().default("Sub"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.subjectId),
  }),
);

export const subjectsRelations = relations(subjectsTable, ({ many }) => ({
  usersToSubjects: many(usersToSubjects),
}));

export const usersToSubjectsRelations = relations(
  usersToSubjects,
  ({ one }) => ({
    subject: one(subjectsTable, {
      fields: [usersToSubjects.subjectId],
      references: [subjectsTable.id],
    }),
    user: one(usersTable, {
      fields: [usersToSubjects.userId],
      references: [usersTable.id],
    }),
  }),
);

export type Subject = InferModel<typeof subjectsTable>;
export type UserToSubject = InferModel<typeof usersToSubjects>;
