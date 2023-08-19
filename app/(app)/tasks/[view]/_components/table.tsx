import Link from "next/link";

import { createVar } from "@/util/cn";
import { formatRelativeDate } from "@/util/time";
import { Pill } from "@/ui/pill";
import * as Table from "@/ui/table";
import { selectTasks } from "@/models/task";

import TaskCheck from "./check";

const TableView = async () => {
  const tasks = await selectTasks();

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Head className="pl-10">Item</Table.Head>
          <Table.Head>Subject</Table.Head>
          <Table.Head>Do date</Table.Head>
          <Table.Head>Due date</Table.Head>
        </Table.Header>
        <Table.Body>
          {tasks.map((task, key) => (
            <Table.Row key={key}>
              <Table.Cell>
                <div className="flex gap-2 items-center">
                  <TaskCheck task={task} />
                  <Link
                    href={`/tasks/table/${task.id}`}
                    className="font-medium whitespace-nowrap pr-4"
                  >
                    {task.title}
                  </Link>
                </div>
              </Table.Cell>
              <Table.Cell>
                <Pill
                  outline="subject"
                  color={null}
                  style={createVar({ "--subject": `var(--${task.subjectId})` })}
                >
                  {task.subjectId}
                </Pill>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {task.doDate ? formatRelativeDate(task.doDate) : ""}
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap">
                {task.dueDate ? formatRelativeDate(task.dueDate) : ""}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default TableView;
