import { Accordion, Card } from "@/ui";
import { getTasks } from "@/app/(models)/task";
import Task from "./task";
import { Markdown } from "@/components/markdown";

const Tasks = async () => {
  const tasks = await getTasks();

  return (
    <Card.Root className="mt-6">
      <Card.Header>
        <Card.Title>Do today</Card.Title>
      </Card.Header>
      <Card.Content>
        <Accordion.Root type="single" collapsible>
          {tasks.map((task, key) => (
            <Task
              task={{
                markdown: <Markdown source={task.description || ""} />,
                ...task,
              }}
              key={key}
            />
          ))}
        </Accordion.Root>
      </Card.Content>
    </Card.Root>
  );
};

export default Tasks;
