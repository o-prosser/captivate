import Link from "next/link";
import { isToday } from "date-fns";
import { CheckCircle2, Plus } from "lucide-react";

import { createVar } from "@/util/cn";
import { getValidSession } from "@/util/session";
import { SubjectIcon } from "@/util/subjects";
import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import { Pill } from "@/ui/pill";
import { Placeholder } from "@/ui/placeholder";
import { SubjectCard } from "@/ui/subject-card";
import { selectTasks } from "@/models/task";
import { TaskPlaceholder } from "@/app/(app)/dashboard/@tasks/placeholder";

const CardView = async () => {
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
          <Card.Header className="flex-row justify-between space-y-0 -mr-2.5 pb-3">
            <Card.Title className="flex items-center">
              <CheckCircle2 className="text-muted-foreground h-5 w-5 mr-2" />
              Todo
            </Card.Title>
            <Button variant="ghost" size="icon" asChild className="h-9 w-9">
              <Link href="/tasks/card/create">
                <Plus />
              </Link>
            </Button>
          </Card.Header>

          <Card.Content className="space-y-2">
            {todoTasks.length > 0 ? (
              todoTasks.map((task, key) => (
                <Button
                  key={key}
                  variant={null}
                  size={null}
                  asChild
                  className="text-base block"
                >
                  <Link href={`/tasks/card/${task.id}`}>
                    <SubjectCard subject={task.subjectId} design="compact">
                      <SubjectCard.Header>
                        <div>
                          <SubjectCard.Title className="!leading-5">
                            {task.title}
                          </SubjectCard.Title>
                          <SubjectCard.Description>
                            {task.dueDate && isToday(task.dueDate)
                              ? "Due today"
                              : "Do today"}
                          </SubjectCard.Description>
                        </div>
                      </SubjectCard.Header>
                      <SubjectCard.Footer>
                        <div />
                        {task.subjectId ? (
                          <Pill className="!m-0" outline="subject" color={null}>
                            {task.subjectId}
                          </Pill>
                        ) : (
                          ""
                        )}
                      </SubjectCard.Footer>
                    </SubjectCard>
                  </Link>
                </Button>
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
          </Card.Content>
        </Card.Root>

        {user.usersToSubjects.map(({ subject }, key) => (
          <Card.Root key={key}>
            <Card.Header className="flex-row justify-between space-y-0 -mr-3 pb-3">
              <Card.Title className="flex items-center capitalize">
                <SubjectIcon
                  subject={subject.id}
                  style={createVar({ "--subject": `var(--${subject.id})` })}
                  className="h-5 w-5 mr-2 text-subject"
                />
                {subject.name}
              </Card.Title>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/tasks/card/create?subject=${subject.id}`}>
                  <Plus />
                </Link>
              </Button>
            </Card.Header>

            <Card.Content className="space-y-2">
              {tasks.filter((task) => task.subjectId === subject.id).length >
              0 ? (
                tasks
                  .filter((task) => task.subjectId === subject.id)
                  .map((task, key) => (
                    <Button
                      key={key}
                      variant={null}
                      size={null}
                      asChild
                      className="text-base block"
                    >
                      <Link href={`/tasks/${task.id}`}>
                        <SubjectCard subject={task.subjectId} design="compact">
                          <SubjectCard.Header>
                            <div>
                              <SubjectCard.Title className="!leading-5">
                                {task.title}
                              </SubjectCard.Title>
                              <SubjectCard.Description>
                                {task.dueDate && isToday(task.dueDate)
                                  ? "Due today"
                                  : "Do today"}
                              </SubjectCard.Description>
                            </div>
                          </SubjectCard.Header>
                          <SubjectCard.Footer>
                            <div />
                            {task.subjectId ? (
                              <Pill
                                className="!m-0"
                                outline="subject"
                                color={null}
                              >
                                {task.subjectId}
                              </Pill>
                            ) : (
                              ""
                            )}
                          </SubjectCard.Footer>
                        </SubjectCard>
                      </Link>
                    </Button>
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
            </Card.Content>
          </Card.Root>
        ))}
      </div>
    </>
  );
};

export default CardView;
