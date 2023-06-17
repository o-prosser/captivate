import "katex/dist/katex.min.css";

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/util/session";

import Body from "./body";
import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="grid grid-cols-1 grid-rows-[4rem,1fr,6rem] h-screen w-screen max-h-screen overflow-hidden md:grid-rows-1 md:grid-cols-[5.5rem,1fr]">
      <Sidebar />
      <Header />
      <Body>{children}</Body>
      <Footer />
    </div>
  );
};

export default AppLayout;
