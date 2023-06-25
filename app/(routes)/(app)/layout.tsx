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
    <div className="min-h-screen w-screen">
      <Sidebar />
      <Header />
      <Body>{children}</Body>
      <Footer />
    </div>
  );
};

export default AppLayout;
