import "katex/dist/katex.min.css";

import { getValidSession } from "@/util/session";

import AddEvent from "./_components/add-event";
import Footer from "./_components/footer";
import Wrapper from "./_components/wrapper";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await getValidSession();

  return (
    <div className="w-screen">
      <Wrapper eventDialog={<AddEvent userId={user.id} />} user={user}>
        {children}
      </Wrapper>
      <Footer />
    </div>
  );
};

export default AppLayout;
