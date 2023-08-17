"use client";

import { usePathname } from "next/navigation";

const SidebarExpandProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const expanded = !pathname.includes("/subjects");

  return (
    <div data-expanded={expanded} className="group/expanded">
      {children}
    </div>
  );
};

export default SidebarExpandProvider;
