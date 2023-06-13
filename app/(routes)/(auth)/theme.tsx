"use client";

import { Button, DropdownMenu } from "@/ui";
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="ghost" className="fixed right-2 bottom-4">
          {theme === "light" ? (
            <SunIcon />
          ) : theme === "dark" ? (
            <MoonIcon />
          ) : (
            <LaptopIcon />
          )}
          Select theme
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group>
          <DropdownMenu.Item onSelect={() => setTheme("system")}>
            <LaptopIcon />
            <span>System</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => setTheme("light")}>
            <SunIcon />
            <span>Light</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => setTheme("dark")}>
            <MoonIcon />
            <span>Dark</span>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ThemeToggle;
