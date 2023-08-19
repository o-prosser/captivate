import "katex/dist/katex.min.css";

import { createVar } from "@/util/cn";
import { getValidSession } from "@/util/session";

import Footer from "./_components/footer";
import Header from "./_components/header";
import Sidebar from "./_components/sidebar";
import SidebarExpandProvider from "./_components/wrapper";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const { user } = await getValidSession();

  return (
    <div
      className="w-screen"
      style={createVar({
        "--primary": `var(--theme-${user.theme || "indigo"})`,
      })}
    >
      <SidebarExpandProvider>
        <Sidebar />
        <div
          className="
          px-6 pt-[5.5rem] pb-[7.5rem] below-md:!ml-0 min-h-screen
          md:mr-6 md:my-6 md:pt-2 md:pb-4 md:min-h-[calc(100vh-3rem)] md:border border-border/50 md:rounded-2xl
          print:!m-0 print:!px-8 print:!pt-16 print:border-none
          group-data-[expanded=true]/expanded:ml-[15rem] ml-[15rem] group-data-[expanded=false]/expanded:ml-[5.5rem] transition-all duration-100
        "
        >
          <Header />

          <main>{children}</main>
        </div>
      </SidebarExpandProvider>
      <Footer />
    </div>
  );
};

export default AppLayout;
