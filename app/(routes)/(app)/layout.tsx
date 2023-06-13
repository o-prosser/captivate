import { redirect } from "next/navigation";

import { getCurrentUser } from "@/util/session";

import Body from "./body";
import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (!user) redirect("/dashboard");

  return (
    <div className="grid grid-cols-1 grid-rows-[4rem,1fr,6rem] h-screen w-screen overflow-hidden md:grid-rows-[4rem,1fr] md:grid-cols-[16rem,1fr]">
      <Sidebar />
      <Header />
      <Body children={children} />
      <Footer />
    </div>
  );
};

export default AppLayout;
