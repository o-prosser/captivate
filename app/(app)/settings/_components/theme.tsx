"use client";

import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/ui/button";
import * as Card from "@/ui/card";
import * as DropdownMenu from "@/ui/dropdown-menu";

const Theme = () => {
  const { setTheme } = useTheme();

  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>App theme</Card.Title>
        <Card.Description>
          Select light mode or dark mode, or select system to automatically
          follow your device&apos;s preferences.
        </Card.Description>
      </Card.Header>

      <Card.Content>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button>
              <SunIcon className="dark:hidden" />
              <MoonIcon className="hidden dark:block" />
              Select theme
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
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
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Card.Content>
    </Card.Root>
  );
};

export default Theme;
