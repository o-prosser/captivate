"use client";

import Link from "next/link";

import { Button, LogoIcon } from "@/ui";
import Profile from "./profile";
import { SearchIcon, SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import CommandBar from "./command";

const Header = () => {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <header className="flex items-center justify-between border-b md:border-none fixed inset-x-6 top-0 md:absolute md:left-auto md:right-8 md:top-6 bg-background space-x-1 h-16 md:h-auto z-10 md:w-auto">
      <Button variant="default" size={null} asChild iconOnly>
        <Link href="/dashboard" className="p-2.5 md:hidden">
          <LogoIcon className="h-5 w-5" />
        </Link>
      </Button>

      <CommandBar open={commandOpen} setOpen={setCommandOpen} />

      <Button
        variant="ghost"
        iconOnly
        onClick={() => setCommandOpen(true)}
        className="hidden md:inline-flex"
      >
        <SearchIcon />
      </Button>
      <Button variant="ghost" iconOnly className="hidden md:inline-flex">
        <SettingsIcon />
      </Button>
      <Profile setCommandOpen={setCommandOpen} />
    </header>
  );
};

export default Header;
