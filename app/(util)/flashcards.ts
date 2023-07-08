import { StudyScope } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const getScope = async ({
  type,
  id,
  science,
}: {
  type: StudyScope;
  id?: string | null;
  science: {
    units: {
      number: number;
      name: string;
      topics: string[];
    }[];
  };
}) => {
  if (!id) return { scope: null, type: null };

  if (type === "Group") {
    const group = await prisma.flashcardGroup.findUnique({
      where: { id },
      include: {
        _count: {
          select: { flashcards: true },
        },
      },
    });

    if (!group) return { scope: null, type: null };

    return {
      scope: {
        title: science.units[group.unit - 1].topics[group.topic - 1],
        ...group,
      },
      type: "Group",
    };
  }

  return { scope: null, type: null };
};
