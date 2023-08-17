import { tasksTable } from "@/drizzle/schema/tasks";
import { endOfDay, isToday } from "date-fns";
import { CheckCircle2 } from "lucide-react";

import { and, db, eq, lte, or } from "@/lib/db";
import { createVar } from "@/util/cn";
import { getValidSession } from "@/util/session";
import { Callout } from "@/ui/callout";
import { Pill } from "@/ui/pill";
import { Placeholder } from "@/ui/placeholder";
import { SubjectCard } from "@/ui/subject-card";
import { Text } from "@/ui/typography";

import { TaskPlaceholder } from "./placeholder";

const Tasks = async () => {
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
        eq(tasksTable.completed, false),
        eq(tasksTable.userId, user.id),
        or(
          lte(tasksTable.dueDate, endOfDay(new Date())),
          lte(tasksTable.doDate, endOfDay(new Date())),
        ),
      ),
    )
    .limit(4);

  return (
    <div className="space-y-2">
      {tasks.length > 0 ? (
        tasks.map((task, key) => (
          <SubjectCard key={key} subject={task.subject} design="compact">
            <SubjectCard.Header>
              <div>
                <SubjectCard.Title>{task.title}</SubjectCard.Title>
                <SubjectCard.Description>
                  {task.dueDate && isToday(task.dueDate)
                    ? "Due today"
                    : "Do today"}
                </SubjectCard.Description>
              </div>
              {task.subject ? (
                <Pill className="!m-0" outline="subject" color={null}>
                  {task.subject}
                </Pill>
              ) : (
                ""
              )}
            </SubjectCard.Header>
          </SubjectCard>
        ))
      ) : (
        <div className="relative">
          <TaskPlaceholder />
          <TaskPlaceholder />
          <TaskPlaceholder />
          <Placeholder>
            <CheckCircle2 />
            <Placeholder.Title>No tasks today</Placeholder.Title>
            <Placeholder.Text>
              Really? No tasks for the day. Come on now...
            </Placeholder.Text>
          </Placeholder>
        </div>
      )}
    </div>
  );
};

export default Tasks;
export const runtime = "edge";
