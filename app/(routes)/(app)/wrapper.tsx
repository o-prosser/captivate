"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { motion } from "framer-motion";
import { cn } from "@/util";
import Header from "./header";

const Wrapper = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { image?: string | null };
}) => {
  const pathname = usePathname();

  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (pathname.includes("/subjects")) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [pathname]);

  return (
    <>
      <Sidebar expanded={expanded} />
      <motion.div
        variants={{
          expand: { marginLeft: "15rem" },
          contract: { marginLeft: "5.5rem" },
        }}
        initial="expand"
        animate={expanded ? "expand" : "contract"}
        transition={{ duration: 0 }}
        className={cn(
          "px-6 pt-[5.5rem] pb-[7.5rem] below-md:!ml-0 min-h-screen",
          "md:mr-6 md:my-6 md:pt-2 md:pb-4 md:min-h-[calc(100vh-3rem)] md:border md:rounded-2xl",
          "print:!m-0 print:!px-8 print:!pt-16",
        )}
      >
        <Header user={user} />

        <main>{children}</main>
      </motion.div>
    </>
  );
};

export default Wrapper;
