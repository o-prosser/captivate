import { Heading } from "@/ui/typography";

const TasksLayout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <>
      <Heading>Tasks</Heading>

      {children}
      {modal}
    </>
  );
};

export default TasksLayout;
