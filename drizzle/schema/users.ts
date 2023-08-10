import { InferModel, sql } from "drizzle-orm";
import { bigint, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const usersTable = pgTable("User", {
  id: text("id")
    .primaryKey()
    .notNull()
    .default(sql`gen_random_uuid()`),
  email: text("email").unique().notNull(),
  username: text("username").unique(),
  name: text("name"),
  image: text("image"),
  token: text("token").default(sql`gen_random_uuid()`),
  emailVerifiedAt: timestamp("emailVerifiedAt"),
});

export type User = InferModel<typeof usersTable>;
export const insertUserSchema = createInsertSchema(usersTable);

export const sessionsTable = pgTable("Session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  activeExpires: bigint("active_expires", {
    mode: "number",
  }).notNull(),
  idleExpires: bigint("idle_expires", {
    mode: "number",
  }).notNull(),
});

export const keysTable = pgTable("Key", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  hashedPassword: text("hashed_password"),
});
