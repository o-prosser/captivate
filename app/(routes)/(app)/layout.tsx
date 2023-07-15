import "katex/dist/katex.min.css";

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/util/session";

import Footer from "./footer";
import Wrapper from "./wrapper";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (!user || typeof user.id === "undefined") redirect("/login");

  return (
    <div className="w-screen">
      {/* @ts-ignore */}
      <Wrapper user={user}>{children}</Wrapper>
      <Footer />
    </div>
  );
};

export default AppLayout;
