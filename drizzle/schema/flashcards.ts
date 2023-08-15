import { InferModel, relations, sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { subjectsTable } from "./subjects";
import { usersTable } from "./users";

export const flashcardGroupsTable = pgTable("FlashcardGroup", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  unit: integer("unit").notNull(),
  topic: integer("topic").notNull(),
  subjectId: text("subjectId")
    .notNull()
    .references(() => subjectsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type FlashcardGroup = InferModel<typeof flashcardGroupsTable>;
export const insertFlashcardGroupSchema =
  createInsertSchema(flashcardGroupsTable);

export const flashcardGroupsRelations = relations(
  flashcardGroupsTable,
  ({ one, many }) => ({
    subject: one(subjectsTable, {
      fields: [flashcardGroupsTable.subjectId],
      references: [subjectsTable.id],
    }),
    flashcards: many(flashcardsTable),
    sessions: many(flashcardStudySessionsTable),
  }),
);

export const flashcardsTable = pgTable("Flashcard", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  groupId: text("groupId")
    .notNull()
    .references(() => flashcardGroupsTable.id, { onDelete: "cascade" }),
  front: text("front").notNull(),
  back: text("back").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type Flashcard = InferModel<typeof flashcardsTable>;
export const insertFlashcardSchema = createInsertSchema(flashcardsTable);

export const flashcardsTableRelations = relations(
  flashcardsTable,
  ({ one, many }) => ({
    group: one(flashcardGroupsTable, {
      fields: [flashcardsTable.groupId],
      references: [flashcardGroupsTable.id],
    }),
    studies: many(flashcardStudiesTable),
  }),
);

export const studyScopeEnum = pgEnum("StudyScope", [
  "Subject",
  "Unit",
  "Group",
]);
export const studyTypeEnum = pgEnum("StudyEnum", ["All", "Spaced"]);

export const flashcardStudySessionsTable = pgTable("FlashcardStudySession", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  start: timestamp("start").notNull().defaultNow(),
  end: timestamp("end"),
  scope: studyScopeEnum("scope").notNull(),
  type: studyTypeEnum("type").notNull(),
  subjectId: text("subjectId")
    .references(() => subjectsTable.id, { onDelete: "set null" })
    .default(sql`NULL`),
  unit: integer("unit"),
  groupId: text("groupId")
    .references(() => flashcardGroupsTable.id, { onDelete: "cascade" })
    .default(sql`NULL`),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type FlashcardStudySession = InferModel<
  typeof flashcardStudySessionsTable
>;
export const insertFlashcardStudySessionSchema = createInsertSchema(
  flashcardStudySessionsTable,
);

export const flashcardStudySessionsTableRelations = relations(
  flashcardStudySessionsTable,
  ({ one, many }) => ({
    subject: one(subjectsTable, {
      fields: [flashcardStudySessionsTable.subjectId],
      references: [subjectsTable.id],
    }),
    user: one(usersTable, {
      fields: [flashcardStudySessionsTable.userId],
      references: [usersTable.id],
    }),
    flashcardStudies: many(flashcardStudiesTable),
    group: one(flashcardGroupsTable, {
      fields: [flashcardStudySessionsTable.groupId],
      references: [flashcardGroupsTable.id],
    }),
  }),
);

export const flashcardStudiesTable = pgTable("FlashcardStudy", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  sessionId: text("sessionId")
    .references(() => flashcardStudySessionsTable.id, { onDelete: "cascade" })
    .notNull(),
  flashcardId: text("flashcardId")
    .references(() => flashcardsTable.id, { onDelete: "cascade" })
    .notNull(),
  score: integer("score").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type FlashcardStudy = InferModel<typeof flashcardStudiesTable>;
export const insertFlashcardStudySchema = createInsertSchema(
  flashcardStudiesTable,
);

export const flashcardStudiesTableRelations = relations(
  flashcardStudiesTable,
  ({ one }) => ({
    session: one(flashcardStudySessionsTable, {
      fields: [flashcardStudiesTable.sessionId],
      references: [flashcardStudySessionsTable.id],
    }),
    flashcard: one(flashcardsTable, {
      fields: [flashcardStudiesTable.flashcardId],
      references: [flashcardsTable.id],
    }),
  }),
);
