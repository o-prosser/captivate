"use server";

import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const end = async (id: string, subject: string) => {
  await prisma.flashcardStudySession.update({
    where: { id },
    data: {
      end: new Date(),
    },
  });

  redirect(`/subjects/${subject}/flashcards`);
};
