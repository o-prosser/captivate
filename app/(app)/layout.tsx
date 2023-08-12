import "katex/dist/katex.min.css";

import { getValidSession } from "@/lib/session";

import Footer from "./_components/footer";
import Wrapper from "./_components/wrapper";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await getValidSession();

  return (
    <div className="w-screen">
      {/* @ts-ignore */}
      <Wrapper user={user}>{children}</Wrapper>
      <Footer />
    </div>
  );
};

export default AppLayout;
