import "katex/dist/katex.min.css";

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/util/session";

import Footer from "./footer";
import Header from "./header";
import Wrapper from "./wrapper";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen w-screen">
      <Header user={user} />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </div>
  );
};

export default AppLayout;
