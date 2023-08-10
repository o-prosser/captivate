import { getSession } from "@/lib/session";
import { Heading } from "@/ui/typography";
import { Markdown } from "@/components/markdown";
import { getTasks } from "@/models/task";

import Tasks from "./_components/tasks";

export const metadata = {
  title: "Tasks",
};

const TaskPage = async () => {
  const tasks = await getTasks();
  const user = await getSession();

  return (
    <>
      <Heading>Tasks</Heading>
      <Tasks
        userId={user.id as string}
        tasks={tasks.map((task) => ({
          markdown: <Markdown source={task.description || ""} />,
          ...task,
        }))}
      />
    </>
  );
};

export default TaskPage;
