"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export const RouteSheet = ({ children }: { children: React.ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState("open");

  const router = useRouter();

  const onDismiss = useCallback(() => {
    setOpen("closed");
    setTimeout(() => setOpen("gone"), 250);
    setTimeout(() => {
      router.back();
    }, 50);
  }, [router]);

  const onClick: React.MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-50 bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=gone]:hidden"
      data-state={open}
      onClick={onClick}
    >
      <div
        ref={wrapper}
        data-state={open}
        className="fixed z-50 gap-4 bg-background shadow-lg transition ease-in-out inset-y-4 rounded-2xl right-4 w-3/4 border sm:max-w-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right data-[state=gone]:hidden"
      >
        <div className="p-6 h-full overflow-auto">{children}</div>
      </div>
    </div>
  );
};
