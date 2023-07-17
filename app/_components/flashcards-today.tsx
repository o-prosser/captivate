import { Subject } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { Callout } from "@/ui/callout";
import { Text } from "@/ui/typography";

const FlashcardsToday = async ({ subject }: { subject?: Subject }) => {
  const flashcards = await prisma.flashcardStudySession.findMany({
    where: {
      subject,
    },
    orderBy: {
      end: "desc",
    },
    take: 3,
  });

  return flashcards.length > 0 ? (
    flashcards.map((flashcard, key) => (
      <div key={key} className="mb-3">
        <Text>{flashcard.type}</Text>
      </div>
    ))
  ) : (
    <Callout emoji="📚">No recent flashcard sessions.</Callout>
  );
};

export { FlashcardsToday };
