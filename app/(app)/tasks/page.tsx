import { Heading } from "@/ui/typography";
import { Markdown } from "@/components/markdown";
import { getTasks } from "@/models/task";

import Tasks from "./_components/tasks";

const TaskPage = async () => {
  const tasks = await getTasks();

  return (
    <>
      <Heading>Tasks</Heading>
      <Tasks
        tasks={tasks.map((task) => ({
          markdown: <Markdown source={task.description || ""} />,
          ...task,
        }))}
      />
    </>
  );
};

export default TaskPage;
