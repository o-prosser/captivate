import "katex/dist/katex.min.css";

import { getSession } from "@/lib/session";

import Footer from "./_components/footer";
import Wrapper from "./_components/wrapper";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await getSession();

  return (
    <div className="w-screen">
      {/* @ts-ignore */}
      <Wrapper user={user}>{children}</Wrapper>
      <Footer />
    </div>
  );
};

export default AppLayout;
