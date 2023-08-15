"use server";

import { redirect } from "next/navigation";
import { flashcardStudySessionsTable } from "@/drizzle/schema";

import { db, eq } from "@/lib/db";

export const end = async (id: string, subject: string) => {
  await db
    .update(flashcardStudySessionsTable)
    .set({ end: new Date() })
    .where(eq(flashcardStudySessionsTable.id, id));

  redirect(`/subjects/${subject}/flashcards`);
};
