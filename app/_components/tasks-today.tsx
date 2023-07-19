import { Subject } from "@prisma/client";
import isToday from "date-fns/isToday";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/util/session";
import { parseSubjectName } from "@/util/subjects";
import { Callout } from "@/ui/callout";
import { Checkbox } from "@/ui/checkbox";
import { Pill } from "@/ui/pill";
import { Text } from "@/ui/typography";

import { TaskCheck } from "./task-check";

const TasksToday = async ({ subject }: { subject?: Subject }) => {
  const user = await getCurrentUser();
  if (!user?.id) throw new Error();

  const tasks = await prisma.task.findMany({
    where: {
      subject: subject,
      completed: false,
      OR: [
        {
          dueDate: { lte: new Date(new Date().setHours(0, 0, 0, 0)) },
        },
        {
          doDate: { lte: new Date(new Date().setHours(0, 0, 0, 0)) },
        },
      ],
      userId: user.id,
    },
    select: {
      id: true,
      completed: true,
      doDate: true,
      dueDate: true,
      title: true,
      description: true,
      subject: true,
    },
    take: 4,
  });

  return tasks.length > 0 ? (
    tasks.map((task, key) => (
      <div className={"flex space-x-3 mb-3"} key={key}>
        <TaskCheck task={task} />
        <div className="flex-1">
          <Text>{task.title}</Text>
          {task.subject ? (
            <Pill
              className="mt-1"
              color={parseSubjectName(task.subject) || undefined}
            >
              {task.subject}
            </Pill>
          ) : (
            ""
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {subject ? (
            <>
              {task.doDate && isToday(task.doDate) ? "do today" : "due today"}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    ))
  ) : (
    <Callout emoji="📌">No due tasks.</Callout>
  );
};

export { TasksToday };
