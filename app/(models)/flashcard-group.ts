import { prisma } from "@/lib/prisma";

export const getFlashcardGroup = async (id: string) => {
  return await prisma.flashcardGroup.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      flashcards: {
        select: {
          id: true,
        },
        orderBy: {
          id: "asc",
        },
      },
    },
  });
};
