import { Heading } from "@/ui";
import { Suspense } from "react";
import Tasks from "./tasks";

const TaskPage = () => {
  return (
    <>
      <Heading>Tasks</Heading>

      <Suspense fallback={<>Loading tasks...</>}>
        <Tasks />
      </Suspense>
    </>
  );
};

export default TaskPage;
