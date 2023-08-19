import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { tasksTable } from "@/drizzle/schema/tasks";
import { formatDistance, isToday, isTomorrow } from "date-fns";
import { Calendar, Check } from "lucide-react";

import { db, eq } from "@/lib/db";
import { RouteSheet } from "@/ui/route-sheet";
import { Heading } from "@/ui/typography";
import { FormButton } from "@/components/form-button";
import { selectTask } from "@/models/task";

const TaskPage = async ({ params }: { params: { id: string } }) => {
  const task = await selectTask(params);
  if (!task) notFound();

  const toggleAction = async () => {
    "use server";

    const task = await selectTask(params);
    await db
      .update(tasksTable)
      .set({ completed: !task.completed })
      .where(eq(tasksTable.id, params.id));

    revalidatePath("/tasks");
    redirect(`/tasks?deleted=${params.id}`);
  };

  return (
    <RouteSheet>
      <div className="h-full flex flex-col">
        <div className="flex-1">
          <Heading level={2}>{task.title}</Heading>

          {task.dueDate ? (
            <p className="text-sm flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Due</span>
              <>
                {isToday(task.dueDate) ? (
                  <span className="text-destructive">Today</span>
                ) : (
                  ""
                )}
                {isTomorrow(task.dueDate) ? (
                  <span className="text-[hsl(24_92.4%_24.0%)]">Tomorrow</span>
                ) : (
                  ""
                )}
                {!isToday(task.dueDate) && !isTomorrow(task.dueDate) ? (
                  <span>{formatDistance(task.dueDate, new Date())}</span>
                ) : (
                  ""
                )}
              </>
            </p>
          ) : (
            ""
          )}

          {task.doDate ? (
            <p className="text-sm flex items-center space-x-2 mt-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Do</span>
              <>
                {isToday(task.doDate) ? (
                  <span className="text-destructive">Today</span>
                ) : (
                  ""
                )}
                {isTomorrow(task.doDate) ? (
                  <span className="text-[hsl(24_92.4%_24.0%)]">Tomorrow</span>
                ) : (
                  ""
                )}
                {!isToday(task.doDate) && !isTomorrow(task.doDate) ? (
                  <span>{formatDistance(task.doDate, new Date())}</span>
                ) : (
                  ""
                )}
              </>
            </p>
          ) : (
            ""
          )}

          <hr className="my-6" />

          {/* <Text className="!mt-0">{task.markdown}</Text> */}
        </div>
        <div>
          <form action={toggleAction}>
            <FormButton variant="outline" className="w-full">
              <Check />
              Mark as completed
            </FormButton>
          </form>
        </div>
      </div>
    </RouteSheet>
  );
};

export default TaskPage;
