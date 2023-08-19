import { notFound } from "next/navigation";

import CardView from "./_components/card";
import TableView from "./_components/table";

export const metadata = {
  title: "Tasks",
};

const TaskPage = async ({ params }: { params: { view: string } }) => {
  if (params.view === "card") return <CardView />;
  if (params.view === "table") return <TableView />;

  notFound();
};

export default TaskPage;

export const runtime = "edge";
export const revalidate = 3600;
