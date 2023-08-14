"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/ui/button";
import * as DropdownMenu from "@/ui/dropdown-menu";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" className="fixed right-2 bottom-4">
          <Sun />
          Select theme
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Item onSelect={() => setTheme("system")}>
            <Laptop />
            <span>System</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => setTheme("light")}>
            <Sun />
            <span>Light</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => setTheme("dark")}>
            <Moon />
            <span>Dark</span>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export { ThemeToggle };
