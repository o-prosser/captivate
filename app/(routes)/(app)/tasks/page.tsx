import { Heading } from "@/ui";
import Tasks from "./tasks";
import { getTasks } from "@/app/(models)/task";
import { Markdown } from "@/components/markdown";

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
