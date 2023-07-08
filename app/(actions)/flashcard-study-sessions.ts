"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const end = async (id: string, science: string) => {
  await prisma.flashcardStudySession.update({
    where: { id },
    data: {
      end: new Date(),
    },
  });

  redirect(`/subjects/${science}/flashcards`);
};
