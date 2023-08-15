import { tasksTable } from "@/drizzle/schema/tasks";
import { isToday, startOfDay } from "date-fns";

import { and, db, eq, lte, or } from "@/lib/db";
import { createVar } from "@/util/cn";
import { getValidSession } from "@/util/session";
import { parseSubjectName } from "@/util/subjects";
import { Callout } from "@/ui/callout";
import { Pill } from "@/ui/pill";
import { Text } from "@/ui/typography";

import { TaskCheck } from "./task-check";

const TasksToday = async ({ subject }: { subject?: string }) => {
  const { user } = await getValidSession();

  const tasks = await db
    .select({
      id: tasksTable.id,
      completed: tasksTable.completed,
      doDate: tasksTable.doDate,
      dueDate: tasksTable.dueDate,
      title: tasksTable.title,
      subject: tasksTable.subjectId,
    })
    .from(tasksTable)
    .where(
      and(
        subject ? eq(tasksTable.subjectId, subject) : undefined,
        eq(tasksTable.completed, false),
        eq(tasksTable.userId, user.id),
        or(
          lte(tasksTable.dueDate, startOfDay(new Date())),
          lte(tasksTable.doDate, startOfDay(new Date())),
        ),
      ),
    )
    .limit(4);

  return tasks.length > 0 ? (
    tasks.map((task, key) => (
      <div
        key={key}
        style={createVar({ "--subject": `var(--${task.subject || "muted"})` })}
        className="bg-gradient-to-b from-subject/30 to-subject/10 rounded-2xl py-3 px-4"
      >
        <Text className="font-semibold text-subject capitalize brightness-50">
          {task.title}
        </Text>
        <div className="flex items-end justify-between mt-2">
          {task.subject ? (
            <Pill outline="subject" color={null}>
              {task.subject}
            </Pill>
          ) : (
            ""
          )}
        </div>
      </div>
      // <div className={"flex space-x-3 mb-3"} key={key}>
      //   <TaskCheck task={task} />
      //   <div className="flex-1">
      //     <Text>{task.title}</Text>
      //     {task.subject ? (
      //       <Pill
      //         className="mt-1"
      //         color={parseSubjectName(task.subject) || undefined}
      //       >
      //         {task.subject}
      //       </Pill>
      //     ) : (
      //       ""
      //     )}
      //   </div>
      //   <div className="text-sm text-muted-foreground">
      //     {subject ? (
      //       <>
      //         {task.doDate && isToday(task.doDate) ? "do today" : "due today"}
      //       </>
      //     ) : (
      //       ""
      //     )}
      //   </div>
      // </div>
    ))
  ) : (
    <Callout className="!mt-0" emoji="📌">
      No due tasks.
    </Callout>
  );
};

export { TasksToday };
