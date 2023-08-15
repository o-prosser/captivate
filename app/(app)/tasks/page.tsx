import Link from "next/link";
import { formatDistance, isToday, isTomorrow } from "date-fns";
import { MessageCircle, Plus } from "lucide-react";

import { createVar } from "@/util/cn";
import { getValidSession } from "@/util/session";
import { parseSubjectName, SubjectIcon } from "@/util/subjects";
import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import { Pill } from "@/ui/pill";
import { selectTasks } from "@/models/task";

export const metadata = {
  title: "Tasks",
};

const TaskPage = async () => {
  const tasks = await selectTasks();
  const { user } = await getValidSession();

  const todoTasks = tasks.filter(
    (task) =>
      (task.doDate && isToday(task.doDate)) ||
      (task.dueDate && isToday(task.dueDate)),
  );

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mt-6">
        <Card.Root>
          <Card.Header className="flex-row space-y-0 -mr-3 py-3">
            <Card.Title className="flex-1 inline-flex items-center">
              <div className="h-[15px] w-[15px] rounded-full bg-muted-foreground mr-2" />
              Todo
            </Card.Title>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/tasks/create">
                <Plus />
              </Link>
            </Button>
          </Card.Header>

          <Card.Content>
            {todoTasks.map((task, key) => (
              <Button
                key={key}
                size={null}
                variant="outline"
                className="block bg-muted/30 w-full hover:text-foreground"
                asChild
              >
                <Link href={`/tasks/${task.id}`}>
                  <div className="flex flex-col space-y-1 items-start py-3 px-4">
                    <h5 className="font-medium">{task.title}</h5>
                  </div>
                  <div className="border-t flex items-center py-2 px-4">
                    <MessageCircle className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-sm flex-1 text-left">1</span>

                    <span className="text-xs">
                      {task.dueDate ? (
                        <>
                          {isToday(task.dueDate) && (
                            <span className="text-destructive">Today</span>
                          )}
                          {isTomorrow(task.dueDate) && (
                            <span className="text-[hsl(24_92.4%_24.0%)]">
                              Tomorrow
                            </span>
                          )}
                          {!isToday(task.dueDate) &&
                            !isTomorrow(task.dueDate) && (
                              <span>
                                {formatDistance(task.dueDate, new Date())}
                              </span>
                            )}
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </Link>
              </Button>
            ))}
          </Card.Content>
        </Card.Root>

        {user.usersToSubjects.map(({ subject }, key) => (
          <Card.Root key={key}>
            <Card.Header className="flex-row space-y-0 -mr-3 py-3">
              <Card.Title className="flex-1 inline-flex items-center capitalize">
                <SubjectIcon
                  subject={subject.id}
                  style={createVar({ "--subject": `var(--${subject.id})` })}
                  className="h-5 w-5 mr-2 text-subject"
                />
                {subject.name}
              </Card.Title>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/tasks/create?subject=${subject.id}`}>
                  <Plus />
                </Link>
              </Button>
            </Card.Header>

            <Card.Content>
              {tasks
                .filter((task) => task.subjectId === subject.id)
                .map((task, key) => (
                  <Button
                    key={key}
                    size={null}
                    variant="outline"
                    className="block bg-muted/30 w-full hover:text-foreground"
                    asChild
                  >
                    <Link href={`/tasks/${task.id}`}>
                      <div className="flex flex-col space-y-1 items-start py-3 px-4">
                        <h5 className="font-medium">{task.title}</h5>
                        {task.subjectId ? (
                          <Pill
                            color={
                              parseSubjectName(task.subjectId) || undefined
                            }
                          >
                            {task.subjectId}
                          </Pill>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="border-t flex items-center py-2 px-4">
                        <MessageCircle className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="text-sm flex-1 text-left">1</span>

                        <span className="text-xs">
                          {task.dueDate ? (
                            <>
                              {isToday(task.dueDate) && (
                                <span className="text-destructive">Today</span>
                              )}
                              {isTomorrow(task.dueDate) && (
                                <span className="text-[hsl(24_92.4%_24.0%)]">
                                  Tomorrow
                                </span>
                              )}
                              {!isToday(task.dueDate) &&
                                !isTomorrow(task.dueDate) && (
                                  <span>
                                    {formatDistance(task.dueDate, new Date())}
                                  </span>
                                )}
                            </>
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    </Link>
                  </Button>
                ))}
            </Card.Content>
          </Card.Root>
        ))}
      </div>
    </>
  );
};

export default TaskPage;

export const runtime = "edge";
export const revalidate = 3600;
