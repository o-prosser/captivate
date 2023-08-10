import { InferModel } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const subjectsTable = pgTable("Subject", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
});

export type Subject = InferModel<typeof subjectsTable>;
