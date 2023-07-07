import { prisma } from "@/lib/prisma";

const getNextFlashcard = async ({
  scope,
  scopeId,
  currentId,
  type,
}: {
  scope: string;
  scopeId: string;
  currentId: string;
  type: "all" | "spaced";
}) => {
  // TODO implement different types and scopes
  if (type === "spaced")
    throw new Error(`Features not implemented. Invalid type: ${type}`);
  if (scope !== "group")
    throw new Error(`Features not implemented. Invalid scope: ${scope}`);

  const flashcardGroup = await prisma.flashcardGroup.findUnique({
    where: { id: scopeId },
    select: {
      id: true,
      flashcards: {
        select: {
          id: true,
        },
      },
    },
  });
  if (!flashcardGroup)
    throw new Error("Invalid flashcardGroup scopeId provided");
};
