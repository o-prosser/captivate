import { Heading } from "@/ui";
import { getCurrentUser } from "@/util/session";

const Dashboard = async () => {
  const user = await getCurrentUser();

  return (
    <main>
      <Heading>Welcome back {user?.name || user?.email}</Heading>
    </main>
  );
};

export default Dashboard;
