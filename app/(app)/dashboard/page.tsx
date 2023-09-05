import { getValidSession } from "@/util/session";

export const metadata = {
  title: "Dashboard",
};

const Dashboard = async () => {
  const { user } = await getValidSession();

  console.log("On dashboard. User: " + user.email);

  return null;
};

export default Dashboard;

export const runtime = "edge";
export const preferredRegion = "lhr1";
