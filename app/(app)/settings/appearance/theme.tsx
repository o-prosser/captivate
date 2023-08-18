"use client";

import { useTheme } from "next-themes";

import { Button } from "@/ui/button";
import { Label } from "@/ui/label";

const Theme = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="grid grid-cols-3 gap-4 mt-2">
      <Button
        variant={null}
        size={null}
        className="flex-col gap-2 items-stretch"
        onClick={() => setTheme("system")}
      >
        <div
          data-current={theme === "system"}
          className="rounded-2xl overflow-hidden grid grid-cols-2 aspect-video border data-[current=true]:ring-2 data-[current=true]:ring-foreground data-[current=true]:border-foreground"
        >
          <div className="bg-zinc-100">
            <div className="mt-6 ml-6 rounded-l-lg bg-white h-full w-full" />
          </div>
          <div className="bg-zinc-500">
            <div className="mt-6 ml-6 rounded-l-lg bg-zinc-950 h-full w-full" />
          </div>
        </div>
        <Label className="text-center w-full">System</Label>
      </Button>
      <Button
        variant={null}
        size={null}
        className="flex-col gap-2 items-stretch"
        onClick={() => setTheme("light")}
      >
        <div
          data-current={theme === "light"}
          className="rounded-2xl overflow-hidden aspect-video bg-zinc-100 border data-[current=true]:ring-2 data-[current=true]:ring-foreground data-[current=true]:border-foreground"
        >
          <div className="mt-6 ml-6 rounded-l-lg bg-white h-full w-full" />
        </div>
        <Label className="text-center w-full">Light</Label>
      </Button>
      <Button
        variant={null}
        size={null}
        className="flex-col gap-2 items-stretch"
        onClick={() => setTheme("dark")}
      >
        <div
          data-current={theme === "dark"}
          className="rounded-2xl overflow-hidden aspect-video bg-zinc-500 border data-[current=true]:ring-2 data-[current=true]:ring-foreground data-[current=true]:border-foreground"
        >
          <div className="mt-6 ml-6 rounded-l-lg bg-zinc-950 h-full w-full" />
        </div>
        <Label className="text-center w-full">Dark</Label>
      </Button>
    </div>
  );
};

export default Theme;
